/**
 * NES Games Database
 * 
 * Homebrew NES games hosted on GitHub (retrobrews/nes-games) via jsDelivr CDN.
 * All games are free/open-source homebrew — legal to distribute and play.
 * 
 * CDN: cdn.jsdelivr.net/gh/retrobrews/nes-games@master/{filename}
 * - Fast, reliable, CORS-enabled
 * - No API calls needed
 */

const GamesDB = (() => {
  const CDN = 'https://cdn.jsdelivr.net/gh/retrobrews/nes-games@master/';

  const games = [
    // Action / Platformer
    { title: 'Sir Ababol Remastered', genre: 'Platformer', desc: 'Classic platformer adventure with tight controls', rom: CDN + 'sir-ababol-remastered.nes' },
    { title: 'Nova the Squirrel', genre: 'Platformer', desc: 'Colorful platformer with puzzle elements', rom: CDN + 'novathesquirrel.nes' },
    { title: 'The Owlia', genre: 'Action RPG', desc: 'Zelda-like adventure with exploration', rom: CDN + 'owlia.nes' },
    { title: 'Twin Dragons', genre: 'Platformer', desc: 'Co-op platformer for 1-2 players', rom: CDN + 'twindragons.nes' },
    { title: 'Cheril the Goddess', genre: 'Platformer', desc: 'Action platformer with mythological themes', rom: CDN + 'cheril-the-goddess.nes' },
    { title: 'Mega Mountain', genre: 'Platformer', desc: 'Climb the mega mountain to the top', rom: CDN + 'megamountain.nes' },
    { title: 'Nomolos', genre: 'Platformer', desc: 'Reverse platformer — enemies run from you', rom: CDN + 'nomolos.nes' },
    { title: 'The Mad Wizard', genre: 'Platformer', desc: 'Magical platforming adventure', rom: CDN + 'themadwizard.nes' },
    { title: 'Mad Wizard', genre: 'Platformer', desc: 'Wizard-themed action platformer', rom: CDN + 'madwizard.nes' },
    { title: 'Rise of Amondus', genre: 'Platformer', desc: 'Epic retro platformer quest', rom: CDN + 'riseofamondus.nes' },
    { title: 'Bootee', genre: 'Platformer', desc: 'Simple and fun platforming action', rom: CDN + 'bootee.nes' },
    { title: 'Jet Paco', genre: 'Platformer', desc: 'Jetpack-powered platformer', rom: CDN + 'jetpaco.nes' },
    { title: 'Super Uwol', genre: 'Platformer', desc: 'Arcade-style platformer with fast gameplay', rom: CDN + 'superuwol.nes' },
    { title: 'Obstacle Trek', genre: 'Platformer', desc: 'Navigate through dangerous obstacles', rom: CDN + 'obstacletrek.nes' },
    { title: 'Tiger Jenny', genre: 'Action', desc: 'Beat-em-up style action game', rom: CDN + 'tigerjenny.nes' },
    { title: 'Vigilante Ninja', genre: 'Action', desc: 'Ninja action side-scroller', rom: CDN + 'vigilanteninja.nes' },
    { title: 'Ninja Muncher', genre: 'Action', desc: 'Fast-paced ninja action', rom: CDN + 'ninjamuncher.nes' },
    { title: 'Sgt Helmet', genre: 'Action', desc: 'Military action platformer', rom: CDN + 'sgthelmet.nes' },
    { title: 'Robo Ninja Climb', genre: 'Action', desc: 'Vertical climbing action', rom: CDN + 'roboninjaclimb.nes' },
    { title: 'Super Tilt Bro', genre: 'Fighting', desc: 'Smash Bros-inspired NES fighting game', rom: CDN + 'super-tilt-bro.nes' },
    { title: 'Midnight Jogger', genre: 'Action', desc: 'Nighttime running action', rom: CDN + 'midnightjogger.nes' },
    { title: 'Ralph 4', genre: 'Platformer', desc: 'Classic platformer adventure', rom: CDN + 'ralph4.nes' },

    // Shooter
    { title: 'Blaster', genre: 'Shooter', desc: 'Space shooting action', rom: CDN + 'blaster.nes' },
    { title: 'Brony Blaster', genre: 'Shooter', desc: 'Colorful shoot-em-up', rom: CDN + 'bronyblaster.nes' },
    { title: 'Invaders', genre: 'Shooter', desc: 'Classic space invaders style', rom: CDN + 'invaders.nes' },
    { title: 'Star Evil', genre: 'Shooter', desc: 'Space shooter with boss battles', rom: CDN + 'starevil.nes' },
    { title: 'Spacey McRacey', genre: 'Shooter', desc: 'Space racing shooter', rom: CDN + 'spaceymcracey.nes' },
    { title: 'The Invasion', genre: 'Shooter', desc: 'Defend earth from alien invasion', rom: CDN + 'theinvasion.nes' },
    { title: 'Thwaite', genre: 'Shooter', desc: 'Missile Command-style defense game', rom: CDN + 'thwaite.nes' },

    // Puzzle
    { title: 'Assimilate', genre: 'Puzzle', desc: 'Color-matching puzzle game', rom: CDN + 'assimilate.nes' },
    { title: 'BabelBlox', genre: 'Puzzle', desc: 'Block-stacking puzzle', rom: CDN + 'babelblox.nes' },
    { title: 'Pegs', genre: 'Puzzle', desc: 'Peg solitaire on NES', rom: CDN + 'pegs.nes' },
    { title: 'Memory', genre: 'Puzzle', desc: 'Classic memory card matching', rom: CDN + 'memory.nes' },
    { title: 'Black Box Challenge', genre: 'Puzzle', desc: 'Logic deduction puzzle', rom: CDN + 'blackboxchallenge.nes' },
    { title: 'Bomb Array', genre: 'Puzzle', desc: 'Minesweeper-style puzzle', rom: CDN + 'bombarray.nes' },
    { title: 'The Wit', genre: 'Puzzle', desc: 'Brain-teasing puzzle game', rom: CDN + 'thewit.nes' },
    { title: 'Virus Cleaner', genre: 'Puzzle', desc: 'Dr. Mario-inspired puzzle', rom: CDN + 'viruscleaner.nes' },
    { title: 'Cl1k', genre: 'Puzzle', desc: 'Minimalist clicker puzzle', rom: CDN + 'cl1k.nes' },

    // Arcade / Casual
    { title: 'Flappy Bird', genre: 'Arcade', desc: 'The classic mobile game on NES', rom: CDN + 'flappybird.nes' },
    { title: 'Flappy Block', genre: 'Arcade', desc: 'Block-style Flappy variant', rom: CDN + 'flappyblock.nes' },
    { title: 'Flappy Jack', genre: 'Arcade', desc: 'Another Flappy-style game', rom: CDN + 'flappyjack.nes' },
    { title: 'Falling', genre: 'Arcade', desc: 'Dodge falling objects', rom: CDN + 'falling.nes' },
    { title: 'Debris Dodger', genre: 'Arcade', desc: 'Avoid space debris', rom: CDN + 'debrisdodger.nes' },
    { title: 'Mashy Mashy', genre: 'Arcade', desc: 'Button-mashing arcade fun', rom: CDN + 'mashymashy.nes' },
    { title: 'Miedow', genre: 'Arcade', desc: 'Retro arcade action', rom: CDN + 'miedow.nes' },
    { title: 'Lunar Limit', genre: 'Arcade', desc: 'Moon lander-style arcade', rom: CDN + 'lunarlimit.nes' },
    { title: 'Super Pak Pak', genre: 'Arcade', desc: 'Pac-Man inspired arcade', rom: CDN + 'superpakpak.nes' },
    { title: 'Snail Maze', genre: 'Arcade', desc: 'Navigate mazes as a snail', rom: CDN + 'snailmaze.nes' },
    { title: 'Mouser 2', genre: 'Arcade', desc: 'Cat and mouse arcade game', rom: CDN + 'mouser2.nes' },
    { title: 'That\'s Whack', genre: 'Arcade', desc: 'Whack-a-mole style game', rom: CDN + 'thatswhack.nes' },
    { title: 'Indivisible on NES', genre: 'Arcade', desc: 'NES demake of Indivisible', rom: CDN + 'indivisibleonnes.nes' },

    // Strategy / Other
    { title: 'RHDE', genre: 'Strategy', desc: 'Real-time strategy for NES', rom: CDN + 'rhde.nes' },
    { title: 'Mineshaft', genre: 'Adventure', desc: 'Mining adventure game', rom: CDN + 'mineshaft.nes' },
    { title: 'Robot Finds Kitten', genre: 'Adventure', desc: 'Zen exploration game', rom: CDN + 'robotfindskitten.nes' },
    { title: 'Filthy Kitchen', genre: 'Adventure', desc: 'Kitchen-themed adventure', rom: CDN + 'filthykitchen.nes' },
    { title: 'Driar', genre: 'Adventure', desc: 'Atmospheric adventure', rom: CDN + 'driar.nes' },
    { title: 'NESert Bus', genre: 'Simulation', desc: 'Desert Bus for NES — the ultimate endurance test', rom: CDN + 'nesertbus.nes' },
    { title: 'Lala', genre: 'Adventure', desc: 'Cute adventure game', rom: CDN + 'lala.nes' },

    // Sports / Multiplayer
    { title: 'Pong 1K', genre: 'Sports', desc: 'Classic Pong in 1KB', rom: CDN + 'pong1k.nes' },
    { title: 'Pong 1K 2P', genre: 'Sports', desc: 'Two-player Pong', rom: CDN + 'pong1k2p.nes' },
    { title: 'Roulette', genre: 'Casino', desc: 'NES roulette game', rom: CDN + 'roulette.nes' },
    { title: 'Rock Paper Scissors', genre: 'Arcade', desc: 'RPS with lizard and spock', rom: CDN + 'rpsls.nes' },
    { title: 'Tic Tac XO', genre: 'Puzzle', desc: 'Tic Tac Toe on NES', rom: CDN + 'tictacxo.nes' },
    { title: 'Tic Tac Two P', genre: 'Puzzle', desc: 'Two-player Tic Tac Toe', rom: CDN + 'tictactwop.nes' },
    { title: 'Simone Says', genre: 'Arcade', desc: 'Simon Says memory game', rom: CDN + 'simonesays.nes' },

    // Multi-game
    { title: '31-in-1 Real Game', genre: 'Compilation', desc: '31 games in one cart', rom: CDN + '31in1realgame-multicart.nes' },
    { title: '3-in-1 2P Pak', genre: 'Compilation', desc: '3 multiplayer games', rom: CDN + '3in12ppak.nes' },

    // More
    { title: 'M Guard', genre: 'Action', desc: 'Guard defense action game', rom: CDN + 'mguard.nes' },
    { title: 'M Guard 2', genre: 'Action', desc: 'Sequel to M Guard', rom: CDN + 'mguard2.nes' },
    { title: 'FFF', genre: 'Action', desc: 'Fast and furious fighter', rom: CDN + 'fff.nes' },
    { title: 'DABG', genre: 'Action', desc: 'Action arcade game', rom: CDN + 'dabg.nes' },
    { title: 'GSM', genre: 'Arcade', desc: 'Retro arcade game', rom: CDN + 'gsm.nes' },
    { title: 'KYFF', genre: 'Action', desc: 'Kick Your Friends off the Floor', rom: CDN + 'kyff.nes' },
    { title: 'For Points', genre: 'Arcade', desc: 'Score attack game', rom: CDN + 'forpoints.nes' },
    { title: 'No Points', genre: 'Arcade', desc: 'Anti-score game', rom: CDN + 'nopoints.nes' },
    { title: 'Light Shields', genre: 'Action', desc: 'Light-based defense game', rom: CDN + 'lightshields.nes' },
    { title: 'CRoom', genre: 'Puzzle', desc: 'Room escape puzzle', rom: CDN + 'croom.nes' },
    { title: 'Wo Xiang Niao Niao', genre: 'Arcade', desc: 'Chinese-themed arcade', rom: CDN + 'wo-xiang-niao-niao.nes' },
    { title: 'Yun', genre: 'Arcade', desc: 'Simple arcade game', rom: CDN + 'yun.nes' },
    { title: 'NintenCat: The Parody', genre: 'Arcade', desc: 'Cat-themed parody game', rom: CDN + 'nintencattheparody.nes' },
    { title: 'The One with the Walls', genre: 'Puzzle', desc: 'Navigate through walls', rom: CDN + 'theonewiththewalls.nes' },
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
      results = results.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.desc.toLowerCase().includes(q)
      );
    }

    return results;
  }

  function getAll() { return games; }
  function count() { return games.length; }

  return { search, getAll, count, genres };
})();
