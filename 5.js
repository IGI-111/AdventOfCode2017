const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

let jumps = [];

rl.on('line', line => {
  jumps.push(parseInt(line));
});

rl.on('close', () => {
  console.log(part1(Array.from(jumps)));
  console.log(part2(Array.from(jumps)));
});

function part1 (jumps) {
  let steps = 0;
  let cursor = 0;
  while (cursor >= 0 && cursor < jumps.length) {
    const offset = jumps[cursor];
    jumps[cursor]++;
    cursor += offset;
    steps++;
  }
  return steps;
}

function part2 (jumps) {
  let steps = 0;
  let cursor = 0;
  while (cursor >= 0 && cursor < jumps.length) {
    const offset = jumps[cursor];
    if (offset >= 3) {
      jumps[cursor]--;
    } else {
      jumps[cursor]++;
    }
    cursor += offset;
    steps++;
  }
  return steps;
}
