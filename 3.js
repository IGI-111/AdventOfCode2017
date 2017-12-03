const order = process.argv[2];
part1(order);
part2(order);

function add (position, offset) {
  return [position[0] + offset[0], position[1] + offset[1]];
}

function part1 (order) {
  const offsets = [
    [0, 1], [-1, 0], [0, -1], [1, 0]
  ];

  let currentPosition = [1, 0];
  let currentSquareSize = 3;
  let movesBeforeChange = 1;
  let currentOffset = 0;
  for (let i = 2; i < order; ++i) {
    if (i >= currentSquareSize * currentSquareSize) {
      movesBeforeChange++;
    } if (movesBeforeChange === 0) {
      movesBeforeChange = currentSquareSize - 1;
      currentOffset = (currentOffset + 1) % offsets.length;
    }
    currentPosition = add(currentPosition, offsets[currentOffset]);
    movesBeforeChange--;
    if (i >= currentSquareSize * currentSquareSize) {
      currentSquareSize += 2;
      movesBeforeChange = currentSquareSize - 2;
      currentOffset = (currentOffset + 1) % offsets.length;
    }
  }
  console.log(Math.abs(currentPosition[0]) + Math.abs(currentPosition[1]));
}

function adjacentSum (position, spiral) {
  const x = position[0];
  const y = position[1];
  return 0 +
    (`${x + 1},${y + 0}` in spiral ? spiral[`${x + 1},${y + 0}`] : 0) +
    (`${x + 1},${y + 1}` in spiral ? spiral[`${x + 1},${y + 1}`] : 0) +
    (`${x + 0},${y + 1}` in spiral ? spiral[`${x + 0},${y + 1}`] : 0) +
    (`${x - 1},${y + 1}` in spiral ? spiral[`${x - 1},${y + 1}`] : 0) +
    (`${x - 1},${y + 0}` in spiral ? spiral[`${x - 1},${y + 0}`] : 0) +
    (`${x - 1},${y - 1}` in spiral ? spiral[`${x - 1},${y - 1}`] : 0) +
    (`${x + 0},${y - 1}` in spiral ? spiral[`${x + 0},${y - 1}`] : 0) +
    (`${x + 1},${y - 1}` in spiral ? spiral[`${x + 1},${y - 1}`] : 0);
}

function part2 (order) {
  const offsets = [
    [0, 1], [-1, 0], [0, -1], [1, 0]
  ];

  let spiral = { '0,0': 1 };

  let currentPosition = [1, 0];
  let currentSquareSize = 3;
  let movesBeforeChange = 1;
  let currentOffset = 0;
  for (let i = 2; true; ++i) {
    const sum = adjacentSum(currentPosition, spiral);
    spiral[`${currentPosition[0]},${currentPosition[1]}`] = sum;

    if (sum > order) {
      break;
    }

    if (i >= currentSquareSize * currentSquareSize) {
      movesBeforeChange++;
    } if (movesBeforeChange === 0) {
      movesBeforeChange = currentSquareSize - 1;
      currentOffset = (currentOffset + 1) % offsets.length;
    }
    currentPosition = add(currentPosition, offsets[currentOffset]);
    movesBeforeChange--;
    if (i >= currentSquareSize * currentSquareSize) {
      currentSquareSize += 2;
      movesBeforeChange = currentSquareSize - 2;
      currentOffset = (currentOffset + 1) % offsets.length;
    }
  }
  console.log(spiral[`${currentPosition[0]},${currentPosition[1]}`]);
}
