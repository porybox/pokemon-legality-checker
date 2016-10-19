module.exports = {
  description: 'A Pokémon from XD/Colosseum must have a male OT',
  filter: {otGameId: 15},
  field: 'gender',
  test (pkmn) {
    return pkmn.otGender === 'M';
  }
};
