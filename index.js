'use strict';

var fs = require('fs');
var spawnSync = require('child_process').spawnSync || require('spawn-sync');
var HttpResponse = require('http-response-object');
require('concat-stream');
require('then-request');
var JSON = require('./lib/json-buffer');

Function('', fs.readFileSync(require.resolve('./lib/worker.js'), 'utf8'));

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
