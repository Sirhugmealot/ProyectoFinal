var express = require ('express'),
	server = express (),
	bodyParser=require('body-parser'),
	persona = [],
	idgen = persona.length+1;
	
server.use(express.static('public')); //q tiene q instalar, q plugins/q hacer cuando crashea
//todos los archivos staticos los saca de public
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); 

server.get('/connectedin.herokuapp.com/person', function(req,res,next){ //listado completo
	res.send(200,persona);
	return next();
});

/*server.get('/persona/:id', function(req,res,next){ //listado individual
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
});*/

server.put('connectedin.herokuapp.com/person/:id', function(req,res,next){
var newId = req.params.id,
	newName = req.body.nombre,
	newLast = req.body.apellido,
	newGender = req.body.sexo,
	newBirth = req.body.fecha,
	newAddr = req.body.direcc,
	newPhoto = req.body.foto,
	newEmail = req.body.email,
	newPass = req.body.contra,
	newEdu = req.body.educ,
	newExp = req.body.exp;
var	b=0,
	i=0;
	if(persona.newId){
		while (b==0 && i<persona.length){
			if(newId==persona[i].id){
				b=1;
				persona[i].firstName = newName;
				persona[i].edad = newAge;
				persona[i].apellido = newLast;
				persona[i].sexo = newGender;
				persona[i].fecha = newBirth;
				persona[i].direcc = newAddr;
				persona[i].foto = newPhoto;
				persona[i].email = newEmail;
				persona[i].contra = newPass;
				persona[i].educ = newEdu;
				persona[i].exp = newExp;
				res.status(200).send(persona[i]);
			}
			else i++;
		}
	}
			else {res.send(404,'la cagaste mi wuen');}
	return next();
});

/*server.post('/connectedin.herokuapp.com/person', function(req,res,next){
	var id = persona.length;
	var user = {};
		user.id = idgen++;
		user.nombre = req.body.nombre;
		user.edad = req.body.edad;
		user.email = req.body.email;
		user.sexo = req.body.sexo;
		persona.push(user);
		if (persona[id]){
			res.send(201,persona[id]);
		}

		else {res.send(404,'la cagaste mi wuen')}
		return next();
});*/

/*server.delete('/persona/:id',function(req,res,next){
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

});*/

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