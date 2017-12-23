const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

let input = [];
let num = 0;

rl.on('line', line => {
  const [, px, py, pz, vx, vy, vz, ax, ay, az] =
    line.match(/p=<\s*(\S+),\s*(\S+),\s*(\S+)>,\s+v=<\s*(\S+),\s*(\S+),\s*(\S+)>,\s+a=<\s*(\S+),\s*(\S+),\s*(\S+)>/);
  const particle = {
    p: {x: parseInt(px), y: parseInt(py), z: parseInt(pz)},
    v: {x: parseInt(vx), y: parseInt(vy), z: parseInt(vz)},
    a: {x: parseInt(ax), y: parseInt(ay), z: parseInt(az)}
  };
  input.push(particle);
});

rl.on('close', line => {
  let particleArray = JSON.parse(JSON.stringify(input));
  for (let i = 0, len = 10000; i < len; i++) {
    particleArray = iterateParticleArray(particleArray);
  }
  console.log(closestParticleIndex(particleArray));

  let particleMap = {};
  for (const particle of input) {
    const posStr = `${particle.p.x},${particle.p.y},${particle.p.z}`;
    particleMap[posStr] = particle;
  }
  for (let i = 0, len = 10000; i < len; i++) {
    particleMap = iterateParticleMap(particleMap);
  }
  console.log(Object.keys(particleMap).length);
});

function distance (particle) {
  return Math.abs(particle.p.x) + Math.abs(particle.p.y) + Math.abs(particle.p.z);
}

function closestParticleIndex (particleArray) {
  let minIndex = 0;
  let minDistance = distance(particleArray[0]);
  for (let i = 0; i < particleArray.length; ++i) {
    const dist = distance(particleArray[i]);
    if (dist < minDistance) {
      minDistance = dist;
      minIndex = i;
    }
  }
  return minIndex;
}

function iterateParticleArray (particleArray) {
  for (const particle of particleArray) {
    particle.v.x += particle.a.x;
    particle.v.y += particle.a.y;
    particle.v.z += particle.a.z;
    particle.p.x += particle.v.x;
    particle.p.y += particle.v.y;
    particle.p.z += particle.v.z;
  }
  return particleArray;
}

function iterateParticleMap (particleMap) {
  const nextParticles = {};
  for (const posStr in particleMap) {
    const nextParticle = particleMap[posStr];
    nextParticle.v.x += nextParticle.a.x;
    nextParticle.v.y += nextParticle.a.y;
    nextParticle.v.z += nextParticle.a.z;
    nextParticle.p.x += nextParticle.v.x;
    nextParticle.p.y += nextParticle.v.y;
    nextParticle.p.z += nextParticle.v.z;
    const nextPosStr = `${nextParticle.p.x},${nextParticle.p.y},${nextParticle.p.z}`;
    if (nextPosStr in nextParticles) {
      nextParticles[nextPosStr] = undefined;
    } else {
      nextParticles[nextPosStr] = nextParticle;
    }
  }
  for (const posStr in nextParticles) {
    if (nextParticles[posStr] === undefined) {
      // console.log(`collision in ${posStr}`);
      delete nextParticles[posStr];
    }
  }
  return nextParticles;
}
