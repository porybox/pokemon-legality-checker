const _ = require('lodash');

module.exports = {
  description: 'Pokémon must not be holding a key item.',
  field: 'heldItemId',
  test (pkmn) {
    return ![216].concat(_.range(428, 484), _.range(501, 503),
                        [532, 533, 536, 574, 578, 579, 616, 617],
                        _.range(621, 638), [641, 642, 643, 651, 689],
                        _.range(695, 698), _.range(700, 703),
                        _.range(705, 707), _.range(712, 714),
                        _.range(716, 736), _.range(738, 751),
                        [765, 766], _.range(771, 775), [797],
                        _.range(841, 843),
                        [845, 847, 850, 857, 858, 860]).includes(pkmn.heldItemId);
  }
};
