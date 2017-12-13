const testFirewall = { 0: 3, 1: 2, 4: 4, 6: 4 };
const chalFirewall = { 0: 3,
  1: 2,
  2: 6,
  4: 4,
  6: 4,
  8: 10,
  10: 6,
  12: 8,
  14: 5,
  16: 6,
  18: 8,
  20: 8,
  22: 12,
  24: 6,
  26: 9,
  28: 8,
  30: 8,
  32: 10,
  34: 12,
  36: 12,
  38: 8,
  40: 12,
  42: 12,
  44: 14,
  46: 12,
  48: 12,
  50: 12,
  52: 12,
  54: 14,
  56: 14,
  58: 14,
  60: 12,
  62: 14,
  64: 14,
  66: 17,
  68: 14,
  72: 18,
  74: 14,
  76: 20,
  78: 14,
  82: 18,
  86: 14,
  90: 18,
  92: 14
};

class Firewall {
  constructor (firewall) {
    this.layers = {};
    for (const layer in firewall) {
      this.layers[layer] = 2 * (firewall[layer] - 1);
    }
    this.maxLayer = Math.max(...Object.keys(this.layers));
  }
  caught (delay) {
    for (let i = 0; i <= this.maxLayer; ++i) {
      if (i in this.layers && (i + delay) % this.layers[i] === 0) {
        return true;
      }
    }
    return false;
  }
  severity (delay) {
    let res = 0;
    for (let i = 0; i <= this.maxLayer; ++i) {
      if (i in this.layers && (i + delay) % this.layers[i] === 0) {
        res += i * (this.layers[i] / 2 + 1);
      }
    }
    return res;
  }
}

const test = new Firewall(testFirewall);
const chal = new Firewall(chalFirewall);
console.log(test.severity(0));
console.log(chal.severity(0));

let delay = 0;
while (test.caught(delay)) {
  ++delay;
}
console.log(delay);

delay = 0;
while (chal.caught(delay)) {
  ++delay;
}
console.log(delay);
