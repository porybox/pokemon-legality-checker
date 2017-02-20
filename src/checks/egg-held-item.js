module.exports = {
  description: 'An egg must not have a held item.',
  filter: {isEgg: true},
  field: 'heldItemId',
  test (pkmn) {
    return pkmn.heldItemId === 0;
  }
};
