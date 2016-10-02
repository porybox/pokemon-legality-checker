module.exports = {
  description: 'Male-only species must be male',
  filter (pkmn) {
    return [32, 33, 34, 106, 107, 128, 236, 237, 313, 381, 414, 475,
    538, 539, 627, 628, 641, 642, 645].includes(pkmn.dexNo);
  },
  test (pkmn) {
    return pkmn.gender === 'M';
  }
};
