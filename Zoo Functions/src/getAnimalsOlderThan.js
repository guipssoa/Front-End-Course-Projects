const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  let allAnimals = false;
  data.species.forEach((element) => {
    if (element.name === animal) {
      allAnimals = element.residents.every((resident) => resident.age >= age);
    }
  });
  return allAnimals;
}
module.exports = getAnimalsOlderThan;
