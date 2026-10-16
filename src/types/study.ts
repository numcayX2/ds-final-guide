/**
 * 10301351 Data Science Study WebApp - Core Schema v1 (Spec 14)
 * Strict typing for modules, interactive KaTeX formula morphing, business labs, and exams.
 */

export type SemanticStatus = 'neutral' | 'tp' | 'fp' | 'fn' | 'tn' | 'invalid' | 'caution' | 'success';

export interface DataTableCell {
  id: string; // Used as sourceCellId in GSAP Token Morphing
  value: string | number;
  label?: string;
  semantic?: SemanticStatus;
}

export interface DataTableRow {
  rowId: string;
  cells: Record<string, DataTableCell>;
  isHighlighted?: boolean;
}

export interface FormulaAnimationStep {
  stepIndex: number;
  title: string;
  explanation: string;
  // KaTeX formula with \htmlData{flip-id=tokenId}{val}
  katexDisplay: string;
  sourceCellIds?: string[];
  targetTokenIds?: string[];
  highlightStatus?: SemanticStatus;
  examTrapWarning?: string;
  phoneticScript?: string; // Thai script for audio synthesis
}

export interface FormulaAnimation {
  id: string; // e.g. 'precision', 'valid-mean', 'gini-gain'
  name: string;
  thaiName: string;
  lectureRef: string; // e.g. 'Lect 07 p22, p30'
  category: 'cleaning' | 'scaling' | 'eda' | 'tree' | 'evaluation' | 'clustering' | 'ethics';
  isFinalFocus: boolean;
  baseFormulaLatex: string;
  description: string;
  dataset: {
    headers: Array<{ key: string; label: string }>;
    rows: DataTableRow[];
  };
  steps: FormulaAnimationStep[];
  oneLineRule: string;
  businessImpact?: {
    primaryCareMetric: 'precision' | 'recall' | 'f1';
    tradeoffSummary: string;
    realWorldCaseReference?: string;
  };
}

/**
 * Deterministic audio path resolver (Spec 14 rule: no audioFilePath field in schema)
 */
export function getAudioPath(formulaId: string, stepIndex: number): string {
  return `/audio/tts/${formulaId}_step_${stepIndex}.mp3`;
}

export interface ModuleExamTrap {
  trapTitle: string;
  trapDescription: string;
  correctApproach: string;
  slideRef: string;
}

export interface ModuleSection {
  title: string;
  conceptSummary: string;
  keyPoints: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface StudyModule {
  id: string; // e.g. 'module-07-decision-tree'
  moduleNumber: string; // e.g. '07'
  title: string;
  titleEn: string;
  lectureCode: string; // e.g. 'Lect 07'
  isFinalFocus: boolean; // True for Lect 05-09, false for Foundation 01-04.2
  timeEstimateMinutes: number;
  quickSummary: string;
  coreFormulas: string[]; // references FormulaAnimation.id
  examTraps: ModuleExamTrap[];
  sections: ModuleSection[];
}

export interface MCQOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  explanation: string;
  distractorNote?: string;
}

export interface ExamQuestion {
  id: string;
  questionNumber: number;
  moduleRef: string;
  slideRef: string;
  title: string;
  scenario: string;
  dataTable?: {
    headers: string[];
    rows: (string | number)[][];
  };
  options: MCQOption[];
  difficulty: 'direct' | 'calculated' | 'business_trap';
}

export interface UserProgressState {
  completedModuleIds: string[];
  masteredFormulaIds: string[];
  examAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  scratchpadRows: Array<{ id: number; col1: string; col2: string; col3: string; col4: string }>;
  finalFocusOnly: boolean;
  lastActiveFormulaId?: string;
}
