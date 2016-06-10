module.exports = function(server){ //siempre module.exports
	var UsersModel = function(){
		var usuarios = [
		{
			name:'pablo',
			email:'pablo@pirovano.me',
			comment:''
		},{
			name:'agustin',
			email:'agustin.diaz@gl.com',
			comment:''
		}];
		this.getUser = function(req,res,next){ //leer
			var userId = req.params.id;
			if (usuarios[userId]){
				res.send(200, usuarios[userId]); //devuelve el usuario si encuentra un usuario
			}
			else {res.send(404,'la cagaste mi wuen')}
			return next();
		}

		this.editUser = function(req, res, next){ //modificar
			var userId = req.params.id,
				newName = req.params.name;
				if (usuarios[userId]){
					usuarios[userId].name = newName; //modifica el nombre del usuario
				res.send(200, usuarios[userId]); //devuelve el usuario si encuentra un usuario
			}
			else {res.send(404,'la cagaste mi wuen')}
			return next();
		}

		this.addUser = function(req, res, next){ //añadir
			var user = {};
       			user.name = req.params.name;
       			user.email = req.params.email;
       
      			usuarios.push(user);

      			var id = usuarios.length - 1; //el ultimo elemento del array
      			if (usuarios[id]){
      				res.send(201,usuarios[id]);
      		}
      		else {res.send(404,'la cagaste mi wuen')}
			return next();
		}

		this.deleteUser = function(req, res, next){ //añadir
			var userId = req.params.id;
       			
      			if (usuarios[userId]){
      				delete(usuarios[userId]);
      				usuarios = usuarios.filter( function(usuarios) { return !!usuarios; });
       				res.send(200,'elemento eliminado');
      		}
      		else {res.send(404,'la cagaste mi wuen')}
			return next();
		}

		this.commentUser = function(req, res, next){ //modificar
			var userId = req.params.id,
				newComment = req.params.comment;
				if (usuarios[userId]){
					usuarios[userId].comment = newComment; //agrega comentario
				res.send(200, usuarios[userId]); //devuelve el usuario
			}
			else {res.send(404,'la cagaste mi wuen')}
			return next();
		}
		this.allUser = function(req,res,next){ //leer
			res.send(200, usuarios); //devuelve el usuario si encuentra un usuario
			return next();
		}


	};
	var User = new UsersModel();
	server.get({
		path: '/users/:id',
		version:'1.0.0'
	}, User.getUser);

	server.get({
		path: '/users',
		version:'1.0.0'
	}, User.allUser);

	 server.post({
        path: '/users/:id',
        version:'1.0.0'
    }, User.addUser);

	server.del({
		path: '/users/:id',
		version:'1.0.0'
	}, User.deleteUser);

	server.put({
		path: '/users/:id',
		version:'1.0.0'
	}, User.editUser);

	server.put({
		path: '/com/:id',
		version:'1.0.0'
	}, User.commentUser);
};

