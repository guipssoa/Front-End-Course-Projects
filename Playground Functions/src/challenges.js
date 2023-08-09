// Desafio 1
function compareTrue(aluno1, aluno2) {
  if (aluno1 === true && aluno2 === true) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(parameter) {
  return parameter.split(' ');
}

// Desafio 4
function concatName(listNames) {
  const firstName = listNames[0];
  const lastName = listNames[listNames.length - 1];
  return lastName.concat(', ') + (firstName);
}

// Desafio 5
function footballPoints(wins, ties) {
  return wins * 3 + ties;
}

// Desafio 6
function highestCount(numbers) {
  let high = numbers[0];
  let total = 0;
  for (let repeat = 1; repeat < numbers.length; repeat += 1) {
    if (high < numbers[repeat]) {
      high = numbers[repeat];
    }
  }
  for (let repeat = 0; repeat < numbers.length; repeat += 1) {
    if (high === numbers[repeat]) {
      total += 1;
    }
  }
  return total;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  if (cat1 + 1 && cat2 - 1 === mouse) {
    return 'os gatos trombam e o rato foge';
  }
  if (cat1 + 3 > cat2 + 2) {
    return 'cat2';
  }
  if (cat1 + 6 < cat2 + 12) {
    return 'cat1';
  }
}

// Desafio 8
function fizzBuzz(numbers) {
  let result = [];
  for (let index = 0; index < numbers.length; index += 1) {
    if (numbers[index] % 3 === 0 && numbers[index] % 5 === 0) {
      result.push('fizzBuzz');
    } else if (numbers[index] % 3 === 0) {
      result.push('fizz');
    } else if (numbers[index] % 5 === 0) {
      result.push('buzz');
    } else {
      result.push('bug!');
    }
  }
  return result;
}

function encode(changes) {
  let stringEncode = '';
  stringEncode = changes.replaceAll('a', '1');
  stringEncode = stringEncode.replaceAll('e', '2');
  stringEncode = stringEncode.replaceAll('i', '3');
  stringEncode = stringEncode.replaceAll('o', '4'); 
  stringEncode = stringEncode.replaceAll('u', '5');
  return stringEncode;
}
function decode(changes) {
  let stringDecode = '';
  stringDecode = changes.replaceAll('1', 'a');
  stringDecode = stringDecode.replaceAll('2', 'e');
  stringDecode = stringDecode.replaceAll('3', 'i');
  stringDecode = stringDecode.replaceAll('4', 'o');
  stringDecode = stringDecode.replaceAll('5', 'u');
  return stringDecode;
}

function techList(techs, names) {
  let technologies = techs.sort();
  let objectList = [];
  if (techs.length === 0) {
    return 'Vazio!';
  }
  for (let index = 0; index < technologies.length; index += 1) {
    objectList.push(({
      tech: technologies[index],
      name: names,
    }));
  }
  return objectList;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
