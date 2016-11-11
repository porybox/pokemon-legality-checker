const gameCheck = require('../helpers/gameId.js');

module.exports = {
  description: 'Incorrect hyper training',
  field: 'hyperTraining',
  filter (pkmn) {
    return gameCheck.isFromGen7(pkmn.otGameId);
  },
  test (pkmn) {
    // If Pokemon is perfect (6IV), it cannot be hyper trained at all

    // If IV is perfect (31), it cannot be hyper trained
  }
};
