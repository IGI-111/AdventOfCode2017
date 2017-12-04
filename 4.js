const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

let part1valid = 0;
let part1invalid = 0;
let part2valid = 0;
let part2invalid = 0;

function part1 (line) {
  const seen = new Set();
  const words = line.split(/\s+/);

  for (const w of words) {
    if (seen.has(w)) {
      break;
    }
    seen.add(w);
  }
  if (seen.size === words.length) {
    part1valid++;
  } else {
    part1invalid++;
  }
}

function part2 (line) {
  const seen = new Set();
  const words = line.split(/\s+/);

  for (const w of words) {
    const sorted = w.split('').sort().join();
    if (seen.has(sorted)) {
      break;
    }
    seen.add(sorted);
  }
  if (seen.size === words.length) {
    part2valid++;
  } else {
    part2invalid++;
  }
}

rl.on('line', line => {
  part1(line);
  part2(line);
});

rl.on('close', () => {
  console.log(`\
Part 1: ${part1valid} valid, ${part1invalid} invalid\n\
Part 2: ${part2valid} valid, ${part2invalid} invalid`);
});
