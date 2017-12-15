function knotHash (string) {
  const lengths = string.split('').map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]);

  const list = Array.apply(null, {length: 256}).map(Number.call, Number);
  let position = 0;
  let skipSize = 0;

  for (let i = 0; i < 64; ++i) {
    for (const length of lengths) {
      for (let i = 0; i < length / 2; i++) {
        const headIndex = (position + i) % list.length;
        const tailIndex = (position + length - 1 - i) % list.length;

        const tmp = list[headIndex];
        list[headIndex] = list[tailIndex];
        list[tailIndex] = tmp;
      }

      position = (position + length + skipSize) % list.length;
      skipSize++;
    }
  }

  const denseHash = [];
  for (let i = 0; i < 16; i++) {
    denseHash.push(list.slice(16 * i, 16 * (i + 1)).reduce((acc, x) => acc ^ x, 0));
  }

  return denseHash.map(x => x.toString(16).padStart(2, '0')).join('');
}

function hex2bin (hex) {
  const bin = {
    '0': [ '.', '.', '.', '.' ],
    '1': [ '.', '.', '.', '#' ],
    '2': [ '.', '.', '#', '.' ],
    '3': [ '.', '.', '#', '#' ],
    '4': [ '.', '#', '.', '.' ],
    '5': [ '.', '#', '.', '#' ],
    '6': [ '.', '#', '#', '.' ],
    '7': [ '.', '#', '#', '#' ],
    '8': [ '#', '.', '.', '.' ],
    '9': [ '#', '.', '.', '#' ],
    'a': [ '#', '.', '#', '.' ],
    'b': [ '#', '.', '#', '#' ],
    'c': [ '#', '#', '.', '.' ],
    'd': [ '#', '#', '.', '#' ],
    'e': [ '#', '#', '#', '.' ],
    'f': [ '#', '#', '#', '#' ]
  };
  return bin[hex];
}

function clearNeighbours (grid, i) {
  if (grid[i] === '#') {
    grid[i] = '.';
    if (i % 128 !== 127) {
      clearNeighbours(grid, i + 1);
    }
    if (i % 128 !== 0) {
      clearNeighbours(grid, i - 1);
    }
    if (i + 128 < grid.length) {
      clearNeighbours(grid, i + 128);
    }
    if (i - 128 >= 0) {
      clearNeighbours(grid, i - 128);
    }
  }
}

const input = process.argv[2];
const rowHashes = Array.apply(null, {length: 128}).map(Number.call, Number)
  .map(x => knotHash(`${input}-${x}`));
const grid = [].concat(...rowHashes.map(hash =>
  [].concat(...hash.split('').map(hex => hex2bin(hex)))));
const used = grid.filter(x => x === '#').length;

const regions = grid.reduce((acc, bit, i, grid) => {
  if (bit === '#') {
    clearNeighbours(grid, i);
    return acc + 1;
  }
  return acc;
}, 0);

console.log(used);
console.log(regions);
