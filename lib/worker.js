'use strict';

var concat = require('concat-stream');
var request = require('request');
var JSON = require('./json-buffer');
var iconv = require('iconv-lite');

function respond(data) {
  process.stdout.write(JSON.stringify(data), function() {
    process.exit(0);
  });
}

process.stdin.pipe(concat(function (stdin) {
	var req = JSON.parse(stdin.toString());
	var headers = {
		'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
		'accept':'text/html,application/xhtml+xml',
	};

	var options = {
		url : req.url,
		headers:headers,
		encoding : null,
	};
	request(options, function(error, res, body){
		var utf8_res = iconv.decode(res.body, 'GBK');
		respond({success: true, response:utf8_res});
	});
}));
