const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

rl.on('line', line => {
  const directions = {
    'nw': [1, -1, 0],
    'n': [1, 0, -1],
    'ne': [0, 1, -1],
    'sw': [0, -1, 1],
    's': [-1, 0, 1],
    'se': [-1, 1, 0]
  };
  const positions = line.split(',')
    .map(dir => directions[dir])
    .map((dir, i, list) => list.slice(0, i + 1))
    .map(dirs => dirs
      .reduce((acc, dir) => [acc[0] + dir[0], acc[1] + dir[1], acc[2] + dir[2]], [0, 0, 0]))
    .map(pos => pos.reduce((acc, coor) => Math.max(acc, coor), 0));
  console.log(`${positions[positions.length - 1]} ${Math.max(...positions)}`);
});
