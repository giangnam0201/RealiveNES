# RealiveNES

Play NES games directly in your browser. No downloads, no installs — just pick a game and play.

## How It Works

1. **Built-in catalog** of 80+ homebrew NES games (all free/legal)
2. ROMs served via **jsDelivr CDN** (fast, reliable, CORS-enabled)
3. Click **Play** → [EmulatorJS](https://emulatorjs.org/) loads and runs the game instantly

No server, no API calls, no Archive.org dependency. Just open the HTML and game.

## Structure

```
index.html        - Main page (split-panel: game list + emulator)
js/
├── games-db.js   - Game catalog with jsDelivr CDN URLs
└── app.js        - UI controller + EmulatorJS launcher
```

## Game Source

All games are homebrew/open-source from [retrobrews/nes-games](https://github.com/retrobrews/nes-games) on GitHub, served through jsDelivr CDN.

Includes: platformers, shooters, puzzle games, fighting games, arcade classics, and more.

## Default Controls

| Action | Key |
|--------|-----|
| D-Pad | Arrow Keys |
| A | X |
| B | Z |
| Start | Enter |
| Select | Shift |
| Save State | F1 |
| Load State | F4 |

Gamepads supported automatically.

## Usage

Open `index.html` in any modern browser. That's it.

## Credits

- [EmulatorJS](https://emulatorjs.org/) — RetroArch-based browser emulation
- [retrobrews/nes-games](https://github.com/retrobrews/nes-games) — Homebrew NES games
- [jsDelivr](https://www.jsdelivr.com/) — CDN for GitHub files

## License

MIT
