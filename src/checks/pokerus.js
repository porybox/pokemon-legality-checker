module.exports = {
  description: 'Illegal pokerus strain for Pokémon',
  field: 'pokerusStrain',
  test (pkmn) {
    const strain = pkmn.pokerusStrain;
    const duration = pkmn.pokerusDuration;
    const maxDays = strain % 4 + 1;

    if (strain === 0) {
      return duration === 0;
    }
    return maxDays >= duration;
  }
};
