const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

rl.on('line', line => {
  const clean = line.replace(/<((!!)*|.*?[^!](!!)*)>/g, '');
  const score = clean.split('').reduce((acc, c) => {
    if (c === '{') {
      acc.level++;
    } else if (c === '}') {
      acc.score += acc.level;
      acc.level--;
    }
    return acc;
  }, { score: 0, level: 0 }).score;

  const garbage = line.match(/<((!!)*|.*?[^!](!!)*)>/g).map(match => match.replace(/!./g, ''));
  const size = garbage === null ? 0 : garbage.reduce((acc, match) => acc + match.length - 2, 0);

  console.log(`score: ${score} garbage size: ${size}`);
});
