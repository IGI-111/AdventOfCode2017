const input = [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6];
let bank = input;
let seen = {};
let cycles = 0;
while (!(JSON.stringify(bank) in seen)) {
  seen[JSON.stringify(bank)] = cycles;

  const max = maxIndex(bank);
  let toRedistribute = bank[max];
  bank[max] = 0;

  for (let i = (max + 1) % bank.length; toRedistribute > 0; i = (i + 1) % bank.length) {
    bank[i]++;
    toRedistribute--;
  }
  cycles++;
}

console.log(cycles);
console.log(cycles - seen[JSON.stringify(bank)]);

function maxIndex (array) {
  let index = 0;
  let max = array[0];
  array.forEach((val, i) => {
    if (val > max) {
      max = val;
      index = i;
    }
  });
  return index;
}
