function replacer(key, value) {
  if (typeof value === 'string') {
    return undefined;
  }
  return value;
}
var foo = { name: 'jason', nickname: 'ball', weight: 75 };
var useJson = JSON.stringify(foo, replacer);
console.log(useJson); // {"weight":75}

var useJson = JSON.stringify(foo, ['nickname', 'weight']);
console.log(useJson); // {“nickname”:”ball”,”weight”:75}

const logs = {
  promptId: 2492,
  logs: [
    [9965, 9966, 1, 1],
    [9966, 9967, 0, 0],
    [9966, 9968, 1, 1],
  ],
};
const userId = 3;
const req = {
  body: logs,
};

console.log(JSON.stringify({ userId, ...req.body }, null, 0));
