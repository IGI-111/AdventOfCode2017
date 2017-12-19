const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

let network = {};

let y = 0;
rl.on('line', line => {
  line.split('').forEach((c, x) => {
    network[`${x},${y}`] = c;
  });
  ++y;
});

rl.on('close', line => {
  let pos = { x: 0, y: 0 };

  // find beginning
  while (get(pos) === ' ') {
    pos.x++;
  }

  let direction = 'S';
  let steps = 0;

  while (get(pos) !== ' ') {
    while (get(pos) === '|' || get(pos) === '-') {
      move(pos, direction);
      steps++;
    }

    if (get(pos) === '+') {
      direction = nextDirection(pos, direction);
    } else {
      process.stdout.write(get(pos));
    }
    move(pos, direction);
    steps++;
  }
  console.log(`\n${steps}`);
});

function nextDirection (pos, previousDirection) {
  if (previousDirection === 'N' || previousDirection === 'S') {
    const left = { x: pos.x - 1, y: pos.y };
    return get(left) !== ' ' ? 'W' : 'E';
  } else {
    const up = { x: pos.x, y: pos.y - 1 };
    return get(up) !== ' ' ? 'N' : 'S';
  }
}

function get (pos) {
  return network[`${pos.x},${pos.y}`];
}

function move (pos, dir) {
  switch (dir) {
    case 'S':
      pos.y++;
      break;
    case 'N':
      pos.y--;
      break;
    case 'E':
      pos.x++;
      break;
    case 'W':
      pos.x--;
      break;
  }
}
