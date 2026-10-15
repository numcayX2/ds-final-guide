import type { UserProgressState } from '../types/study';

const STORAGE_KEY = 'ds_10301351_progress_v1';

const defaultState: UserProgressState = {
  completedModuleIds: [],
  masteredFormulaIds: [],
  examAnswers: {},
  scratchpadRows: Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    col1: '',
    col2: '',
    col3: '',
    col4: '',
  })),
  finalFocusOnly: true,
};

export class ProgressStore {
  public static load(): UserProgressState {
    if (typeof window === 'undefined') return defaultState;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? { ...defaultState, ...JSON.parse(data) } : defaultState;
    } catch {
      return defaultState;
    }
  }

  public static save(state: Partial<UserProgressState>) {
    if (typeof window === 'undefined') return;
    try {
      const current = this.load();
      const updated = { ...current, ...state };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('ds-progress-updated', { detail: updated }));
    } catch (e) {
      console.warn('Failed to save progress to localStorage:', e);
    }
  }

  public static toggleModuleCompleted(moduleId: string): boolean {
    const state = this.load();
    const exists = state.completedModuleIds.includes(moduleId);
    const updatedList = exists
      ? state.completedModuleIds.filter((id) => id !== moduleId)
      : [...state.completedModuleIds, moduleId];

    this.save({ completedModuleIds: updatedList });
    return !exists;
  }

  public static toggleFormulaMastered(formulaId: string): boolean {
    const state = this.load();
    const exists = state.masteredFormulaIds.includes(formulaId);
    const updatedList = exists
      ? state.masteredFormulaIds.filter((id) => id !== formulaId)
      : [...state.masteredFormulaIds, formulaId];

    this.save({ masteredFormulaIds: updatedList });
    return !exists;
  }
}
