# RealiveNES

Play NES games directly in your browser. No downloads, no installs — just pick a game and play.

Pulls a live ROM directory from Archive.org and launches games using EmulatorJS, all without any external CORS proxies.

## How It Works

### CORS Bypass via JSONP
Archive.org's Advanced Search API doesn't support standard CORS. We use JSONP — dynamically injecting `<script>` tags with a callback parameter — to fetch game listings directly from the browser.

### In-Browser Emulation
Games are loaded directly into [EmulatorJS](https://emulatorjs.org/) (RetroArch WebAssembly core) — no ROM downloads required. Just click Play and you're gaming.

### Architecture

```
index.html          - Main page with split-panel UI
js/
├── jsonp.js        - JSONP utility (CORS bypass)
├── archive-api.js  - Archive.org API integration
├── rom-fetcher.js  - ROM file discovery
└── app.js          - UI controller & emulator launcher
```

## Features

- **Play in Browser** — Click a game, play instantly via EmulatorJS
- **Live ROM Directory** — Fetches NES ROM listings from Archive.org
- **Search** — Filter games by title
- **Pagination** — Browse through large collections
- **Save/Load States** — Built-in save state support via EmulatorJS
- **Gamepad Support** — Controller support out of the box
- **No Server Required** — Runs entirely in the browser (static HTML)
- **No CORS Proxy** — JSONP for cross-origin requests

## Default Controls

| Action | Key |
|--------|-----|
| D-Pad | Arrow Keys |
| A Button | X |
| B Button | Z |
| Start | Enter |
| Select | Shift |
| Save State | F1 |
| Load State | F4 |

## Usage

Open `index.html` in any modern browser. That's it.

```bash
# Or serve locally
npx serve .
```

## Credits

- [EmulatorJS](https://emulatorjs.org/) — Browser-based RetroArch emulation
- [Archive.org](https://archive.org/) — ROM source (public domain collections)

## License

MIT
