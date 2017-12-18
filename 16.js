const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
input: fs.createReadStream(process.argv[2])
});

let programs = 'abcdefghijklmnop'.split('');

rl.on('line', line => {
  line.split(',').forEach(move => dance(move));
  console.log(programs.join(''));
  
  let cycle = ['abcdefghijklmnop'];
  while (!(programs.join('') in cycle)){
    cycle.push(programs.join(''));
    cycle[programs.join('')] = undefined;
    line.split(',').forEach(move => dance(move));
  }
  cycle.pop();
  console.log(cycle[1000000000 % cycle.length]);
});


function spin(n) {
  programs = programs.slice(programs.length - n, programs.length).concat(
    programs.slice(0, programs.length - n));
}

function exchange(A, B) {
  const tmp = programs[A];
  programs[A] = programs[B];
  programs[B] = tmp;
}

function partner(A, B){
  exchange(programs.indexOf(A), programs.indexOf(B));
}

function dance(move){
      const matches = move.match(/s(\d+)|x(\d+)\/(\d+)|p(\w)\/(\w)/);
    if(matches[1] !== undefined){
      spin(matches[1]);
    } else if(matches[2] !== undefined) {
      exchange(matches[2], matches[3]);
    } else if(matches[4] !== undefined) {
      partner(matches[4], matches[5]);
    }
}

