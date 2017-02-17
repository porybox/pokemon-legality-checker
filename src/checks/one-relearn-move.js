const gameCheck = require('../helpers/gameId.js');

module.exports = {
  description: 'Pokemon hatched in gen 6-7 must have a relearn move while Pokemon transferred from older gens should not.',
  field: 'eggMove1Id',
  filter (pkmn) {
    return pkmn.eggLocationId !== 0 || gameCheck.originGen(pkmn.otGameId) < 6;
  },
  test (pkmn) {
    if (gameCheck.originGen(pkmn.otGameId) < 6) {
      return pkmn.eggMove1Id === 0;
    }
    return pkmn.eggMove1Id > 0;
  }
};
