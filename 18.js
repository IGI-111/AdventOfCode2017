const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

let program = [];
rl.on('line', line => {
  program.push(line.split(' '));
});

rl.on('close', line => {
  part1();
  part2();
});

function part1 () {
  let ip = 0;
  const registers = {};
  let sound = 0;
  let recovered = false;

  while (ip < program.length && !recovered) {
    const [ins, X, Y] = program[ip];
    switch (ins) {
      case 'snd':
        sound = isNaN(parseInt(X)) ? registers[X] : parseInt(X);
        break;
      case 'set':
        registers[X] = isNaN(parseInt(Y)) ? registers[Y] : parseInt(Y);
        break;
      case 'add':
        if (!(X in registers)) {
          registers[X] = 0;
        }
        registers[X] += isNaN(parseInt(Y)) ? registers[Y] : parseInt(Y);
        break;
      case 'mul':
        if (!(X in registers)) {
          registers[X] = 0;
        }
        registers[X] *= isNaN(parseInt(Y)) ? registers[Y] : parseInt(Y);
        break;
      case 'mod':
        if (!(X in registers)) {
          registers[X] = 0;
        }
        registers[X] %= isNaN(parseInt(Y)) ? registers[Y] : parseInt(Y);
        break;
      case 'rcv':
        if (sound !== 0) {
          console.log(sound);
          recovered = true;
        }
        break;
      case 'jgz':
        if (registers[X] > 0) {
          ip += parseInt(Y) - 1;
        }
        break;
    }
    ++ip;
  }
}

function part2 () {
  const machine0 = {
    ip: 0,
    registers: { p: 0 },
    queue: [],
    waiting: false,
    sndCount: 0
  };

  const machine1 = {
    ip: 0,
    registers: { p: 1 },
    queue: [],
    waiting: false,
    sndCount: 0
  };

  while ((!machine0.waiting || !machine1.waiting) &&
    !(machine0.ip >= program.length && machine1.ip >= program.length)) {
    if (!machine0.waiting && machine0.ip < program.length) {
      cycle(machine0, machine1);
    }
    if (!machine1.waiting && machine1.ip < program.length) {
      cycle(machine1, machine0);
    }
  }
  console.log(machine1.sndCount);
}

function cycle (machine, other) {
  const [ins, X, Y] = program[machine.ip];
  switch (ins) {
    case 'snd':
      other.queue.push(isNaN(parseInt(X)) ? machine.registers[X] : parseInt(X));
      other.waiting = false;
      machine.sndCount++;
      break;
    case 'set':
      machine.registers[X] = isNaN(parseInt(Y)) ? machine.registers[Y] : parseInt(Y);
      break;
    case 'add':
      if (!(X in machine.registers)) {
        machine.registers[X] = 0;
      }
      machine.registers[X] += isNaN(parseInt(Y)) ? machine.registers[Y] : parseInt(Y);
      break;
    case 'mul':
      if (!(X in machine.registers)) {
        machine.registers[X] = 0;
      }
      machine.registers[X] *= isNaN(parseInt(Y)) ? machine.registers[Y] : parseInt(Y);
      break;
    case 'mod':
      if (!(X in machine.registers)) {
        machine.registers[X] = 0;
      }
      machine.registers[X] %= isNaN(parseInt(Y)) ? machine.registers[Y] : parseInt(Y);
      break;
    case 'rcv':
      if (machine.queue.length > 0) {
        machine.registers[X] = machine.queue.shift();
      } else {
        machine.waiting = true;
        --machine.ip;
      }
      break;
    case 'jgz':
      if ((isNaN(parseInt(X)) ? machine.registers[X] : parseInt(X)) > 0) {
        const offset = isNaN(parseInt(Y)) ? machine.registers[Y] : parseInt(Y);
        machine.ip += offset - 1;
      }
      break;
  }
  ++machine.ip;
}
