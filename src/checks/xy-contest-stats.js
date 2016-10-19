const gameCheck = require('../helpers/gameId.js');

module.exports = {
  description: 'A Pokémon that has never been traded from XY cannot have contest stats',
  field: 'contest',
  filter (pkmn) {
    return gameCheck.isFromXY(pkmn.otGameId);
  },
  test (pkmn) {
    const hasContestStats = pkmn.contestStatCool | pkmn.contestStatBeauty | pkmn.contestStatCute | pkmn.contestStatSheen
    | pkmn.contestStatSmart | pkmn.contestStatTough;
    return pkmn.notOt || !hasContestStats;
  }
};
