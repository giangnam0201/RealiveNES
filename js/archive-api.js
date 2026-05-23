/**
 * Archive.org API Module
 * 
 * Fetches NES ROM listings from Archive.org's Advanced Search API
 * using the JSONP utility to bypass CORS restrictions.
 * 
 * Target collection: "nes-roms" on Archive.org
 * API docs: https://archive.org/advancedsearch.php
 */

const ArchiveAPI = (() => {
  const BASE_URL = 'https://archive.org/advancedsearch.php';
  const COLLECTION = 'nes-roms';
  const PAGE_SIZE = 20;

  /**
   * Search for NES ROMs in the Archive.org collection
   * @param {Object} options
   * @param {string} options.query - Search term (empty string for all)
   * @param {number} options.page - Page number (1-indexed)
   * @param {number} options.pageSize - Results per page
   * @returns {Promise<{items: Array, total: number, page: number, pageSize: number}>}
   */
  async function searchROMs({ query = '', page = 1, pageSize = PAGE_SIZE } = {}) {
    // Build the search query
    let searchQuery = `collection:${COLLECTION} AND mediatype:software`;
    if (query.trim()) {
      searchQuery += ` AND (title:"${query}" OR description:"${query}")`;
    }

    const params = new URLSearchParams({
      q: searchQuery,
      fl: 'identifier,title,description,creator,date,item_size',
      sort: 'title asc',
      rows: pageSize.toString(),
      page: page.toString(),
      output: 'json'
    });

    const url = `${BASE_URL}?${params.toString()}`;

    try {
      const data = await fetchJSONP(url);

      const response = data.response || {};
      const docs = response.docs || [];
      const numFound = response.numFound || 0;

      const items = docs.map(doc => ({
        identifier: doc.identifier,
        title: doc.title || doc.identifier,
        description: doc.description || '',
        creator: doc.creator || 'Unknown',
        date: doc.date || '',
        size: doc.item_size || 0
      }));

      return {
        items,
        total: numFound,
        page,
        pageSize
      };
    } catch (err) {
      console.error('Archive.org API error:', err);
      throw new Error(`Failed to fetch ROM list: ${err.message}`);
    }
  }

  /**
   * Get the files list for a specific Archive.org item
   * @param {string} identifier - The Archive.org item identifier
   * @returns {Promise<Array>} List of files in the item
   */
  async function getItemFiles(identifier) {
    const url = `https://archive.org/metadata/${identifier}/files`;

    try {
      const data = await fetchJSONP(url);
      const files = data.result || data || [];
      return Array.isArray(files) ? files : [];
    } catch (err) {
      console.error('Failed to get item files:', err);
      throw new Error(`Failed to get files for ${identifier}: ${err.message}`);
    }
  }

  /**
   * Build a direct download URL for a ROM file
   * @param {string} identifier - Archive.org item identifier
   * @param {string} filename - The filename within the item
   * @returns {string} Direct download URL
   */
  function getDownloadURL(identifier, filename) {
    return `https://archive.org/download/${identifier}/${encodeURIComponent(filename)}`;
  }

  return {
    searchROMs,
    getItemFiles,
    getDownloadURL,
    PAGE_SIZE
  };
})();
