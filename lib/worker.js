'use strict';

var concat = require('concat-stream');
var request = require('request');
var JSON = require('./json-buffer');

function respond(data) {
	process.stdout.write(JSON.stringify(data), function() {
	process.exit(0);
	});
}

process.stdin.pipe(concat(function (stdin) {
	var req = JSON.parse(stdin.toString());
	var options = {
url : req.url,
headers : req.options.headers || {},
encoding : req.options.encoding || null,
timeout: req.options.timeout || 2000,
};

request(options, function(error, res, body){
	if(req.options.encode == 'gbk'){
	var iconv = require('iconv-lite');
	var content = res.body;
	content = iconv.decode(content, 'GBK');
	}else{
	var content = body;
	}
	respond({success: true, response:content});
	});
}));
