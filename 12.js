const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

let programs = {};

rl.on('line', line => {
  const [id, pipes] = line.split('<->').map(x => x.trim());
  programs[id] = pipes.split(',').map(x => x.trim());
});

rl.on('close', () => {
  const known = new Set();
  const neighbours = countNeighbours('0', known);
  console.log(neighbours);

  const groupCount = countGroups();
  console.log(groupCount);
});

function countNeighbours (node, known) {
  known.add(node);
  return programs[node].reduce((acc, x) =>
    acc + (known.has(x) ? 0 : countNeighbours(x, known)), 1);
}

function countGroups () {
  let groups = 0;
  const known = new Set();
  for (const id in programs) {
    if (known.has(id)) {
      continue;
    }
    countNeighbours(id, known);
    groups++;
  }
  return groups;
}
