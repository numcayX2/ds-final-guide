import gsap from 'gsap';
import katex from 'katex';
import type { FormulaAnimation, FormulaAnimationStep } from '../../types/study';

export class FormulaMorphEngine {
  private container: HTMLElement;
  private formula: FormulaAnimation;
  private currentStepIndex: number = 1;
  private isAnimating: boolean = false;
  private audioElement: HTMLAudioElement | null = null;
  private speechUtterance: SpeechSynthesisUtterance | null = null;
  private isPlayingAudio: boolean = false;
  private onStepChangeCallback?: (stepIndex: number) => void;

  constructor(container: HTMLElement, formula: FormulaAnimation, onStepChange?: (stepIndex: number) => void) {
    this.container = container;
    this.formula = formula;
    this.onStepChangeCallback = onStepChange;
    this.audioElement = new Audio();
    this.setupAudioListeners();
  }

  private setupAudioListeners() {
    if (!this.audioElement) return;
    this.audioElement.addEventListener('ended', () => {
      this.isPlayingAudio = false;
      this.updateAudioButtonState(false);
    });
    this.audioElement.addEventListener('error', () => {
      // Fallback to Web Speech API if MP3 file is not found
      this.fallbackWebSpeech();
    });
  }

  /**
   * Render initial state
   */
  public async init() {
    await document.fonts.ready;
    this.renderStep(this.currentStepIndex, false);
  }

  public get currentStep(): FormulaAnimationStep {
    return this.formula.steps.find((s) => s.stepIndex === this.currentStepIndex) || this.formula.steps[0];
  }

  public get totalSteps(): number {
    return this.formula.steps.length;
  }

  /**
   * Render a specific step with Ghost Clone animation if requested
   */
  public async goToStep(targetStepIndex: number, animate: boolean = true) {
    if (targetStepIndex < 1 || targetStepIndex > this.totalSteps) return;
    if (this.isAnimating && animate) return;

    this.stopAudio();
    this.currentStepIndex = targetStepIndex;
    if (this.onStepChangeCallback) {
      this.onStepChangeCallback(this.currentStepIndex);
    }

    await this.renderStep(this.currentStepIndex, animate);
  }

  public nextStep() {
    if (this.currentStepIndex < this.totalSteps) {
      this.goToStep(this.currentStepIndex + 1, true);
    }
  }

  public prevStep() {
    if (this.currentStepIndex > 1) {
      this.goToStep(this.currentStepIndex - 1, true);
    }
  }

  /**
   * Core Ghost Clone Morph Execution (Spec 11)
   */
  private async renderStep(stepIndex: number, animate: boolean) {
    const step = this.formula.steps.find((s) => s.stepIndex === stepIndex);
    if (!step) return;

    const katexMount = this.container.querySelector<HTMLElement>('[data-katex-mount]');
    if (!katexMount) return;

    await document.fonts.ready;

    // 1. Render KaTeX with \htmlData trust enabled (Spec 11)
    const renderedHtml = katex.renderToString(step.katexDisplay, {
      displayMode: true,
      throwOnError: false,
      trust: (context) => context.command === '\\htmlData',
    });

    if (!animate) {
      katexMount.innerHTML = renderedHtml;
      this.highlightCells(step);
      return;
    }

    this.isAnimating = true;

    // Fast crossfade KaTeX container
    gsap.to(katexMount, {
      opacity: 0.3,
      duration: 0.1,
      onComplete: async () => {
        katexMount.innerHTML = renderedHtml;
        await document.fonts.ready;

        // Execute Ghost Clone for source cells -> target tokens
        this.executeGhostClones(step, katexMount);

        gsap.to(katexMount, {
          opacity: 1,
          duration: 0.15,
          onComplete: () => {
            this.isAnimating = false;
          },
        });
      },
    });

    this.highlightCells(step);
  }

  /**
   * Highlight relevant data table cells (Zone B Rule: Zero translation, color wash only)
   */
  private highlightCells(step: FormulaAnimationStep) {
    const allCells = this.container.querySelectorAll<HTMLElement>('[data-source-cell-id]');
    allCells.forEach((cell) => {
      cell.classList.remove(
        'bg-[#A3E635]/30',
        'bg-[#F59E0B]/30',
        'bg-[#E11D48]/30',
        'bg-[#2563EB]/30',
        'border-2',
        'border-[#171719]'
      );
    });

    if (step.sourceCellIds && step.sourceCellIds.length > 0) {
      step.sourceCellIds.forEach((id) => {
        const cell = this.container.querySelector<HTMLElement>(`[data-source-cell-id="${id}"]`);
        if (cell) {
          const status = cell.getAttribute('data-semantic') || 'tp';
          if (status === 'tp' || status === 'success') {
            cell.classList.add('bg-[#A3E635]/30', 'border-2', 'border-[#171719]');
          } else if (status === 'fp' || status === 'caution') {
            cell.classList.add('bg-[#F59E0B]/30', 'border-2', 'border-[#171719]');
          } else if (status === 'fn' || status === 'invalid') {
            cell.classList.add('bg-[#E11D48]/30', 'border-2', 'border-[#171719]');
          } else {
            cell.classList.add('bg-[#2563EB]/30', 'border-2', 'border-[#171719]');
          }
        }
      });
    }
  }

  /**
   * Spawn Ghost Clones from data table cells to target KaTeX tokens
   */
  private executeGhostClones(step: FormulaAnimationStep, katexMount: HTMLElement) {
    if (!step.sourceCellIds || step.sourceCellIds.length === 0) return;

    step.sourceCellIds.forEach((sourceId) => {
      const sourceEl = this.container.querySelector<HTMLElement>(`[data-source-cell-id="${sourceId}"]`);
      if (!sourceEl) return;

      // Find matching token with data-flip-id
      const targetToken = katexMount.querySelector<HTMLElement>(`[data-flip-id]`);
      if (!targetToken) return;

      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = targetToken.getBoundingClientRect();

      // Create ghost clone DOM node
      const ghost = document.createElement('div');
      ghost.className = 'ghost-clone-element bg-[#171719] text-[#A3E635] text-xs font-mono font-bold px-1.5 py-0.5 border border-[#171719] shadow-[2px_2px_0px_#171719]';
      ghost.textContent = sourceEl.textContent?.trim() || '';
      ghost.style.left = `${sourceRect.left}px`;
      ghost.style.top = `${sourceRect.top}px`;
      ghost.style.width = `${sourceRect.width}px`;
      ghost.style.height = `${sourceRect.height}px`;

      document.body.appendChild(ghost);

      // Hide target token briefly while ghost flies in
      targetToken.style.opacity = '0';

      const deltaX = targetRect.left - sourceRect.left;
      const deltaY = targetRect.top - sourceRect.top;

      gsap.to(ghost, {
        x: deltaX,
        y: deltaY,
        duration: 0.55,
        ease: 'power2.out',
        onComplete: () => {
          targetToken.style.opacity = '1';
          gsap.fromTo(targetToken, { scale: 1.25 }, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
          ghost.remove();
        },
      });
    });
  }

  /**
   * Audio narration: Plays pre-generated MP3 or falls back to Web Speech API
   */
  public playAudio() {
    if (this.isPlayingAudio) {
      this.stopAudio();
      return;
    }

    const audioPath = `/audio/tts/${this.formula.id}_step_${this.currentStepIndex}.mp3`;
    if (this.audioElement) {
      this.audioElement.src = audioPath;
      this.audioElement
        .play()
        .then(() => {
          this.isPlayingAudio = true;
          this.updateAudioButtonState(true);
        })
        .catch(() => {
          this.fallbackWebSpeech();
        });
    } else {
      this.fallbackWebSpeech();
    }
  }

  private fallbackWebSpeech() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const textToSpeak = this.currentStep.phoneticScript || this.currentStep.explanation;
    this.speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
    this.speechUtterance.lang = 'th-TH';
    this.speechUtterance.rate = 1.0;

    this.speechUtterance.onstart = () => {
      this.isPlayingAudio = true;
      this.updateAudioButtonState(true);
    };

    this.speechUtterance.onend = () => {
      this.isPlayingAudio = false;
      this.updateAudioButtonState(false);
    };

    this.speechUtterance.onerror = () => {
      this.isPlayingAudio = false;
      this.updateAudioButtonState(false);
    };

    window.speechSynthesis.speak(this.speechUtterance);
  }

  public stopAudio() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlayingAudio = false;
    this.updateAudioButtonState(false);
  }

  private updateAudioButtonState(isPlaying: boolean) {
    const playBtn = this.container.querySelector<HTMLElement>('[data-audio-toggle]');
    if (!playBtn) return;
    if (isPlaying) {
      playBtn.classList.add('bg-[#A3E635]', 'text-[#171719]');
      playBtn.innerHTML = `
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        <span>หยุดเสียง</span>
      `;
    } else {
      playBtn.classList.remove('bg-[#A3E635]', 'text-[#171719]');
      playBtn.innerHTML = `
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        <span>ฟังคำอธิบายเสียงไทย (Free)</span>
      `;
    }
  }
}
