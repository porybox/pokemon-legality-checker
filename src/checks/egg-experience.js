module.exports = {
  description: 'An egg must have 0 experience points',
  filter: {isEgg: true},
  test (pkmn) {
    return pkmn.exp === 0;
  }
};
