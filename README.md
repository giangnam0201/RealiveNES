# RealiveNES

Play NES games directly in your browser. No downloads, no installs — just pick a game and play.

## How It Works

1. A **built-in game catalog** (~70 classic NES titles) with direct ROM URLs
2. Click **Play** on any game
3. [EmulatorJS](https://emulatorjs.org/) loads the ROM and runs it instantly via WebAssembly

No server, no API calls, no CORS proxy. Just open the HTML file and game.

## Structure

```
index.html        - Main page (split-panel: game list + emulator)
js/
├── games-db.js   - Built-in catalog of NES games with ROM URLs
└── app.js        - UI controller + EmulatorJS launcher
```

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

Gamepads are also supported automatically.

## Usage

Open `index.html` in any modern browser. That's it.

## Credits

- [EmulatorJS](https://emulatorjs.org/) — RetroArch-based browser emulation
- ROM source: Archive.org public collections

## License

MIT
