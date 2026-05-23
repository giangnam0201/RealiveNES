/**
 * ROM Fetcher Module
 * 
 * Handles downloading ROM files from Archive.org and preparing them
 * for use with the NES emulator. Supports .nes, .zip ROM formats.
 */

const ROMFetcher = (() => {
  const NES_EXTENSIONS = ['.nes', '.NES'];
  const ARCHIVE_EXTENSIONS = ['.zip', '.ZIP', '.7z'];

  /**
   * Fetch the ROM file for a given Archive.org item
   * Finds the best .nes file in the item's file list and returns its download URL.
   * 
   * @param {string} identifier - Archive.org item identifier
   * @returns {Promise<{url: string, filename: string, size: number}>}
   */
  async function fetchROM(identifier) {
    const files = await ArchiveAPI.getItemFiles(identifier);

    // First, look for .nes files directly
    let romFile = files.find(f => 
      NES_EXTENSIONS.some(ext => f.name && f.name.endsWith(ext))
    );

    // If no .nes file, look for zip archives that likely contain ROMs
    if (!romFile) {
      romFile = files.find(f =>
        ARCHIVE_EXTENSIONS.some(ext => f.name && f.name.endsWith(ext))
      );
    }

    if (!romFile) {
      throw new Error(`No ROM file found in item: ${identifier}`);
    }

    const url = ArchiveAPI.getDownloadURL(identifier, romFile.name);

    return {
      url,
      filename: romFile.name,
      size: parseInt(romFile.size, 10) || 0
    };
  }

  /**
   * Download a ROM as an ArrayBuffer (for loading into emulator)
   * @param {string} url - Direct download URL
   * @returns {Promise<ArrayBuffer>}
   */
  async function downloadROMBuffer(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Download failed: HTTP ${response.status}`);
    }
    return await response.arrayBuffer();
  }

  /**
   * Trigger a browser download of the ROM file
   * @param {string} url - Direct download URL
   * @param {string} filename - Suggested filename
   */
  function triggerDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /**
   * Format file size for display
   * @param {number} bytes
   * @returns {string}
   */
  function formatSize(bytes) {
    if (!bytes || bytes === 0) return 'Unknown size';
    const units = ['B', 'KB', 'MB', 'GB'];
    let i = 0;
    let size = bytes;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(1)} ${units[i]}`;
  }

  return {
    fetchROM,
    downloadROMBuffer,
    triggerDownload,
    formatSize
  };
})();
