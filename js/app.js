/**
 * Main Application - Game Selector & Emulator Controller
 * 
 * Orchestrates the game list, search, pagination, and launches
 * EmulatorJS to play NES ROMs directly in the browser.
 */

const App = (() => {
  // State
  let currentPage = 1;
  let currentQuery = '';
  let totalResults = 0;
  let isLoading = false;
  let currentGameId = null;
  let emulatorLoaded = false;

  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const statusEl = document.getElementById('status');
  const gameListEl = document.getElementById('gameList');
  const paginationEl = document.getElementById('pagination');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageInfoEl = document.getElementById('pageInfo');
  const emulatorWrapper = document.getElementById('emulator-wrapper');
  const emulatorPlaceholder = document.getElementById('emulatorPlaceholder');
  const nowPlaying = document.getElementById('nowPlaying');
  const nowPlayingTitle = document.getElementById('nowPlayingTitle');
  const stopBtn = document.getElementById('stopBtn');

  /**
   * Initialize the application
   */
  function init() {
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
    prevBtn.addEventListener('click', () => changePage(-1));
    nextBtn.addEventListener('click', () => changePage(1));
    stopBtn.addEventListener('click', stopEmulator);

    // Load initial list
    loadGames();
  }

  /**
   * Handle search
   */
  function handleSearch() {
    const query = searchInput.value.trim();
    currentQuery = query;
    currentPage = 1;
    loadGames();
  }

  /**
   * Change page
   */
  function changePage(delta) {
    const newPage = currentPage + delta;
    const totalPages = Math.ceil(totalResults / ArchiveAPI.PAGE_SIZE);
    if (newPage >= 1 && newPage <= totalPages) {
      currentPage = newPage;
      loadGames();
    }
  }

  /**
   * Load games from Archive.org
   */
  async function loadGames() {
    if (isLoading) return;
    isLoading = true;

    showStatus('<div class="loader"></div> Fetching games from Archive.org...');
    gameListEl.innerHTML = '';
    paginationEl.style.display = 'none';

    try {
      const result = await ArchiveAPI.searchROMs({
        query: currentQuery,
        page: currentPage
      });

      totalResults = result.total;

      if (result.items.length === 0) {
        showStatus(currentQuery
          ? `No ROMs found for "${escapeHtml(currentQuery)}".`
          : 'No ROMs found in the collection.');
        return;
      }

      statusEl.style.display = 'none';
      renderGameList(result.items);
      renderPagination();
    } catch (err) {
      showStatus(`Error: ${err.message}`, true);
    } finally {
      isLoading = false;
    }
  }

  /**
   * Render the game list
   */
  function renderGameList(items) {
    gameListEl.innerHTML = '';

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'game-item' + (item.identifier === currentGameId ? ' active' : '');

      const title = escapeHtml(item.title);
      const creator = escapeHtml(item.creator);

      el.innerHTML = `
        <div class="game-info">
          <div class="game-title" title="${title}">${title}</div>
          <div class="game-meta">${creator !== 'Unknown' ? creator : ''}</div>
        </div>
        <button class="play-btn">Play</button>
      `;

      const btn = el.querySelector('.play-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        launchGame(item.identifier, item.title, btn);
      });

      el.addEventListener('click', () => {
        launchGame(item.identifier, item.title, btn);
      });

      gameListEl.appendChild(el);
    });
  }

  /**
   * Launch the emulator with a specific game
   */
  async function launchGame(identifier, title, btn) {
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Loading...';
    }

    try {
      // Get the ROM URL
      const romInfo = await ROMFetcher.fetchROM(identifier);

      // Stop any current emulator instance
      stopEmulator();

      // Set current game
      currentGameId = identifier;

      // Update UI
      nowPlayingTitle.textContent = title;
      nowPlaying.classList.add('active');
      emulatorPlaceholder.style.display = 'none';
      emulatorWrapper.classList.add('active');

      // Mark active in list
      document.querySelectorAll('.game-item').forEach(el => el.classList.remove('active'));
      if (btn) btn.closest('.game-item').classList.add('active');

      // Load EmulatorJS
      loadEmulator(romInfo.url);

    } catch (err) {
      console.error('Failed to launch game:', err);
      alert(`Failed to load game: ${err.message}`);
    } finally {
      if (btn) {
        btn.textContent = 'Play';
        btn.disabled = false;
      }
    }
  }

  /**
   * Load EmulatorJS with the given ROM URL
   */
  function loadEmulator(romUrl) {
    // Clear previous emulator
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '';

    // Remove any previously injected EmulatorJS scripts
    document.querySelectorAll('script[data-emulatorjs]').forEach(s => s.remove());

    // Set EmulatorJS global config
    window.EJS_player = '#game';
    window.EJS_core = 'nes';
    window.EJS_gameUrl = romUrl;
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    window.EJS_color = '#e94560';
    window.EJS_startOnLoaded = true;
    window.EJS_defaultControls = true;

    // Inject the EmulatorJS loader script
    const script = document.createElement('script');
    script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
    script.setAttribute('data-emulatorjs', 'true');
    document.body.appendChild(script);

    emulatorLoaded = true;
  }

  /**
   * Stop the emulator and reset the view
   */
  function stopEmulator() {
    if (!emulatorLoaded) return;

    // Clear emulator container
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '';

    // Remove EmulatorJS scripts
    document.querySelectorAll('script[data-emulatorjs]').forEach(s => s.remove());

    // Clean up EmulatorJS globals
    delete window.EJS_player;
    delete window.EJS_core;
    delete window.EJS_gameUrl;
    delete window.EJS_pathtodata;
    delete window.EJS_color;
    delete window.EJS_startOnLoaded;
    delete window.EJS_defaultControls;
    delete window.EJS_emulator;

    // Reset UI
    emulatorWrapper.classList.remove('active');
    emulatorPlaceholder.style.display = '';
    nowPlaying.classList.remove('active');
    currentGameId = null;
    emulatorLoaded = false;

    // Remove active from game items
    document.querySelectorAll('.game-item').forEach(el => el.classList.remove('active'));
  }

  /**
   * Render pagination
   */
  function renderPagination() {
    const totalPages = Math.ceil(totalResults / ArchiveAPI.PAGE_SIZE);

    if (totalPages <= 1) {
      paginationEl.style.display = 'none';
      return;
    }

    paginationEl.style.display = 'flex';
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
    pageInfoEl.textContent = `${currentPage} / ${totalPages}`;
  }

  /**
   * Show status message
   */
  function showStatus(message, isError = false) {
    statusEl.style.display = 'block';
    statusEl.innerHTML = message;
    statusEl.className = isError ? 'status error' : 'status';
  }

  /**
   * Escape HTML
   */
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init, loadGames, stopEmulator };
})();
