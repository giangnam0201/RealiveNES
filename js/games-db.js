/**
 * NES Games Database - Dynamic loader
 * 
 * Fetches the FULL game list from Archive.org metadata API at runtime.
 * Uses: https://archive.org/metadata/roms_nes/files (CORS-enabled, returns all 1200+ files)
 * ROM URLs: https://archive.org/cors/roms_nes/{filename} (CORS-enabled downloads)
 * 
 * EmulatorJS handles .zip extraction natively.
 */

const GamesDB = (() => {
  const METADATA_URL = 'https://archive.org/metadata/roms_nes/files';
  const ROM_BASE = 'https://archive.org/cors/roms_nes/';

  let allGames = [];
  let genres = [];
  let loaded = false;
  let loadPromise = null;

  /**
   * Fetch full game list from Archive.org metadata API
   */
  function load() {
    if (loadPromise) return loadPromise;

    loadPromise = fetch(METADATA_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const files = data.result || [];
        allGames = [];

        for (const f of files) {
          const name = f.name;
          if (!name.endsWith('.zip')) continue;

          // Filter: only USA/World releases, skip betas/protos/virtual console/aftermarket
          if (!/(USA|World)/.test(name)) continue;
          if (/Beta|Proto|Virtual Console|Aftermarket|Unl\)|e-Reader|Rev \d|GameCube|Pirate|Sample|Competition|Test Program|Wii/.test(name)) continue;

          // Extract clean title from filename
          const title = name
            .replace('.zip', '')
            .replace(/\s*\(.*$/, '') // remove everything after first (
            .trim();

          if (!title) continue;

          // Guess genre from common keywords (basic heuristic)
          const genre = guessGenre(title);

          allGames.push({
            title: title,
            filename: name,
            genre: genre,
            size: parseInt(f.size, 10) || 0,
            rom: ROM_BASE + encodeURIComponent(name)
          });
        }

        // Sort alphabetically
        allGames.sort((a, b) => a.title.localeCompare(b.title));

        // Extract unique genres
        genres = [...new Set(allGames.map(g => g.genre))].sort();

        loaded = true;
        return allGames;
      });

    return loadPromise;
  }

  /**
   * Basic genre guesser based on title keywords
   */
  function guessGenre(title) {
    const t = title.toLowerCase();
    if (/mario|kirby|mega man|duck|adventure island|lode runner|bionic|ice climber|donkey kong|kid icarus|prince of persia/.test(t)) return 'Platformer';
    if (/zelda|final fantasy|dragon warrior|dragon quest|crystalis|faxanadu/.test(t)) return 'RPG';
    if (/contra|castlevania|metroid|ninja gaiden|batman|metal gear|blaster master/.test(t)) return 'Action';
    if (/double dragon|battletoads|river city|tmnt|teenage mutant|kung fu/.test(t)) return 'Beat \'em up';
    if (/tetris|dr\. mario|puzzle|lolo/.test(t)) return 'Puzzle';
    if (/gradius|galaga|1942|1943|life force|star force|shooting|air fortress/.test(t)) return 'Shooter';
    if (/baseball|football|basketball|hockey|bowl|tennis|boxing|wrestling|punch/.test(t)) return 'Sports';
    if (/race|racing|excitebike|pro-am|rad racer/.test(t)) return 'Racing';
    if (/pac-man|balloon|arkanoid|pinball|marble|dig dug|bubble bobble/.test(t)) return 'Arcade';
    return 'Other';
  }

  /**
   * Search/filter games
   */
  function search({ query = '', genre = '' } = {}) {
    let results = allGames;

    if (genre) {
      results = results.filter(g => g.genre === genre);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(g => g.title.toLowerCase().includes(q));
    }

    return results;
  }

  function getAll() { return allGames; }
  function count() { return allGames.length; }
  function isLoaded() { return loaded; }
  function getGenres() { return genres; }

  return { load, search, getAll, count, isLoaded, getGenres, get genres() { return genres; } };
})();
