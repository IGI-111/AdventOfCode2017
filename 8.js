const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

let registers = {};

let highestValue = 0;

rl.on('line', line => {
  const matches = line.match(/(\S*) (inc|dec) (\S*) if (\S*) (<|>|==|!=|<=|>=) (\S*)/);
  const register = matches[1];
  const isIncrement = matches[2] === 'inc';
  const amount = parseInt(matches[3]);
  const conditionRegister = matches[4];
  const compare = parseComparison(matches[5]);
  const conditionLiteral = parseInt(matches[6]);

  if (!(register in registers)) {
    registers[register] = 0;
  }
  if (!(conditionRegister in registers)) {
    registers[conditionRegister] = 0;
  }

  if (compare(registers[conditionRegister], conditionLiteral)) {
    if (isIncrement) {
      registers[register] += amount;
    } else {
      registers[register] -= amount;
    }
  }

  highestValue = Math.max(highestValue, ...Object.values(registers));
});

rl.on('close', () => {
  const max = Math.max(...Object.values(registers));
  console.log(`${max}\n${highestValue}`);
});

function parseComparison (comparator) {
  switch (comparator) {
    case '<':
      return (a, b) => a < b;
    case '>':
      return (a, b) => a > b;
    case '==':
      return (a, b) => a === b;
    case '!=':
      return (a, b) => a !== b;
    case '<=':
      return (a, b) => a <= b;
    case '>=':
      return (a, b) => a >= b;
    default:
      return (a, b) => false;
  }
}
