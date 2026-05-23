/**
 * NES Games Database
 * 
 * Curated catalog of popular NES games with direct Archive.org download URLs.
 * No API calls needed — games load instantly from this built-in list.
 * 
 * Source: archive.org/details/nintendo-entertainment-system-nes-roms-europeusa
 * URL format: https://archive.org/download/nintendo-entertainment-system-nes-roms-europeusa/{path}
 */

const GamesDB = (() => {
  const BASE = 'https://archive.org/download/nintendo-entertainment-system-nes-roms-europeusa/1%20All%20Games%20-%20A-Z/';

  function url(folder, file) {
    return BASE + 'All%20Games%20-%20' + folder + '/' + encodeURIComponent(file);
  }

  const games = [
    // A
    { title: '1942', genre: 'Shooter', year: 1985, rom: url('A', '1942 (Japan, USA).nes') },
    { title: '1943 - The Battle of Midway', genre: 'Shooter', year: 1988, rom: url('A', '1943 - The Battle of Midway (USA).nes') },
    { title: 'Abadox - The Deadly Inner War', genre: 'Shooter', year: 1990, rom: url('A', 'Abadox - The Deadly Inner War (USA).nes') },
    { title: 'Adventure Island', genre: 'Platformer', year: 1988, rom: url('A', 'Adventure Island (USA).nes') },
    { title: 'Adventure Island II', genre: 'Platformer', year: 1991, rom: url('A', 'Adventure Island II (USA).nes') },
    { title: 'Adventures in the Magic Kingdom', genre: 'Platformer', year: 1990, rom: url('A', 'Adventures in the Magic Kingdom (USA).nes') },
    { title: 'Adventures of Lolo', genre: 'Puzzle', year: 1989, rom: url('A', 'Adventures of Lolo (USA).nes') },
    { title: 'Air Fortress', genre: 'Shooter', year: 1989, rom: url('A', 'Air Fortress (USA).nes') },
    // B
    { title: 'Balloon Fight', genre: 'Arcade', year: 1986, rom: url('B', 'Balloon Fight (USA).nes') },
    { title: 'Baseball Stars', genre: 'Sports', year: 1989, rom: url('B', 'Baseball Stars (USA).nes') },
    { title: 'Batman', genre: 'Action', year: 1990, rom: url('B', 'Batman (USA).nes') },
    { title: 'Batman - Return of the Joker', genre: 'Action', year: 1991, rom: url('B', 'Batman - Return of the Joker (USA).nes') },
    { title: 'Battle City', genre: 'Shooter', year: 1985, rom: url('B', 'Battle City (Japan).nes') },
    { title: 'Battletoads', genre: 'Beat \'em up', year: 1991, rom: url('B', 'Battletoads (USA).nes') },
    { title: 'Blaster Master', genre: 'Action', year: 1988, rom: url('B', 'Blaster Master (USA).nes') },
    { title: 'Bubble Bobble', genre: 'Platformer', year: 1988, rom: url('B', 'Bubble Bobble (USA).nes') },
    // C
    { title: 'Castlevania', genre: 'Action', year: 1987, rom: url('C', 'Castlevania (USA).nes') },
    { title: 'Castlevania II - Simon\'s Quest', genre: 'Action', year: 1988, rom: url('C', 'Castlevania II - Simon\'s Quest (USA).nes') },
    { title: 'Castlevania III - Dracula\'s Curse', genre: 'Action', year: 1990, rom: url('C', 'Castlevania III - Dracula\'s Curse (USA).nes') },
    { title: 'Chip \'n Dale - Rescue Rangers', genre: 'Platformer', year: 1990, rom: url('C', 'Chip \'n Dale - Rescue Rangers (USA).nes') },
    { title: 'Contra', genre: 'Action', year: 1988, rom: url('C', 'Contra (USA).nes') },
    { title: 'Crystalis', genre: 'RPG', year: 1990, rom: url('C', 'Crystalis (USA).nes') },
    // D
    { title: 'DuckTales', genre: 'Platformer', year: 1989, rom: url('D', 'DuckTales (USA).nes') },
    { title: 'DuckTales 2', genre: 'Platformer', year: 1993, rom: url('D', 'DuckTales 2 (USA).nes') },
    { title: 'Double Dragon', genre: 'Beat \'em up', year: 1988, rom: url('D', 'Double Dragon (USA).nes') },
    { title: 'Double Dragon II - The Revenge', genre: 'Beat \'em up', year: 1990, rom: url('D', 'Double Dragon II - The Revenge (USA).nes') },
    { title: 'Double Dragon III - The Sacred Stones', genre: 'Beat \'em up', year: 1991, rom: url('D', 'Double Dragon III - The Sacred Stones (USA).nes') },
    { title: 'Dr. Mario', genre: 'Puzzle', year: 1990, rom: url('D', 'Dr. Mario (World).nes') },
    { title: 'Dragon Warrior', genre: 'RPG', year: 1989, rom: url('D', 'Dragon Warrior (USA).nes') },
    // E
    { title: 'Excitebike', genre: 'Racing', year: 1985, rom: url('E', 'Excitebike (USA).nes') },
    // F
    { title: 'Final Fantasy', genre: 'RPG', year: 1990, rom: url('F', 'Final Fantasy (USA).nes') },
    { title: 'Fire Emblem Gaiden', genre: 'Strategy', year: 1992, rom: url('F', 'Fire Emblem Gaiden (Japan).nes') },
    { title: 'Fester\'s Quest', genre: 'Action', year: 1989, rom: url('F', 'Fester\'s Quest (USA).nes') },
    // G
    { title: 'Galaga', genre: 'Shooter', year: 1988, rom: url('G', 'Galaga - Demons of Death (USA).nes') },
    { title: 'Ghostbusters', genre: 'Action', year: 1988, rom: url('G', 'Ghostbusters (USA).nes') },
    { title: 'Ghosts \'n Goblins', genre: 'Platformer', year: 1986, rom: url('G', 'Ghosts\'n Goblins (USA).nes') },
    { title: 'Gradius', genre: 'Shooter', year: 1986, rom: url('G', 'Gradius (USA).nes') },
    // I
    { title: 'Ice Climber', genre: 'Platformer', year: 1985, rom: url('I', 'Ice Climber (USA, Europe).nes') },
    // K
    { title: 'Kid Icarus', genre: 'Platformer', year: 1987, rom: url('K', 'Kid Icarus (USA, Europe).nes') },
    { title: 'Kirby\'s Adventure', genre: 'Platformer', year: 1993, rom: url('K', 'Kirby\'s Adventure (USA).nes') },
    { title: 'Kung Fu', genre: 'Beat \'em up', year: 1985, rom: url('K', 'Kung Fu (USA).nes') },
    // L
    { title: 'Legend of Zelda, The', genre: 'Action RPG', year: 1987, rom: url('L', 'Legend of Zelda, The (USA).nes') },
    { title: 'Life Force', genre: 'Shooter', year: 1988, rom: url('L', 'Life Force (USA).nes') },
    // M
    { title: 'Mega Man', genre: 'Platformer', year: 1987, rom: url('M', 'Mega Man (USA).nes') },
    { title: 'Mega Man 2', genre: 'Platformer', year: 1989, rom: url('M', 'Mega Man 2 (USA).nes') },
    { title: 'Mega Man 3', genre: 'Platformer', year: 1990, rom: url('M', 'Mega Man 3 (USA).nes') },
    { title: 'Mega Man 4', genre: 'Platformer', year: 1992, rom: url('M', 'Mega Man 4 (USA).nes') },
    { title: 'Mega Man 5', genre: 'Platformer', year: 1992, rom: url('M', 'Mega Man 5 (USA).nes') },
    { title: 'Mega Man 6', genre: 'Platformer', year: 1994, rom: url('M', 'Mega Man 6 (USA).nes') },
    { title: 'Metal Gear', genre: 'Action', year: 1988, rom: url('M', 'Metal Gear (USA).nes') },
    { title: 'Metroid', genre: 'Action', year: 1987, rom: url('M', 'Metroid (USA).nes') },
    { title: 'Mike Tyson\'s Punch-Out!!', genre: 'Sports', year: 1987, rom: url('M', 'Mike Tyson\'s Punch-Out!! (USA).nes') },
    // N
    { title: 'Ninja Gaiden', genre: 'Action', year: 1989, rom: url('N', 'Ninja Gaiden (USA).nes') },
    { title: 'Ninja Gaiden II - The Dark Sword of Chaos', genre: 'Action', year: 1990, rom: url('N', 'Ninja Gaiden II - The Dark Sword of Chaos (USA).nes') },
    { title: 'Ninja Gaiden III - The Ancient Ship of Doom', genre: 'Action', year: 1991, rom: url('N', 'Ninja Gaiden III - The Ancient Ship of Doom (USA).nes') },
    // P
    { title: 'Pac-Man', genre: 'Arcade', year: 1984, rom: url('P', 'Pac-Man (USA) (Namco).nes') },
    { title: 'Paperboy', genre: 'Arcade', year: 1988, rom: url('P', 'Paperboy (USA).nes') },
    { title: 'Prince of Persia', genre: 'Platformer', year: 1992, rom: url('P', 'Prince of Persia (USA).nes') },
    // R
    { title: 'R.C. Pro-Am', genre: 'Racing', year: 1988, rom: url('R', 'R.C. Pro-Am (USA).nes') },
    { title: 'River City Ransom', genre: 'Beat \'em up', year: 1990, rom: url('R', 'River City Ransom (USA).nes') },
    // S
    { title: 'Super Mario Bros.', genre: 'Platformer', year: 1985, rom: url('S', 'Super Mario Bros. (World).nes') },
    { title: 'Super Mario Bros. 2', genre: 'Platformer', year: 1988, rom: url('S', 'Super Mario Bros. 2 (USA).nes') },
    { title: 'Super Mario Bros. 3', genre: 'Platformer', year: 1990, rom: url('S', 'Super Mario Bros. 3 (USA).nes') },
    { title: 'Super C', genre: 'Action', year: 1990, rom: url('S', 'Super C (USA).nes') },
    { title: 'Star Tropics', genre: 'Action RPG', year: 1990, rom: url('S', 'StarTropics (USA).nes') },
    // T
    { title: 'Tecmo Bowl', genre: 'Sports', year: 1989, rom: url('T', 'Tecmo Bowl (USA).nes') },
    { title: 'Tecmo Super Bowl', genre: 'Sports', year: 1991, rom: url('T', 'Tecmo Super Bowl (USA).nes') },
    { title: 'Teenage Mutant Ninja Turtles', genre: 'Action', year: 1989, rom: url('T', 'Teenage Mutant Ninja Turtles (USA).nes') },
    { title: 'Teenage Mutant Ninja Turtles II - The Arcade Game', genre: 'Beat \'em up', year: 1990, rom: url('T', 'Teenage Mutant Ninja Turtles II - The Arcade Game (USA).nes') },
    { title: 'Teenage Mutant Ninja Turtles III - The Manhattan Project', genre: 'Beat \'em up', year: 1992, rom: url('T', 'Teenage Mutant Ninja Turtles III - The Manhattan Project (USA).nes') },
    { title: 'Tetris', genre: 'Puzzle', year: 1989, rom: url('T', 'Tetris (USA).nes') },
    // Z
    { title: 'Zelda II - The Adventure of Link', genre: 'Action RPG', year: 1988, rom: url('Z', 'Zelda II - The Adventure of Link (USA).nes') },
  ];

  // All unique genres for filtering
  const genres = [...new Set(games.map(g => g.genre))].sort();

  /**
   * Search/filter games
   * @param {Object} opts
   * @param {string} opts.query - Text search
   * @param {string} opts.genre - Genre filter (empty = all)
   * @returns {Array}
   */
  function search({ query = '', genre = '' } = {}) {
    let results = games;

    if (genre) {
      results = results.filter(g => g.genre === genre);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(g => g.title.toLowerCase().includes(q));
    }

    return results;
  }

  /**
   * Get all games
   */
  function getAll() {
    return games;
  }

  /**
   * Get total count
   */
  function count() {
    return games.length;
  }

  return {
    search,
    getAll,
    count,
    genres
  };
})();
