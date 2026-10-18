import type { StudyModule } from '../../types/study';
import { module01CrispDs } from './module-01-crisp-ds';
import { module02DataCleaning } from './module-02-data-cleaning';
import { module03FeatureEngineering } from './module-03-feature-engineering';
import { module04EdaOutliers } from './module-04-eda-outliers';
import { module05ModelingFramework } from './module-05-modeling-framework';
import { module06DecisionTree } from './module-06-decision-tree';
import { module07EvaluationMetrics } from './module-07-evaluation-metrics';
import { module08Kmeans } from './module-08-kmeans';
import { module09ResponsibleAi } from './module-09-responsible-ai';
import { module10CrispAction } from './module-10-crisp-action';

export {
  module01CrispDs,
  module02DataCleaning,
  module03FeatureEngineering,
  module04EdaOutliers,
  module05ModelingFramework,
  module06DecisionTree,
  module07EvaluationMetrics,
  module08Kmeans,
  module09ResponsibleAi,
  module10CrispAction,
};

export const allModules: StudyModule[] = [
  module01CrispDs,
  module02DataCleaning,
  module03FeatureEngineering,
  module04EdaOutliers,
  module05ModelingFramework,
  module06DecisionTree,
  module07EvaluationMetrics,
  module08Kmeans,
  module09ResponsibleAi,
  module10CrispAction,
];

export const moduleMap: Record<string, StudyModule> = Object.fromEntries(
  allModules.map((m) => [m.id, m])
);

export const finalFocusModules = allModules.filter((m) => m.isFinalFocus);
export const foundationModules = allModules.filter((m) => !m.isFinalFocus);
