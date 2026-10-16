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

    // Interrupt any active animation immediately
    if (this.isAnimating) {
      this.cleanupGhosts();
      this.isAnimating = false;
    }

    this.cleanupGhosts();
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
   * Core In-Equation Token Morph Execution (Zero Floating Boxes)
   */
  private async renderStep(stepIndex: number, animate: boolean) {
    const step = this.formula.steps.find((s) => s.stepIndex === stepIndex);
    if (!step) return;

    const katexMount = this.container.querySelector<HTMLElement>('[data-katex-mount]');
    if (!katexMount) return;

    await document.fonts.ready;

    // Capture previous token texts before updating DOM so we know which tokens actually changed
    const prevTokenTexts = new Map<string, string>();
    katexMount.querySelectorAll<HTMLElement>('[data-flip-id]').forEach((el) => {
      const id = el.getAttribute('data-flip-id');
      if (id) {
        prevTokenTexts.set(id, (el.textContent || '').trim());
      }
    });

    // Render KaTeX with \htmlData trust enabled
    const renderedHtml = katex.renderToString(step.katexDisplay, {
      displayMode: true,
      throwOnError: false,
      trust: (context) => context.command === '\\htmlData',
    });

    this.highlightCells(step);

    if (!animate || prevTokenTexts.size === 0) {
      this.cleanupGhosts();
      katexMount.innerHTML = renderedHtml;
      this.decorateTokens(step, katexMount);
      return;
    }

    this.cleanupGhosts();
    this.isAnimating = true;

    const outgoingTokens = Array.from(katexMount.querySelectorAll<HTMLElement>('[data-flip-id]'));

    const onSwapAndMorph = () => {
      katexMount.style.opacity = '1';
      katexMount.style.transform = 'none';
      katexMount.style.filter = 'none';
      katexMount.innerHTML = renderedHtml;

      this.decorateTokens(step, katexMount);
      this.animateEquationTokensInPlace(katexMount, prevTokenTexts);
    };

    if (outgoingTokens.length > 0) {
      // Morph outgoing tokens in-place without blurring or blanking the whole equation
      gsap.to(outgoingTokens, {
        opacity: 0.1,
        y: -4,
        scale: 0.94,
        duration: 0.12,
        stagger: 0.02,
        ease: 'power2.in',
        onComplete: onSwapAndMorph,
      });
    } else {
      onSwapAndMorph();
    }
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
   * Kill any active GSAP tweens on equation tokens and reset state cleanly
   */
  public cleanupGhosts() {
    const katexMount = this.container.querySelector<HTMLElement>('[data-katex-mount]');
    if (katexMount) {
      gsap.killTweensOf(katexMount);
      katexMount.style.opacity = '1';
      katexMount.style.transform = 'none';
      katexMount.style.filter = 'none';

      katexMount.querySelectorAll<HTMLElement>('[data-flip-id]').forEach((token) => {
        gsap.killTweensOf(token);
        token.style.opacity = '1';
        token.style.transform = 'none';
        token.style.filter = 'none';
      });
    }
  }

  /**
   * Resolve semantic highlight class for a token inside the KaTeX equation
   */
  private resolveTokenSemanticClass(step: FormulaAnimationStep, tokenId: string, tokenIdx: number): string {
    const lowerToken = tokenId.toLowerCase();
    const semanticKeywords = ['tp', 'tn', 'fp', 'fn', 'act', 'inact', 'q1', 'q3', 'iqr', 'sd', 'mean', 'bi', 'ai', 'c2', 'c3'];

    let matchedSourceId: string | undefined;
    for (const kw of semanticKeywords) {
      if (lowerToken.includes(kw)) {
        matchedSourceId = step.sourceCellIds?.find((sId) => sId.toLowerCase().includes(kw));
        if (matchedSourceId) break;
      }
    }

    if (!matchedSourceId && step.sourceCellIds && step.sourceCellIds.length > 0) {
      matchedSourceId = step.sourceCellIds[tokenIdx] || step.sourceCellIds[0];
    }

    let status = step.highlightStatus || 'neutral';
    if (matchedSourceId) {
      const sourceEl = this.container.querySelector<HTMLElement>(`[data-source-cell-id="${matchedSourceId}"]`);
      const cellSemantic = sourceEl?.getAttribute('data-semantic');
      if (cellSemantic && cellSemantic !== 'neutral') {
        status = cellSemantic as typeof status;
      }
    }

    if (lowerToken.includes('fp') || lowerToken.includes('inact') || status === 'fp' || status === 'caution') {
      return 'katex-token-fp';
    }
    if (lowerToken.includes('fn') || lowerToken.includes('inv') || status === 'fn' || status === 'invalid') {
      return 'katex-token-fn';
    }
    if (lowerToken.includes('tp') || lowerToken.includes('tn') || lowerToken.includes('act') || lowerToken.includes('result') || status === 'tp' || status === 'success') {
      return 'katex-token-tp';
    }
    return 'katex-token-neutral';
  }

  /**
   * Apply clean inline badge classes directly to [data-flip-id] spans inside the KaTeX equation
   */
  private decorateTokens(step: FormulaAnimationStep, katexMount: HTMLElement) {
    const tokens = Array.from(katexMount.querySelectorAll<HTMLElement>('[data-flip-id]'));
    tokens.forEach((token, idx) => {
      const tokenId = token.getAttribute('data-flip-id') || `token-${idx}`;
      const semanticClass = this.resolveTokenSemanticClass(step, tokenId, idx);
      token.classList.add('katex-morph-token', semanticClass);
    });
  }

  /**
   * Animate tokens morphing directly in-place within the KaTeX equation
   */
  private animateEquationTokensInPlace(katexMount: HTMLElement, prevTokenTexts: Map<string, string>) {
    const allTokens = Array.from(katexMount.querySelectorAll<HTMLElement>('[data-flip-id]'));
    if (allTokens.length === 0) {
      this.isAnimating = false;
      return;
    }

    const changedTokens: HTMLElement[] = [];
    const unchangedTokens: HTMLElement[] = [];

    allTokens.forEach((token) => {
      const id = token.getAttribute('data-flip-id') || '';
      const currentText = (token.textContent || '').trim();
      const prevText = prevTokenTexts.get(id);

      if (prevText === undefined || prevText !== currentText) {
        changedTokens.push(token);
      } else {
        unchangedTokens.push(token);
      }
    });

    const targetsToMorph = changedTokens.length > 0 ? changedTokens : allTokens;

    if (unchangedTokens.length > 0 && changedTokens.length > 0) {
      gsap.fromTo(
        unchangedTokens,
        { opacity: 0.6, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.2, ease: 'power1.out' }
      );
    }

    gsap.fromTo(
      targetsToMorph,
      {
        opacity: 0.2,
        y: 6,
        scale: 0.92,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.26,
        stagger: 0.04,
        ease: 'power2.out',
        onComplete: () => {
          this.isAnimating = false;
        },
      }
    );
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
    const playBtns = this.container.querySelectorAll<HTMLElement>('[data-audio-toggle]');
    playBtns.forEach((btn) => {
      const isStepBtn = btn.getAttribute('data-audio-context') === 'step';
      const textSpan = btn.querySelector('[data-audio-text]') || btn.querySelector('span');
      const iconSvg = btn.querySelector('svg');

      btn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');

      if (isPlaying) {
        btn.classList.add('bg-[#A3E635]', 'text-[#171719]');
        btn.classList.remove('text-[#A3E635]', 'bg-white');
        if (iconSvg) {
          iconSvg.outerHTML = `
            <svg class="w-4 h-4 animate-pulse flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          `;
        }
        if (textSpan) {
          textSpan.textContent = isStepBtn ? 'หยุดเสียงบรรยาย' : 'หยุดเสียง';
        }
      } else {
        btn.classList.remove('bg-[#A3E635]', 'text-[#171719]');
        if (isStepBtn) {
          btn.classList.add('bg-white', 'text-[#171719]');
        } else {
          btn.classList.add('text-[#A3E635]');
        }
        if (iconSvg) {
          iconSvg.outerHTML = `
            <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          `;
        }
        if (textSpan) {
          textSpan.textContent = isStepBtn ? 'ฟังเสียงอธิบายสเต็ปนี้' : 'ฟังคำอธิบายเสียงไทย';
        }
      }
    });
  }
}
