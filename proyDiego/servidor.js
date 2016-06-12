var express = require('express'),
	server = express(),
	bodyParser = require('body-parser'),

	user = {};

server.use(express.static('public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.put('/usuario/', function(req, res, next){

		user.id = req.body.id;
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.gender = req.body.gender;
		user.birthday = req.body.birthday;
		user.address = req.body.address;
		user.photo = req.body.photo;
		user.password = req.body.password;
		user.email = req.body.email;
		res.send(user);
	    return next();
});

server.get('/usuario/', function(req, res, next){
		res.send(user);
	    return next();
});

server.listen(8080, function(){
	console.log('escuchando en 8080...')
});
