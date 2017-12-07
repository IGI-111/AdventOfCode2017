const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

let programInfo = {};

rl.on('line', line => {
  const prog = parseLine(line);
  programInfo[prog.name] = prog;
});

rl.on('close', () => {
  // add parent information
  for (const name in programInfo) {
    if (programInfo[name].children.length > 0) {
      for (const child of programInfo[name].children) {
        programInfo[child].parent = name;
      }
    }
  }

  // add compound size

  let root;
  for (const name in programInfo) {
    if (!('parent' in programInfo[name])) {
      root = name;
      break;
    }
  }
  console.log(`Root: ${root}`);

  let imbalance = root;
  while ('children' in programInfo[imbalance]) {
    const next = imbalancedChild(imbalance);
    if (next !== undefined) {
      imbalance = next;
    } else {
      break;
    }
  }
  const imbalanceParent = programInfo[imbalance].parent;
  const imbalanceSiblings = programInfo[imbalanceParent].children;
  const sibling =
    imbalanceSiblings[(imbalanceSiblings.indexOf(imbalance) + 1) % imbalanceSiblings.length];
  const idealSize = subtreeSize(sibling);
  const imbalanceSize = subtreeSize(imbalance);
  const offset = idealSize - imbalanceSize;
  const newSize = programInfo[imbalance].size + offset;

  console.log(`Imbalance: ${imbalance} should be of size ${newSize}`);
});

function parseLine (line) {
  const res = line.match(/(\w+) \((\d+)\)( -> (.*))?/);
  return {
    name: res[1],
    size: parseInt(res[2]),
    children: res[4] === undefined ? [] : res[4].split(', ')
  };
}

function imbalancedChild (root) {
  return programInfo[root].children.find((child, i, children) => {
    const nextChild = children[(children.length + i - 1) % children.length];
    const previousChild = children[(children.length + i + 1) % children.length];
    return subtreeSize(child) !== subtreeSize(previousChild) &&
      subtreeSize(child) !== subtreeSize(nextChild);
  });
}

function subtreeSize (root) {
  if (programInfo[root].children.length === 0) {
    return programInfo[root].size;
  } else {
    return programInfo[root].size + programInfo[root].children.reduce(
      (xs, x) => xs + subtreeSize(x), 0);
  }
}
