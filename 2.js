const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

let checksum = 0;
let evensum = 0;

rl.on('line', line => {
  let numbers = line.split(/\s+/).map(x => parseInt(x));

  let min;
  let max;
  numbers.forEach(val => {
    if (min === undefined || min > val) {
      min = val;
    }
    if (max === undefined || max < val) {
      max = val;
    }
  });
  const linesum = max - min;
  checksum += linesum;

  let even;
  numbers.find(x => {
    const divider = numbers.find(y => y !== x && Number.isInteger(x / y));
    if (divider === undefined) {
      return false;
    } else {
      even = x / divider;
      return true;
    }
  });

  evensum += even;
});

rl.on('close', () => {
  console.log(checksum);
  console.log(evensum);
});
