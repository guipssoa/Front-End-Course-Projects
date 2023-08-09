const data = require('../data/zoo_data');

const { employees, species } = data;

const employeeName = (employee) => {
  if (employee.name) {
    return employees.find((person) =>
      person.firstName.includes(employee.name) || person.lastName.includes(employee.name));
  }
  if (employee.id) {
    return employees.find((person) => person.id.includes(employee.id));
  }
};
const employeeSpecies = (employee) => ({
  id: employee.id,
  fullName: `${employee.firstName} ${employee.lastName}`,
  species: species.filter((specie) =>
    employee.responsibleFor.includes(specie.id)).map((animal) => animal.name),
  locations: species.filter((specie) =>
    employee.responsibleFor.includes(specie.id)).map((animal) => animal.location),
});
function getEmployeesCoverage(employee) {
  if (!employee) return employees.map((person) => employeeSpecies(person));
  if (!employeeName(employee)) throw new Error('Informações inválidas');
  return employeeSpecies(employeeName(employee));
}

module.exports = getEmployeesCoverage;
