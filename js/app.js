/**
 * RealiveNES - Main Application
 * 
 * Game selector UI + EmulatorJS integration via iframe.
 * Uses iframe approach so EmulatorJS can be fully reloaded
 * for each new game without "already declared" errors.
 */

const App = (() => {
  // State
  let currentQuery = '';
  let currentGenre = '';
  let currentGameTitle = null;
  let emulatorActive = false;

  // DOM refs
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const genreFilter = document.getElementById('genreFilter');
  const gameListEl = document.getElementById('gameList');
  const gameCountEl = document.getElementById('gameCount');
  const emulatorWrapper = document.getElementById('emulator-wrapper');
  const emulatorPlaceholder = document.getElementById('emulatorPlaceholder');
  const nowPlaying = document.getElementById('nowPlaying');
  const nowPlayingTitle = document.getElementById('nowPlayingTitle');
  const stopBtn = document.getElementById('stopBtn');

  function init() {
    // Populate genre dropdown
    genreFilter.innerHTML = '<option value="">All Genres</option>';
    GamesDB.genres.forEach(g => {
      const opt = document.createElement('option');
      opt.value = g;
      opt.textContent = g;
      genreFilter.appendChild(opt);
    });

    // Events
    searchBtn.addEventListener('click', renderGames);
    searchInput.addEventListener('input', renderGames);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') renderGames();
    });
    genreFilter.addEventListener('change', renderGames);
    stopBtn.addEventListener('click', stopEmulator);

    // Initial render
    renderGames();
  }

  function renderGames() {
    currentQuery = searchInput.value.trim();
    currentGenre = genreFilter.value;

    const results = GamesDB.search({ query: currentQuery, genre: currentGenre });
    gameCountEl.textContent = `${results.length} game${results.length !== 1 ? 's' : ''}`;

    gameListEl.innerHTML = '';

    if (results.length === 0) {
      gameListEl.innerHTML = '<div class="no-results">No games found.</div>';
      return;
    }

    results.forEach(game => {
      const el = document.createElement('div');
      el.className = 'game-item' + (game.title === currentGameTitle ? ' active' : '');

      el.innerHTML = `
        <div class="game-info">
          <div class="game-title" title="${esc(game.title)}">${esc(game.title)}</div>
          <div class="game-meta">${esc(game.genre)} &middot; ${game.year}</div>
        </div>
        <button class="play-btn">Play</button>
      `;

      const btn = el.querySelector('.play-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        launchGame(game, btn);
      });
      el.addEventListener('click', () => launchGame(game, btn));

      gameListEl.appendChild(el);
    });
  }

  function launchGame(game, btn) {
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Loading...';
    }

    // Stop current if running
    stopEmulator();

    currentGameTitle = game.title;

    // UI updates
    nowPlayingTitle.textContent = game.title;
    nowPlaying.classList.add('active');
    emulatorPlaceholder.style.display = 'none';
    emulatorWrapper.classList.add('active');

    // Mark active in list
    document.querySelectorAll('.game-item').forEach(el => el.classList.remove('active'));
    if (btn) btn.closest('.game-item').classList.add('active');

    // Load EmulatorJS in iframe (avoids "already declared" errors on reload)
    loadEmulatorIframe(game.rom);

    // Reset button
    if (btn) {
      setTimeout(() => {
        btn.textContent = 'Play';
        btn.disabled = false;
      }, 1500);
    }
  }

  /**
   * Load EmulatorJS inside an iframe to get a fresh JS context each time.
   * This avoids the "Identifier 'EJS_STORAGE' has already been declared" error.
   */
  function loadEmulatorIframe(romUrl) {
    const container = document.getElementById('game');
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.id = 'emu-frame';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.style.background = '#000';
    iframe.allow = 'autoplay; gamepad';

    container.appendChild(iframe);

    // Build the iframe HTML content
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body, html { width: 100%; height: 100%; overflow: hidden; background: #000; }
  #game { width: 100%; height: 100%; }
</style>
</head>
<body>
<div id="game"></div>
<script>
  EJS_player = '#game';
  EJS_core = 'nes';
  EJS_gameUrl = '${romUrl}';
  EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
  EJS_color = '#e94560';
  EJS_startOnLoaded = true;
<\/script>
<script src="https://cdn.emulatorjs.org/stable/data/loader.js"><\/script>
</body>
</html>`;

    // Write to iframe
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();

    emulatorActive = true;
  }

  function stopEmulator() {
    if (!emulatorActive) return;

    const container = document.getElementById('game');
    container.innerHTML = '';

    emulatorWrapper.classList.remove('active');
    emulatorPlaceholder.style.display = '';
    nowPlaying.classList.remove('active');
    currentGameTitle = null;
    emulatorActive = false;

    document.querySelectorAll('.game-item').forEach(el => el.classList.remove('active'));
  }

  function esc(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init, stopEmulator };
})();
