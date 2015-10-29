# sync-curl

可以进行同步http请求，并支持gbk编码。


## Installation

    npm install sync-curl

## Usage

```js
request(method, url, options)
```

e.g.

- GET request without options

```js
var request = require('sync-curl');
var res = request('GET', 'url');
var body = res.body.toString();
console.log(body);
```

## License

  MIT
