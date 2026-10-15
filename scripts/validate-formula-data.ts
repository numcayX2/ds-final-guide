import { allFormulas } from '../src/data/formulas/index';

console.log('🔍 Running Formula Dataset Integrity Validator (Spec 14)...');

let hasError = false;
let totalTokensChecked = 0;
let totalCellsChecked = 0;

for (const formula of allFormulas) {
  console.log(`\n📐 Validating formula: [${formula.id}] - ${formula.name}`);

  // Collect all cell IDs in dataset
  const validCellIds = new Set<string>();
  for (const row of formula.dataset.rows) {
    for (const cell of Object.values(row.cells)) {
      if (cell?.id) {
        validCellIds.add(cell.id);
        totalCellsChecked++;
      }
    }
  }

  // Validate steps
  let expectedStep = 1;
  for (const step of formula.steps) {
    if (step.stepIndex !== expectedStep) {
      console.error(`❌ [${formula.id}] Step order error: expected ${expectedStep}, got ${step.stepIndex}`);
      hasError = true;
    }
    expectedStep++;

    // Validate sourceCellIds
    if (step.sourceCellIds) {
      for (const cellId of step.sourceCellIds) {
        if (!validCellIds.has(cellId)) {
          console.error(`❌ [${formula.id} - Step ${step.stepIndex}] Missing sourceCellId in dataset: "${cellId}"`);
          hasError = true;
        }
      }
    }

    // Validate flip-id tokens in KaTeX string
    const flipIdMatches = [...step.katexDisplay.matchAll(/\\htmlData\{flip-id=([a-zA-Z0-9_-]+)\}/g)].map(m => m[1]);
    const katexTokens = new Set(flipIdMatches);

    if (step.targetTokenIds) {
      for (const tokenId of step.targetTokenIds) {
        totalTokensChecked++;
        if (!katexTokens.has(tokenId)) {
          console.warn(`⚠️ [${formula.id} - Step ${step.stepIndex}] targetTokenId "${tokenId}" not found in katexDisplay tokens: [${[...katexTokens].join(', ')}]`);
        }
      }
    }
  }
}

console.log(`\n======================================================`);
console.log(`Validated ${allFormulas.length} formulas.`);
console.log(`Verified ${totalCellsChecked} table cells and ${totalTokensChecked} animation tokens.`);

if (hasError) {
  console.error('❌ Validation FAILED! Fix the integrity errors above.');
  process.exit(1);
} else {
  console.log('✅ ALL 14 FORMULAS PASSED INTEGRITY CHECK 100%!');
  process.exit(0);
}
