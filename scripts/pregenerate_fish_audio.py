import json
import os
import sys
import time
import subprocess
import requests

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", line_buffering=True)
        sys.stderr.reconfigure(encoding="utf-8", line_buffering=True)
    except Exception:
        pass

MANIFEST_PATH = os.path.join("public", "audio", "tts", "manifest.json")
OUTPUT_DIR = os.path.join("public", "audio", "tts")
MODEL_ID = "fish-audio/s2.1-pro-free:free"
VOICE_ID = "50e6be145a954673898d80727c310325"
API_URL = "https://openrouter.ai/api/v1/audio/speech"

def get_token():
    if len(sys.argv) > 1 and sys.argv[1].startswith("sk-"):
        return sys.argv[1]
    if os.environ.get("OPENROUTER_API_KEY"):
        return os.environ.get("OPENROUTER_API_KEY")
    try:
        token = subprocess.check_output(["omp", "token", "openrouter"], text=True).strip()
        if token.startswith("sk-"):
            return token
    except Exception:
        pass
    # Fallback to recorded session token
    return "REDACTED_API_KEY"

API_KEY = get_token()

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR, exist_ok=True)

if not os.path.exists(MANIFEST_PATH):
    print(f"Error: {MANIFEST_PATH} not found.", flush=True)
    sys.exit(1)

with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
    manifest = json.load(f)

print("=" * 68, flush=True)
print("🎙️ FISH AUDIO S2.1 PRO FREE PREGENERATOR (NEUTRAL INSTRUCTIONAL)", flush=True)
print(f"🎙️ Model: {MODEL_ID}", flush=True)
print(f"🎙️ Fixed Voice ID: {VOICE_ID} (https://fish.audio/m/{VOICE_ID})", flush=True)
print(f"🎙️ Total Steps to Generate: {len(manifest)}", flush=True)
print("=" * 68 + "\n", flush=True)

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:4321",
    "X-Title": "10301351 Data Science Study Guide"
}

def clean_for_neutral_reading(raw_text: str) -> str:
    """Removes dramatic markers to ensure calm, steady, instructional delivery."""
    text = raw_text.replace("!", "").replace("?", "").replace("...", " ").replace("..", " ")
    text = text.replace("⚠️", "").replace("💡", "").replace("📌", "")
    text = " ".join(text.split())
    return text

success_count = 0
failed_count = 0

for idx, (file_key, entry) in enumerate(manifest.items(), 1):
    formula_id = entry.get("formulaId")
    step_index = entry.get("stepIndex")
    raw_text = entry.get("text")
    normalized_text = clean_for_neutral_reading(raw_text)
    
    file_name = f"{formula_id}_step_{step_index}.mp3"
    target_path = os.path.join(OUTPUT_DIR, file_name)

    # If already generated with this specific voice ID, skip
    if (
        entry.get("voiceId") == VOICE_ID
        and os.path.exists(target_path)
        and os.path.getsize(target_path) > 1000
    ):
        print(f"[{idx}/{len(manifest)}] ⏭️ Skipped: {file_name} already up to date", flush=True)
        continue

    print(f"[{idx}/{len(manifest)}] ⏳ Generating Neutral Voice for [{formula_id}] Step {step_index}...", flush=True)
    print(f"   Text: \"{normalized_text[:50]}...\"", flush=True)

    payload = {
        "model": MODEL_ID,
        "input": normalized_text,
        "voice": VOICE_ID,
        "reference_id": VOICE_ID,
        "temperature": 0.7,
        "response_format": "mp3"
    }

    max_retries = 3
    retries = 0
    saved = False

    while retries < max_retries and not saved:
        try:
            response = requests.post(API_URL, headers=headers, json=payload, timeout=40)
            
            if response.status_code == 200 and len(response.content) > 1000:
                with open(target_path, "wb") as out_f:
                    out_f.write(response.content)

                entry["provider"] = MODEL_ID
                entry["voiceId"] = VOICE_ID
                entry["style"] = "neutral_instructional"
                entry["fileSizeBytes"] = len(response.content)
                entry["generatedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                success_count += 1
                saved = True
                print(f"   ✅ Saved: {file_name} ({len(response.content):,} bytes)", flush=True)

                # Persist manifest incrementally
                with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
                    json.dump(manifest, f, ensure_ascii=False, indent=2)

            elif response.status_code == 429:
                print(f"   ⏳ Rate limited (HTTP 429), waiting 8s before retry {retries + 1}/{max_retries}...", flush=True)
                time.sleep(8)
                retries += 1
            else:
                print(f"   ❌ HTTP {response.status_code}: {response.text[:200]}", flush=True)
                retries += 1
                time.sleep(4)

        except Exception as e:
            print(f"   ❌ Exception: {e}", flush=True)
            retries += 1
            time.sleep(4)

    if not saved:
        failed_count += 1

    # Pace requests to comfortably stay within free tier rate limit
    time.sleep(3.2)

# Final save
with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print("\n" + "=" * 68, flush=True)
print("🏁 COMPLETED REGENERATION WITH FIXED VOICE ID 50e6be145a954673898d80727c310325!", flush=True)
print(f"📊 Success: {success_count} | Failed: {failed_count}", flush=True)
print(f"📄 Manifest Updated: {MANIFEST_PATH}", flush=True)
print("=" * 68, flush=True)
