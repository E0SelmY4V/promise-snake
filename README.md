# Promise Snake

This is a plugin for ES6 Promise, which can bring [*Scpos Process*](https://www.npmjs.com/package/scpo-proce)' `scpoProce.snake` and `Proce#next` to your code without additional importation of other Thenable library.

## Usage

### Multiple Timeout

```js
import 'promise-snake';

Promise.snake([
  (res) => {
    console.log('How');
    return setTimeout(res, 200);
  },
  (res) => {
    console.log('are');
    return setTimeout(res, 500);
  },
  (res) => {
    console.log('you?');
    return res();
  },
]);
```

### Reading Files Continuously

```js
import * as fsp from 'fs/promises';
import 'promise-snake';

const files = ['a.txt', 'b.txt', 'c.txt'];
const datas = [];

Promise.snake(files.map(file =>
  async (res) => {
    const data = await fsp.readFile(file);
    datas.push(data);
    return res();
  }
));
```
