/**
 * NES Games Database
 * 
 * Curated catalog of classic NES games from Archive.org (roms_nes collection).
 * Uses the CORS-enabled endpoint: https://archive.org/cors/{id}/{file}
 * 
 * EmulatorJS handles .zip extraction natively — no client-side unzipping needed.
 */

const GamesDB = (() => {
  const BASE = 'https://archive.org/cors/roms_nes/';

  function rom(filename) {
    return BASE + encodeURIComponent(filename);
  }

  const games = [
    // === PLATFORMERS ===
    { title: 'Super Mario Bros. 2', genre: 'Platformer', year: 1988, rom: rom('Super Mario Bros. 2 (USA).zip') },
    { title: 'Super Mario Bros. 3', genre: 'Platformer', year: 1990, rom: rom('Super Mario Bros. 3 (USA).zip') },
    { title: 'Kirby\'s Adventure', genre: 'Platformer', year: 1993, rom: rom('Kirby\'s Adventure (USA).zip') },
    { title: 'DuckTales', genre: 'Platformer', year: 1989, rom: rom('DuckTales (USA).zip') },
    { title: 'DuckTales 2', genre: 'Platformer', year: 1993, rom: rom('DuckTales 2 (USA).zip') },
    { title: 'Chip \'n Dale - Rescue Rangers', genre: 'Platformer', year: 1990, rom: rom('Chip \'n Dale - Rescue Rangers (USA).zip') },
    { title: 'Chip \'n Dale - Rescue Rangers 2', genre: 'Platformer', year: 1994, rom: rom('Chip \'n Dale - Rescue Rangers 2 (USA).zip') },
    { title: 'Mega Man', genre: 'Platformer', year: 1987, rom: rom('Mega Man (USA).zip') },
    { title: 'Mega Man 2', genre: 'Platformer', year: 1989, rom: rom('Mega Man 2 (USA).zip') },
    { title: 'Mega Man 3', genre: 'Platformer', year: 1990, rom: rom('Mega Man 3 (USA).zip') },
    { title: 'Mega Man 4', genre: 'Platformer', year: 1992, rom: rom('Mega Man 4 (USA).zip') },
    { title: 'Mega Man 5', genre: 'Platformer', year: 1992, rom: rom('Mega Man 5 (USA).zip') },
    { title: 'Mega Man 6', genre: 'Platformer', year: 1994, rom: rom('Mega Man 6 (USA).zip') },
    { title: 'Adventure Island', genre: 'Platformer', year: 1988, rom: rom('Adventure Island (USA).zip') },
    { title: 'Adventure Island II', genre: 'Platformer', year: 1991, rom: rom('Adventure Island II (USA).zip') },
    { title: 'Adventure Island 3', genre: 'Platformer', year: 1992, rom: rom('Adventure Island 3 (USA).zip') },
    { title: 'Bubble Bobble', genre: 'Platformer', year: 1988, rom: rom('Bubble Bobble (USA).zip') },
    { title: 'Ghosts\'n Goblins', genre: 'Platformer', year: 1986, rom: rom('Ghosts\'n Goblins (USA).zip') },
    { title: 'Kid Icarus', genre: 'Platformer', year: 1987, rom: rom('Kid Icarus (USA, Europe).zip') },
    { title: 'Prince of Persia', genre: 'Platformer', year: 1992, rom: rom('Prince of Persia (USA).zip') },
    { title: 'Lode Runner', genre: 'Platformer', year: 1984, rom: rom('Lode Runner (USA).zip') },
    { title: 'Donkey Kong Classics', genre: 'Platformer', year: 1988, rom: rom('Donkey Kong Classics (USA, Europe).zip') },
    { title: 'Ice Climber', genre: 'Platformer', year: 1985, rom: rom('Ice Climber (USA, Europe, Korea) (En).zip') },
    { title: 'Elevator Action', genre: 'Platformer', year: 1987, rom: rom('Elevator Action (USA).zip') },
    { title: 'Bionic Commando', genre: 'Platformer', year: 1988, rom: rom('Bionic Commando (USA).zip') },
    { title: 'Faxanadu', genre: 'Platformer', year: 1989, rom: rom('Faxanadu (USA).zip') },

    // === ACTION ===
    { title: 'Contra', genre: 'Action', year: 1988, rom: rom('Contra (USA).zip') },
    { title: 'Super C', genre: 'Action', year: 1990, rom: rom('Super C (USA).zip') },
    { title: 'Contra Force', genre: 'Action', year: 1992, rom: rom('Contra Force (USA).zip') },
    { title: 'Castlevania', genre: 'Action', year: 1987, rom: rom('Castlevania (USA).zip') },
    { title: 'Castlevania II - Simon\'s Quest', genre: 'Action', year: 1988, rom: rom('Castlevania II - Simon\'s Quest (USA).zip') },
    { title: 'Castlevania III - Dracula\'s Curse', genre: 'Action', year: 1990, rom: rom('Castlevania III - Dracula\'s Curse (USA).zip') },
    { title: 'Metroid', genre: 'Action', year: 1987, rom: rom('Metroid (USA).zip') },
    { title: 'Ninja Gaiden', genre: 'Action', year: 1989, rom: rom('Ninja Gaiden (USA).zip') },
    { title: 'Ninja Gaiden II - The Dark Sword of Chaos', genre: 'Action', year: 1990, rom: rom('Ninja Gaiden II - The Dark Sword of Chaos (USA).zip') },
    { title: 'Ninja Gaiden III - The Ancient Ship of Doom', genre: 'Action', year: 1991, rom: rom('Ninja Gaiden III - The Ancient Ship of Doom (USA).zip') },
    { title: 'Batman - The Video Game', genre: 'Action', year: 1990, rom: rom('Batman - The Video Game (USA).zip') },
    { title: 'Batman - Return of the Joker', genre: 'Action', year: 1991, rom: rom('Batman - Return of the Joker (USA).zip') },
    { title: 'Batman Returns', genre: 'Action', year: 1993, rom: rom('Batman Returns (USA).zip') },
    { title: 'Blaster Master', genre: 'Action', year: 1988, rom: rom('Blaster Master (USA).zip') },
    { title: 'Metal Gear', genre: 'Action', year: 1988, rom: rom('Metal Gear (USA).zip') },
    { title: 'Jackal', genre: 'Action', year: 1988, rom: rom('Jackal (USA).zip') },
    { title: 'Gun.Smoke', genre: 'Action', year: 1988, rom: rom('Gun.Smoke (USA).zip') },
    { title: 'Spy Hunter', genre: 'Action', year: 1987, rom: rom('Spy Hunter (USA).zip') },
    { title: 'Abadox - The Deadly Inner War', genre: 'Action', year: 1990, rom: rom('Abadox - The Deadly Inner War (USA).zip') },
    { title: 'Crystalis', genre: 'Action', year: 1990, rom: rom('Crystalis (USA).zip') },
    { title: 'Bomberman', genre: 'Action', year: 1989, rom: rom('Bomberman (USA).zip') },
    { title: 'Bomberman II', genre: 'Action', year: 1993, rom: rom('Bomberman II (USA).zip') },

    // === BEAT EM UP ===
    { title: 'Double Dragon', genre: 'Beat \'em up', year: 1988, rom: rom('Double Dragon (USA).zip') },
    { title: 'Double Dragon II - The Revenge', genre: 'Beat \'em up', year: 1990, rom: rom('Double Dragon II - The Revenge (USA).zip') },
    { title: 'Double Dragon III - The Sacred Stones', genre: 'Beat \'em up', year: 1991, rom: rom('Double Dragon III - The Sacred Stones (USA).zip') },
    { title: 'Battletoads', genre: 'Beat \'em up', year: 1991, rom: rom('Battletoads (USA).zip') },
    { title: 'Battletoads & Double Dragon', genre: 'Beat \'em up', year: 1993, rom: rom('Battletoads-Double Dragon (USA).zip') },
    { title: 'River City Ransom', genre: 'Beat \'em up', year: 1990, rom: rom('River City Ransom (USA).zip') },
    { title: 'Teenage Mutant Ninja Turtles', genre: 'Beat \'em up', year: 1989, rom: rom('Teenage Mutant Ninja Turtles (USA).zip') },
    { title: 'TMNT II - The Arcade Game', genre: 'Beat \'em up', year: 1990, rom: rom('Teenage Mutant Ninja Turtles II - The Arcade Game (USA).zip') },
    { title: 'TMNT III - The Manhattan Project', genre: 'Beat \'em up', year: 1992, rom: rom('Teenage Mutant Ninja Turtles III - The Manhattan Project (USA).zip') },
    { title: 'Jackie Chan\'s Action Kung Fu', genre: 'Beat \'em up', year: 1990, rom: rom('Jackie Chan\'s Action Kung Fu (USA).zip') },

    // === RPG ===
    { title: 'Legend of Zelda, The', genre: 'RPG', year: 1987, rom: rom('Legend of Zelda, The (USA).zip') },
    { title: 'Zelda II - The Adventure of Link', genre: 'RPG', year: 1988, rom: rom('Zelda II - The Adventure of Link (USA).zip') },
    { title: 'Final Fantasy', genre: 'RPG', year: 1990, rom: rom('Final Fantasy (USA).zip') },
    { title: 'Dragon Warrior', genre: 'RPG', year: 1989, rom: rom('Dragon Warrior (USA).zip') },
    { title: 'Dragon Warrior II', genre: 'RPG', year: 1990, rom: rom('Dragon Warrior II (USA).zip') },
    { title: 'Dragon Warrior III', genre: 'RPG', year: 1992, rom: rom('Dragon Warrior III (USA).zip') },
    { title: 'Dragon Warrior IV', genre: 'RPG', year: 1992, rom: rom('Dragon Warrior IV (USA).zip') },

    // === SHOOTER ===
    { title: '1943 - The Battle of Midway', genre: 'Shooter', year: 1988, rom: rom('1943 - The Battle of Midway (USA).zip') },
    { title: 'Galaga - Demons of Death', genre: 'Shooter', year: 1988, rom: rom('Galaga - Demons of Death (USA).zip') },
    { title: 'Gradius', genre: 'Shooter', year: 1986, rom: rom('Gradius (USA).zip') },
    { title: 'Life Force', genre: 'Shooter', year: 1988, rom: rom('Life Force (USA).zip') },
    { title: 'Air Fortress', genre: 'Shooter', year: 1989, rom: rom('Air Fortress (USA).zip') },

    // === PUZZLE ===
    { title: 'Tetris', genre: 'Puzzle', year: 1989, rom: rom('Tetris (USA).zip') },
    { title: 'Tetris 2', genre: 'Puzzle', year: 1993, rom: rom('Tetris 2 (USA).zip') },
    { title: 'Dr. Mario', genre: 'Puzzle', year: 1990, rom: rom('Dr. Mario (Japan, USA) (En).zip') },
    { title: 'Solomon\'s Key', genre: 'Puzzle', year: 1987, rom: rom('Solomon\'s Key (USA).zip') },

    // === ARCADE ===
    { title: 'Pac-Man', genre: 'Arcade', year: 1984, rom: rom('Pac-Man (USA) (Namco).zip') },
    { title: 'Ms. Pac-Man', genre: 'Arcade', year: 1990, rom: rom('Ms. Pac-Man (USA) (Namco).zip') },
    { title: 'Balloon Fight', genre: 'Arcade', year: 1986, rom: rom('Balloon Fight (USA).zip') },
    { title: 'Arkanoid', genre: 'Arcade', year: 1987, rom: rom('Arkanoid (USA).zip') },
    { title: 'Marble Madness', genre: 'Arcade', year: 1989, rom: rom('Marble Madness (USA).zip') },
    { title: 'Dig Dug II', genre: 'Arcade', year: 1986, rom: rom('Dig Dug II - Trouble in Paradise (USA).zip') },

    // === SPORTS / RACING ===
    { title: 'Tecmo Bowl', genre: 'Sports', year: 1989, rom: rom('Tecmo Bowl (USA).zip') },
    { title: 'Tecmo Super Bowl', genre: 'Sports', year: 1991, rom: rom('Tecmo Super Bowl (USA).zip') },
    { title: 'Punch-Out!!', genre: 'Sports', year: 1990, rom: rom('Punch-Out!! (USA).zip') },
    { title: 'Excitebike', genre: 'Racing', year: 1985, rom: rom('Excitebike (Japan, USA) (En).zip') },
    { title: 'R.C. Pro-Am', genre: 'Racing', year: 1988, rom: rom('R.C. Pro-Am (USA).zip') },
    { title: 'R.C. Pro-Am II', genre: 'Racing', year: 1992, rom: rom('R.C. Pro-Am II (USA).zip') },
    { title: 'Paperboy', genre: 'Arcade', year: 1988, rom: rom('Paperboy (USA).zip') },
  ];

  // All unique genres
  const genres = [...new Set(games.map(g => g.genre))].sort();

  /**
   * Search/filter games
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

  function getAll() { return games; }
  function count() { return games.length; }

  return { search, getAll, count, genres };
})();
