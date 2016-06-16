var express = require('express'),
	server = express(),
	bodyParser = require('body-parser'),
	personas = [];

server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});