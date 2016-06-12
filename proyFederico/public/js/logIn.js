var agregar = (function(){
	var dataUser = $('.header'),
		form = $('.container'),
		inval = dataUser.find('#inval'),
		contr = dataUser.find('#passin'),
		usuar = dataUser.find('#usuar'),
		usuario,
		contrasena;

	dataUser.find('#logIn').off('click').on('click',logIn); //Pongo en escucha los botones del admin
	
	function logIn(e){
		e.preventdefault;
		usuario = dataUser.find('#user').val();
		contrasena = dataUser.find('#pass').val();
		$.ajax({
			url:'http://connectedin.herokuapp.com/person',
			method: 'GET',
			success: function(data){
				if(usuario && contrasena){ //validacion del login
					var	b=0,
						i=0;
					while (b==0 && i<data.length){
						if (usuario==data[i].email) {
							if(contrasena==data[i].password){
								b=1;
								createAdminButtons();
							}
							else { //Usuario o Contraseña incorrectos
								i++;
								usuar.css("display","none");
								contr.css("display", "none");
								inval.css("display","block");
							}
						}
						else{ //Usuario o Contraseña incorrectos
							i++;
							usuar.css("display","none");
							contr.css("display", "none");
							inval.css("display","block");	
						}
					}
				}
				else{
					if(usuario){ // Si hay usuario, falta poner password
						contr.css("display", "block");
						usuar.css("display","none");
					}
					else{	//Si no hay usuario, falta poner usuario
						contr.css("display", "none");
						usuar.css("display","block");
					}
					inval.css("display","none");
				}
			}
		});
	}

	function createAdminButtons(){
		usuar.css("display","none");
		contr.css("display","none");
		inval.css("display","none");
		

		var userCre = '<button class="form-control" id="createUsers" type="button" class="btn">Create User</button>',
			userLis	= '<button class="form-control" id="listUsers" type="button" class="btn">List Users</button>',
			userNam = '<p>Hello %name%<p>',
			usuario = dataUser.find('#user').val(),
			contrasena = dataUser.find('#pass').val(),
			replaced = userNam.replace(/%name%/gi, usuario);

		dataUser.find('#crea').html(userCre);
		dataUser.find('#list').html(userLis);
		dataUser.find('#name').html(replaced);
		dataUser.find('#createUsers').off('click').on('click',loadTemplate);
	}

	function loadTemplate(){
		var templateForm = $('#templatePlace');
		templateForm.load('/template/form.html',createListeners);
	}

	function createListeners(){
	 form.find('#continue').off('click').on('click',addUser);
	 form.find('#back').off('click').on('click',deleteForm);
	}


	function addUser(e){ // Boton Continue del  Form (POST)
		e.preventDefault();
		
		var user = {
		firstName: form.find('#nombre').val(), 
		lastName: form.find('#apellido').val(),
		gender: form.find('#sexo:checked').val(),
		birthday: form.find('#edad').val(),
		address: form.find('#direcc').val(),
		photo: form.find('#foto').val(),
		email: form.find('#email').val()+'@gmail',
		password: form.find('#contra').val(),
		};

		console.log(user); // Mostrar usuario en consola

		$.ajax({ 
			url:'http://connectedin.herokuapp.com/person',
			method: 'POST',
			data: JSON.stringify(user),
			contentType: 'application/json',
			success: function(data){
				$('#formulario').trigger("reset"); // Limpio formulario
				alert('User Added');
			}
		});//POST
		

		return false;
	}

	function deleteForm(){ //Boton Back del Form
		$('#templatePlace').html('<div id="templatePlace"></div>');
	}

})();