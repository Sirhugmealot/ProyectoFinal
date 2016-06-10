var restify = require('restify');

var config = require('./config.js');

var usuarios = require('./users.js');

var server = restify.createServer({
	name: 'testServer'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

server.listen(config.server_port, config.server_ip,
function (){
	console.log('%s activo en %s',
		server.name, server.url
		)});

var HelloModel = function (req, res, next){
	res.send(200,'hola mundo');
	return next();
};

server.get({
	path:'/',
	version:'1.0.0'
}, HelloModel);

usuarios(server);