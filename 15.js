class Generator {
  constructor (startingValue, factor, mask) {
    this.startingValue = startingValue;
    this.value = this.startingValue;
    this.factor = factor;
    this.mask = mask;
  }
  generate () {
    this.value = (this.value * this.factor) % 2147483647;
    return this.value;
  }
  generateMultiples () {
    do{
      this.generate();
    } while ((this.value & this.mask) !== 0);
    return this.value;
  }
  reset () {
    this.value = this.startingValue;
  }
}

const genA = new Generator(512, 16807, 3);
const genB = new Generator(191, 48271, 7);

function compare16LSB (a, b) {
  return (a & 0xFFFF) === (b & 0xFFFF);
}

let total = 0;
for (let i = 0, len = 40000000; i < len; i++) {
  if (compare16LSB(genA.generate(), genB.generate())) {
    ++total;
  }
}
console.log(total);

genA.reset();
genB.reset();

let totalMultiples = 0;
for (let i = 0, len = 5000000; i < len; i++) {
  if (compare16LSB(genA.generateMultiples(), genB.generateMultiples())) {
    ++totalMultiples;
  }
}
console.log(totalMultiples);
