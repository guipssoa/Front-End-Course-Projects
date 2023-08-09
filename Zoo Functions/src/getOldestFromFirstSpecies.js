const data = require('../data/zoo_data');

const { employees, species } = data;

function getOldestFromFirstSpecies(id) {
  const employeesId = employees.find((element) => element.id === id);
  const speciesId = species.find((element) => element.id === employeesId.responsibleFor[0]);
  const objectValue = speciesId.residents.sort((a, b) => b.age - a.age)[0];
  return Object.values(objectValue);
}
console.log(getOldestFromFirstSpecies('fdb2543b-5662-46a7-badc-93d960fdc0a8'));

module.exports = getOldestFromFirstSpecies;
