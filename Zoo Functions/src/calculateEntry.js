const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const countAges = { child: 0, adult: 0, senior: 0 };
  entrants.forEach((person) => {
    if (person.age < 18) {
      countAges.child += 1;
    } if (person.age >= 18 && person.age < 50) {
      countAges.adult += 1;
    } if (person.age >= 50) {
      countAges.senior += 1;
    }
  });
  return countAges;
}
function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const count = countEntrants(entrants);
  const { adult, senior, child } = data.prices;
  const result = (count.child * child) + count.adult * adult + count.senior * senior;
  return result;
}

module.exports = { calculateEntry, countEntrants };
