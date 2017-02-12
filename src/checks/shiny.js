module.exports = {
  description: 'Certain Pokemon cannot be obtained shiny.',
  field: 'isShiny',
  filter (pkmn) {
    return [
      251, // Celebi
      494, // Victini
      647, // Keldeo
      648, // Meloetta
      718, // Zygarde
      720, // Hoopa
      721, // Volcanion
      785, // Tapu Koko
      786, // Tapu Lele
      787, // Tapu Bulu
      788, // Tapu Fini
      789, // Cosmog
      790, // Cosmoem
      791, // Solgaleo
      792, // Lunala
      793, // Nihilego
      794, // Buzzwole
      795, // Pheromosa
      796, // Xurkitree
      797, // Celesteela
      798, // Kartana
      799, // Guzlord
      800, // Necrozma
      801, // Magearna
      802 // Marshadow
    ].includes(pkmn.dexNo);
  },
  test (pkmn) {
    return !pkmn.isShiny;
  }
};
