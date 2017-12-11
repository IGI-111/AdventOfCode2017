const chalList = Array.apply(null, {length: 256}).map(Number.call, Number);
const chalLengths = [14, 58, 0, 116, 179, 16, 1, 104, 2, 254, 167, 86, 255, 55, 122, 244];
const chalString = '14,58,0,116,179,16,1,104,2,254,167,86,255,55,122,244';
const testString = '1,2,3';

function part1 (list, lengths) {
  let position = 0;
  let skipSize = 0;

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
  return list[0] * list[1];
}

function knotHash (string) {
  const lengths = string.split('').map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]);

  const list = Array.from(chalList);
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

console.log(part1(Array.from(chalList), chalLengths));
console.log(knotHash(''));
console.log(knotHash('AoC 2017'));
console.log(knotHash('1,2,3'));
console.log(knotHash('1,2,4'));
console.log(knotHash(chalString));
