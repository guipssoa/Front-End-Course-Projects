const { species } = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  const arraySpecies = [];
  if (ids === undefined) return arraySpecies;

  ids.filter((id) => species.forEach((specie) => {
    if (specie.id === id) {
      arraySpecies.push(specie);
    }
  }));
  return arraySpecies;
}

module.exports = getSpeciesByIds;
