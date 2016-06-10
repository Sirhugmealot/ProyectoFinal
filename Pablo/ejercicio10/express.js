var express = require ('express'),
	server = express (),
	bodyParser=require('body-parser');

server.use(express.static('public')); //q tiene q instalar, q plugins/q hacer cuando crashea
//todos los archivos staticos los saca de public
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); 

/*server.get('/pepe', function (req, res, next) {
	console.log(req.query);
	var esta = {
		'cuelga':req.query.nombre,
		'llevame':'hehe',
		'cargame':'jejej'
	};

  res.send(esta);
}); //funciona en la api, postman, hace llamado por ajax*/

server.post('/pepe', function (req, res, next) {
	console.log('body', req.body);
	console.log('querystring',req.query);
	var esta = {
		'nombre':req.query.nombre,
		'email':req.query.email,
		'pass':req.query.pass
	};
	if (!req.body.nombre.length ||req.body.email.lenght || !req.body.pass.length){
		return res.send('campos vacios')
	} else {	
		if (req.body.nombre === 'pablo' && req.body.email === 'pab@pab.com' && req.body.pass === 'esta'){
			return res.send({
			usuarioCorrecto:'true',
			emailCorrecto:'true',
			passCorrecto:'true'
	});
	} else {  res.send(esta);}}
});





server.listen(3000,function(){
	console.log('ESTAN LISTO LOS CHORIS');
})