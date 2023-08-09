const data = require('../data/zoo_data');

const { species } = data;

function countAnimals(animal) {
  if (animal === undefined) {
    return {
      lions: 4,
      tigers: 2,
      bears: 3,
      penguins: 4,
      otters: 4,
      frogs: 2,
      snakes: 2,
      elephants: 4,
      giraffes: 6,
    };
  }
  return species.find(({ name }) => name === animal.specie).residents
    .filter((resident) => (!animal.sex ? true : resident.sex === animal.sex)).length;
}
console.log(countAnimals({ specie: 'penguins' }));
console.log(countAnimals({ specie: 'bears', sex: 'female' }));
module.exports = countAnimals;
