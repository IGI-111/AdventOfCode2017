const input = process.argv[2];

const part1 = input.split('').map((val, i, input) => {
  if (input[(i + 1) % input.length] === val) {
    return parseInt(val);
  } else {
    return 0;
  }
}).reduce((xs, x) => x + xs, 0);

const part2 = input.split('').map((val, i, input) => {
  if (input[(i + input.length / 2) % input.length] === val) {
    return parseInt(val);
  } else {
    return 0;
  }
}).reduce((xs, x) => x + xs, 0);

console.log(`Part 1: ${part1}\nPart 2: ${part2}`);
