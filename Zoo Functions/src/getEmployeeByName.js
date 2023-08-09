const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  const objEmployee = {};
  const findEmployee = data.employees.find((employee) =>
    employee.firstName === employeeName
    || employee.lastName === employeeName);
  return Object.assign(objEmployee, findEmployee);
}
module.exports = getEmployeeByName;
