'use strict';

var fs = require('fs');
var spawnSync = require('child_process').spawnSync || require('spawn-sync');
var HttpResponse = require('http-response-object');
require('concat-stream');
require('then-request');
var JSON = require('./lib/json-buffer');

Function('', fs.readFileSync(require.resolve('./lib/worker.js'), 'utf8'));

// var res = doRequest('GET', 'http://news.ifeng.com/a/20151030/46048034_0.shtml', {encode:'utf8'});
// var headers = {
//     'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
//     'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
// };
// var res = doRequest('GET', 'http://news.qq.com/a/20151015/017524.hdBigPic.js', {encode:'gbk'}, headers);
// console.log(res.body.toString());

var request = require('request');
var options = {
  url:'http://inba.ifeng.com/46054194/news.shtml',
  method:'GET',
  headers:{
    'User-Agent': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  },
};
request(options, function(error, res, body){
  if(error){
    console.log(error);
  }
  console.log(body);
  process.exit(0);
});

// var headers = {
//     'user-agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
//     'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//     'Referer':'http://www.sina.com.cn/',
//     'Upgrade-Insecure-Requests':1,
//     'Accept-Encoding':'gzip, deflate, sdch',
//     'Proxy-Connection':'keep-alive',
// };
// var res = doRequest('GET', 'http://news.sina.com.cn/c/nd/2015-10-30/doc-ifxkhcfq0978911.shtml', {encode:'utf8'}, headers);
// console.log(res.body);

module.exports = doRequest;
function doRequest(method, url, options) {
  var req = JSON.stringify({
    method: method,
    url: url,
    options: options
  });
  var res = spawnSync(process.execPath, [require.resolve('./lib/worker.js')], {input: req});
  var response = JSON.parse(res.stdout);
  if (response.success) {
    return new HttpResponse(200, {}, response.response, '');
  } else {
    
  }
}
