module.exports = {
  description: 'A Pokémon from XD/Colosseum must have a male OT',
  filter: {otGameId: 15},
  test (pkmn) {
    return pkmn.otGender === 'M';
  }
};
