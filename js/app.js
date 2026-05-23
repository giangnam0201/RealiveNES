/**
 * Main Application - Game Selector UI Controller
 * 
 * Orchestrates the game list display, search, pagination,
 * and ROM download interactions.
 */

const App = (() => {
  // State
  let currentPage = 1;
  let currentQuery = '';
  let totalResults = 0;
  let isLoading = false;

  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const statusEl = document.getElementById('status');
  const gameListEl = document.getElementById('gameList');
  const paginationEl = document.getElementById('pagination');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageInfoEl = document.getElementById('pageInfo');

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

    // Load initial list
    loadGames();
  }

  /**
   * Handle search button click
   */
  function handleSearch() {
    const query = searchInput.value.trim();
    currentQuery = query;
    currentPage = 1;
    loadGames();
  }

  /**
   * Change page
   * @param {number} delta - Page change (+1 or -1)
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
          ? `No ROMs found for "${currentQuery}". Try a different search.`
          : 'No ROMs found in the collection.');
        return;
      }

      // Clear status and render games
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
   * @param {Array} items - Game items from Archive.org
   */
  function renderGameList(items) {
    gameListEl.innerHTML = '';

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'game-card';

      const title = escapeHtml(item.title);
      const creator = escapeHtml(item.creator);
      const size = ROMFetcher.formatSize(item.size);

      card.innerHTML = `
        <h3>${title}</h3>
        <div class="meta">
          ${creator !== 'Unknown' ? `<div>By: ${creator}</div>` : ''}
          <div>Size: ${size}</div>
        </div>
        <button class="download-btn" data-id="${item.identifier}">
          Download ROM
        </button>
      `;

      // Download button handler
      const btn = card.querySelector('.download-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleDownload(item.identifier, btn);
      });

      gameListEl.appendChild(card);
    });
  }

  /**
   * Handle ROM download
   * @param {string} identifier - Archive.org item identifier
   * @param {HTMLElement} btn - The download button element
   */
  async function handleDownload(identifier, btn) {
    btn.disabled = true;
    btn.textContent = 'Fetching...';

    try {
      const romInfo = await ROMFetcher.fetchROM(identifier);
      ROMFetcher.triggerDownload(romInfo.url, romInfo.filename);
      btn.textContent = 'Downloaded!';
      setTimeout(() => {
        btn.textContent = 'Download ROM';
        btn.disabled = false;
      }, 2000);
    } catch (err) {
      btn.textContent = 'Error!';
      console.error('Download error:', err);
      setTimeout(() => {
        btn.textContent = 'Download ROM';
        btn.disabled = false;
      }, 2000);
    }
  }

  /**
   * Render pagination controls
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
    pageInfoEl.textContent = `Page ${currentPage} of ${totalPages} (${totalResults} ROMs)`;
  }

  /**
   * Show status message
   * @param {string} message - HTML message to display
   * @param {boolean} isError - Whether this is an error message
   */
  function showStatus(message, isError = false) {
    statusEl.style.display = 'block';
    statusEl.innerHTML = message;
    statusEl.className = isError ? 'status error' : 'status';
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init, loadGames };
})();
