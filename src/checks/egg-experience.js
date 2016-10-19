module.exports = {
  description: 'An egg must have 0 experience points',
  filter: {isEgg: true},
  field: 'exp',
  test (pkmn) {
    return pkmn.exp === 0;
  }
};
