var express = require ('express'),
	server = express (),
	bodyParser=require('body-parser'),
	persona = [{
		id:1,
		nombre:'persona1',
		edad:'23',
		email:'persona1@persona.com'
	},
	{
		id:2,
		nombre:'persona2',
		edad:'23',
		email:'persona2@persona.com'
	},
	{
		id:3,
		nombre:'persona3',
		edad:'23',
		email:'persona3@persona.com'
	},
	{
		id:4,
		nombre:'persona4',
		edad:'23',
		email:'persona4@persona.com'
	},
	{
		id:5,
		nombre:'persona5',
		edad:'23',
		email:'persona5@persona.com'
	},


	];

server.use(express.static('public')); //q tiene q instalar, q plugins/q hacer cuando crashea
//todos los archivos staticos los saca de public
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); 

server.get('/persona/', function(req,res,next){ //listado completo
	res.send(200,persona);
	return next();
});

server.get('/persona/:id', function(req,res,next){ //listado individual
	var pers = req.params.id;
	
	if(pers){
		var	b=0,
			i=0;
		while (b==0 && i<persona.length){
			if(pers==persona[i].id){
				b=1;
				res.send(200,persona[i]);
			}
			else {
				i++;
			}
		}
		
	}
	else {res.send(404,'la cagaste mi wuen');}
	
	return next();
});

/*server.put('/persona/:id', function(req,res,next){
	var newId = req.params.id,
		newName = req.query.nombre,
		newAge = req.query.edad,
		newEmail = req.query.email;
	console.log(newId);
	console.log(newName);
	if(persona[newId]){
		persona[newId].nombre = newName;
		persona[newId].edad  = newAge;
		persona[newId].email = newEmail;
		res.status(200).send(persona[newId]);
	}
	else {res.send(404,'la cagaste mi wuen');}
	return next();
});*/

server.post('/persona', function(req,res,next){
	var id = persona.length;
	var user = {};
		user.id = id+1;
		user.nombre = req.body.nombre;
		user.edad = req.body.edad;
		user.email = req.body.email;
		persona.push(user);
		if (persona[id]){
			res.send(201,persona[id]);
		}

		else {res.send(404,'la cagaste mi wuen')}
		return next();
});

server.delete('/persona/:id',function(req,res,next){
	var pers = req.params.id;
	if(pers){
		var	b=0,
			i=0;
		while (b==0 && i<persona.length){
			if(pers==persona[i].id){
				b=1;
				persona.splice(i,1);
				res.send(202,'Usuario eliminado');
			}
			else {
				i++;
			}
		}
		
	}
	else {res.send(404,'la cagaste mi wuen');}
	
	return next();

});

/*server.post('/pepe', function (req, res, next) {
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
*/
server.listen(3000,function(){
	console.log('ESTAN LISTO LOS CHORIS');
})