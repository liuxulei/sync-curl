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
var res = request('GET', 'url', {encode:'utf8'});
var body = res.body.toString();
console.log(body);
```

## Param
```
method: request type
url: request link

options:
[encode] 目标地址的编码，输出会转换为utf8
[encoding] request original param. gbk grab must be set null.
[headers] request original param. request header.
[timeout] set request timeout.
```

## Update
2015-10-30
增加对utf-8和gbk编码的支持，通过对options参数的设置进行区分。

## License

  MIT
