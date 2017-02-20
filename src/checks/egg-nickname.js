module.exports = {
  description: 'An egg must not be nicknamed',
  filter: {isEgg: true},
  field: 'isNicknamed',
  test (pkmn) {
    return !pkmn.isNicknamed;
  }
};
