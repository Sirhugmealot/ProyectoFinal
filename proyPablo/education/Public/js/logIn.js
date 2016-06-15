var agregar = (function(){
	var form = $('.container');
	form.find('#logIn').off('click').on('click',logIn);
	

	function logIn(e){
		e.preventdefault;
		var userCre = '<button class="form-control" id="createUsers" type="button" class="btn">Create User</button>',
			userLis	= '<button class="form-control" id="listUsers" type="button" class="btn">List Users</button>',
			userNam = '<p>Hello %name%<p>',
			usuario = form.find('#user').val(),
			contrasena = form.find('#pass').val(),
			replaced = userNam.replace(/%name%/gi, usuario);
		form.find('#user').remove();
		form.find('#pass').remove();
		form.find('#logIn').remove();
		form.find('#crea').append(userCre);
		form.find('#list').append(userLis);
		form.find('#name').append(replaced);
		form.find('#createUsers').off('click').on('click',loadTemplate);
	}
	function loadTemplate(){
		var templateForm = $('#templatePlace');
		templateForm.load('/template/form.html',createUser);
	}

	function createUser(){
	 form.find('#continue').off('click').on('click',addUser);
	}


	function addUser(e){
		e.preventDefault();
		var user = {
		firstName: form.find('#nombre').val(), 
		lastName: form.find('#apellido').val(),
		gender: form.find('#sexo').val(),
		birthday: form.find('#edad').val(),
		address: form.find('#direcc').val(),
		photo: form.find('#foto').val(),
		email: form.find('#email').val()+'@gmail',
		password: form.find('#contra').val(),
		};
		console.log(user);
		$.ajax({ 
			url:'http://connectedin.herokuapp.com/person',
			method: 'POST',
			data: JSON.stringify(user),
			contentType: 'application/json',
			success: function(data){
				alert('User Added');
			}
		});
		return false;
	}	
})();