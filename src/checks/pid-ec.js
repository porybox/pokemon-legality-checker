const gameCheck = require('../helpers/gameId.js');

module.exports = {
  description: 'A Pokémon transferred from pre-gen 6 must have a matching PID and EC',
  field: 'pid',
  filter (pkmn) {
    return gameCheck.originGen(pkmn.otGameId) < 6;
  },
  test (pkmn) {
    return pkmn.encryptionConstant === pkmn.pid;
  }
};
