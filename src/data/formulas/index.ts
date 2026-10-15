import type { FormulaAnimation } from '../../types/study';
import { precisionFormula } from './precision';
import { recallFormula } from './recall';
import { accuracyFormula } from './accuracy';
import { f1ScoreFormula } from './f1-score';
import { validMeanFormula } from './valid-mean';
import { clusterMedianFormula } from './cluster-median';
import { minMaxFormula } from './min-max';
import { zScoreFormula } from './z-score';
import { tukeyFencesFormula } from './tukey-fences';
import { giniImpurityFormula } from './gini-impurity';
import { giniSplitFormula } from './gini-split';
import { giniGainFormula } from './gini-gain';
import { kmeansDistanceCentroidFormula } from './kmeans-distance-centroid';
import { silhouetteScoreFormula } from './silhouette-score';

export {
  precisionFormula,
  recallFormula,
  accuracyFormula,
  f1ScoreFormula,
  validMeanFormula,
  clusterMedianFormula,
  minMaxFormula,
  zScoreFormula,
  tukeyFencesFormula,
  giniImpurityFormula,
  giniSplitFormula,
  giniGainFormula,
  kmeansDistanceCentroidFormula,
  silhouetteScoreFormula,
};

export const allFormulas: FormulaAnimation[] = [
  precisionFormula,
  recallFormula,
  accuracyFormula,
  f1ScoreFormula,
  validMeanFormula,
  clusterMedianFormula,
  minMaxFormula,
  zScoreFormula,
  tukeyFencesFormula,
  giniImpurityFormula,
  giniSplitFormula,
  giniGainFormula,
  kmeansDistanceCentroidFormula,
  silhouetteScoreFormula,
];

export const formulaMap: Record<string, FormulaAnimation> = Object.fromEntries(
  allFormulas.map((f) => [f.id, f])
);

export const finalFocusFormulas = allFormulas.filter((f) => f.isFinalFocus);
export const foundationFormulas = allFormulas.filter((f) => !f.isFinalFocus);
