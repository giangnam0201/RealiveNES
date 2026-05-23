/**
 * RealiveNES - Main Application
 * 
 * Game selector UI + EmulatorJS integration.
 * Uses built-in GamesDB catalog (no API calls needed).
 */

const App = (() => {
  // State
  let currentQuery = '';
  let currentGenre = '';
  let currentGameTitle = null;
  let emulatorLoaded = false;

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
          <div class="game-meta">${esc(game.genre)} &mdash; ${esc(game.desc)}</div>
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

    // Load EmulatorJS
    loadEmulator(game.rom);

    // Reset button
    if (btn) {
      setTimeout(() => {
        btn.textContent = 'Play';
        btn.disabled = false;
      }, 1000);
    }
  }

  function loadEmulator(romUrl) {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '';

    // Remove old scripts
    document.querySelectorAll('script[data-ejs]').forEach(s => s.remove());

    // EmulatorJS config
    window.EJS_player = '#game';
    window.EJS_core = 'nes';
    window.EJS_gameUrl = romUrl;
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    window.EJS_color = '#e94560';
    window.EJS_startOnLoaded = true;

    // Load EmulatorJS
    const script = document.createElement('script');
    script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
    script.setAttribute('data-ejs', 'true');
    document.body.appendChild(script);

    emulatorLoaded = true;
  }

  function stopEmulator() {
    if (!emulatorLoaded) return;

    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '';

    document.querySelectorAll('script[data-ejs]').forEach(s => s.remove());

    // Cleanup globals
    const ejsKeys = Object.keys(window).filter(k => k.startsWith('EJS_'));
    ejsKeys.forEach(k => delete window[k]);

    emulatorWrapper.classList.remove('active');
    emulatorPlaceholder.style.display = '';
    nowPlaying.classList.remove('active');
    currentGameTitle = null;
    emulatorLoaded = false;

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
