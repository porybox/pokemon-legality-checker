module.exports = {
  description: 'Female-only species must be female',
  filter (pkmn) {
    return [29, 30, 31, 113, 115, 124, 238, 241, 242, 314, 380, 413, 416, 440, 478, 488,
      548, 549, 629, 630, 669, 670, 671].includes(pkmn.dexNo);
  },
  test (pkmn) {
    return pkmn.gender === 'F';
  }
};
