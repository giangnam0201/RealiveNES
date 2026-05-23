/**
 * ROM Fetcher Module
 * 
 * Discovers ROM files within Archive.org items and provides URLs
 * for both direct download and emulator loading.
 */

const ROMFetcher = (() => {
  const NES_EXTENSIONS = ['.nes', '.NES'];
  const ARCHIVE_EXTENSIONS = ['.zip', '.ZIP', '.7z'];

  /**
   * Fetch the ROM file info for a given Archive.org item.
   * Returns the direct URL that can be used by EmulatorJS or for download.
   * 
   * @param {string} identifier - Archive.org item identifier
   * @returns {Promise<{url: string, filename: string, size: number}>}
   */
  async function fetchROM(identifier) {
    const files = await ArchiveAPI.getItemFiles(identifier);

    // Priority 1: Look for .nes files
    let romFile = files.find(f => 
      NES_EXTENSIONS.some(ext => f.name && f.name.endsWith(ext))
    );

    // Priority 2: Look for zip archives
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
    formatSize
  };
})();
