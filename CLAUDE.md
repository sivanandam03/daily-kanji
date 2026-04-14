# Daily Kanji — Claude Context

## Project Overview
A Google Chrome Extension (Manifest V3) that replaces the new tab page with a daily Kanji lesson — stroke order, readings, and meaning. Targets JLPT N5 kanji.

## File Structure
- `manifest.json` — Chrome extension manifest (MV3)
- `newtab.html` — New tab override page
- `newtab.js` — Main extension logic
- `style.css` — Styles
- `data/kanji.json` — Kanji dataset (N5 level)
- `icons/` — Extension icons (16px, 48px, 128px)

## Key Facts
- Manifest version: 3
- Current version: 1.0.0 (increment on every Chrome Web Store update)
- No permissions declared — extension is entirely local/static
- No network requests, no user data collected

## Publishing
- Developer account: already created and payment completed (one-time $5 fee)
- Dashboard: https://chrome.google.com/webstore/devconsole
- To publish: zip the project directory, upload via "New Item" in the dashboard
- ZIP command: `cd /home/siva/projects/personal && zip -r daily-kanji.zip daily-kanji/ --exclude "daily-kanji/*.Zone.Identifier" --exclude "daily-kanji/.git/*"`
- Screenshots required: at least 1 at 1280×800 or 640×400 px
- Category: Education or Productivity

## Descriptions

### Short Description (for `manifest.json` — 132 chars max)
```
Learn one JLPT N5 Kanji every day. See its meaning, kun/on readings, stroke count, and animated stroke order on every new tab.
```

### Full Store Listing Description (for Chrome Web Store)
```
Daily Kanji turns your new tab into a quiet, distraction-free Japanese learning moment.

Every day, a new JLPT N5 Kanji greets you when you open a tab — no app to launch, no habit to build. Just open your browser and learn.

Each Kanji card shows you:
• The Kanji character, large and clear
• Its English meaning
• Kun'yomi and On'yomi readings with pronunciation
• Stroke count

Tap "Watch Stroke Order" to see an animated breakdown of every stroke, drawn in the correct order — the same way it's taught in Japan.

80 essential N5 Kanji rotate day by day throughout the year, so every session is something new.

No sign-up. No ads. No data collected. Just Kanji.

— Perfect for beginners starting their Japanese journey
— Great as a gentle daily reminder for intermediate learners
— Beautifully minimal design that won't distract from your workflow
```

## Update Workflow
1. Make changes
2. Increment `version` in `manifest.json`
3. Re-zip the directory
4. Upload new ZIP in the Chrome Web Store dashboard under the existing listing
