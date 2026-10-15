import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import * as googleTTS from 'google-tts-api';
import { allFormulas } from '../src/data/formulas/index';

interface ManifestEntry {
  hash: string;
  formulaId: string;
  stepIndex: number;
  text: string;
  filePath: string;
  generatedAt: string;
  provider: string;
  fileSizeBytes: number;
}

const AUDIO_DIR = path.resolve('public/audio/tts');
const MANIFEST_PATH = path.resolve('public/audio/tts/manifest.json');
const LEXICON_PATH = path.resolve('scripts/phonetic-lexicon.json');

// Ensure directory exists
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

let manifest: Record<string, ManifestEntry> = {};
if (fs.existsSync(MANIFEST_PATH)) {
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  } catch {
    manifest = {};
  }
}

let lexicon: Record<string, string> = {};
if (fs.existsSync(LEXICON_PATH)) {
  try {
    lexicon = JSON.parse(fs.readFileSync(LEXICON_PATH, 'utf-8'));
  } catch {
    lexicon = {};
  }
}

function applyPhoneticLexicon(text: string): string {
  let res = text;
  for (const [enTerm, thPhonetic] of Object.entries(lexicon)) {
    const escaped = enTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    res = res.replace(regex, thPhonetic);
  }
  return res;
}

function computeHash(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex').substring(0, 16);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('🎙️ ========================================================');
  console.log('🎙️ STARTING 100% FREE THAI TTS PREGENERATION PIPELINE');
  console.log('🎙️ Target Directory:', AUDIO_DIR);
  console.log('🎙️ Total Formulas to process:', allFormulas.length);
  console.log('🎙️ ========================================================\n');

  let generatedCount = 0;
  let skippedCount = 0;
  let totalSteps = 0;

  for (const formula of allFormulas) {
    for (const step of formula.steps) {
      totalSteps++;
      const baseText = step.phoneticScript || step.explanation;
      const normalizedText = applyPhoneticLexicon(baseText);
      const textHash = computeHash(normalizedText);

      const fileKey = `${formula.id}_step_${step.stepIndex}`;
      const fileName = `${fileKey}.mp3`;
      const targetFilePath = path.join(AUDIO_DIR, fileName);

      // Check if file already exists with same hash
      if (manifest[fileKey]?.hash === textHash && fs.existsSync(targetFilePath)) {
        skippedCount++;
        continue;
      }

      console.log(`🔊 [${formula.id}] Step ${step.stepIndex}: "${normalizedText.substring(0, 45)}..."`);

      try {
        // Enforce 100% free TTS generation (Rate-limited, zero API billing)
        const base64 = await googleTTS.getAudioBase64(normalizedText, {
          lang: 'th',
          slow: false,
          host: 'https://translate.google.com',
          timeout: 15000,
        });

        const buffer = Buffer.from(base64, 'base64');
        fs.writeFileSync(targetFilePath, buffer);

        manifest[fileKey] = {
          hash: textHash,
          formulaId: formula.id,
          stepIndex: step.stepIndex,
          text: normalizedText,
          filePath: `/audio/tts/${fileName}`,
          generatedAt: new Date().toISOString(),
          provider: 'free-neural-tts-engine',
          fileSizeBytes: buffer.length,
        };

        generatedCount++;

        // Friendly sleep to avoid rate limiting
        await sleep(600);
      } catch (err: any) {
        console.error(`❌ Failed to generate audio for ${fileKey}:`, err?.message);
      }
    }
  }

  // Save manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log('\n========================================================');
  console.log(`✅ TTS GENERATION COMPLETED!`);
  console.log(`📊 Total Steps: ${totalSteps} | Generated: ${generatedCount} | Skipped: ${skippedCount}`);
  console.log(`📁 Audio Files Location: ${AUDIO_DIR}`);
  console.log(`📄 Manifest File: ${MANIFEST_PATH}`);
  console.log('========================================================\n');
}

main().catch(console.error);
