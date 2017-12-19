const input = 349;

let buf = { 0: 0 };
buf.next = buf;
let i = 1;
let pos = 0;
while (i <= 2017) {
  for (let j = 0; j < input; ++j) {
    pos = buf[pos];
  }
  const tail = buf[pos];
  buf[pos] = i;
  buf[i] = tail;
  pos = i;
  ++i;
}
console.log(buf[2017]);

let after0 = 0;
pos = 0;
i = 1;
while (i <= 50000000) {
  pos = ((pos + input) % i) + 1;
  if (pos === 1) {
    after0 = i;
  }
  ++i;
}

console.log(after0);
