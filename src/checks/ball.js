const _ = require('lodash');
const ballData = require('../helpers/ball-data.js');
const pokemonList = _.keys(ballData.legal);

for (const pokemon of pokemonList) {
  const parsed = [];
  ballData.ballTypes.forEach((ball, j) => {
    const data = parseInt(ballData.legal[pokemon].charAt(j), 8);
    parsed.push({name: ball, legal: !!(data & 4), ha: !!(data & 2), breedable: !!(data & 1)});
  });
  ballData.legal[pokemon] = parsed;
}

module.exports = {
  description: 'Illegal ball for Pokémon',
  field: 'ball',
  test (pkmn) {
    const pokemon = pkmn.speciesName.toLowerCase();
    const pokemonData = ballData.legal[pokemon];
    const ballName = pkmn.ballName.split(' ')[0].toLowerCase();
    const ball = _.find(pokemonData, {name: ballName});
    return ball.legal;
  }
};
