(function(){

	var $mostrador;

	$('.mostrar').on('click', function(e){
		e.preventDefault();
		$('.mostrador tbody').empty();
		$.get({
			url: 'http://connectedin.herokuapp.com/person',
			success: personas
		});
	});

	function personas(data){
		$mostrador = $('.mostrador tbody');

		trs = data.map(function(user){
			return getPersonasHtml(user);
		});

		$mostrador.append(trs.join(""))
	}

	function getPersonasHtml(data){
		var cadenaHtml =
			'<tr>'+ 
				'<td>' + '%data%' + '</td>' + 
				'<td>' + '%firstname%' + '</td>' +
				'<td>' + '%lastname%' + '</td>' +
				'<td>' + '%gender%' + '</td>' +
				'<td>' + '%birthday%' + '</td>' + 
				'<td>' + '%address%' + '</td>' +
				'<td>' + '%photo%' + '</td>' +
				'<td>' + '%email%' + '</td>' +
				'<td>' + '%password%' + '</td>' +
				'<td>' + '<button type="submit" class="btn btn-danger modificar" data-id="%data%" data-firstname="%firstname%" data-lastname="%lastname%" data-gender="%gender%" data-birthday="%birthday%" data-address="%address%" data-photo="%photo%" data-email="%email%" data-password="%password%">' + 'Modificar' + '</button>' + '</td>' +
			'</tr>';
		return cadenaHtml
			.replace(/%data%/g, data._id)
			.replace(/%firstname%/g, data.firstName)
			.replace(/%lastname%/g, data.lastName)
			.replace(/%gender%/g, data.gender)
			.replace(/%birthday%/g, data.birthday)
			.replace(/%address%/g, data.address)
			.replace(/%photo%/g, data.photo)
			.replace(/%email%/g, data.email)
			.replace(/%password%/g, data.password);
	}

	$('.container').on('click', '.modificar', function(e){
		
		e.preventDefault();
		
		var dataid = $(this).attr("data-id"),
			firstname = $(this).attr("data-firstname"),
			lastname = $(this).attr("data-lastname"),
			gender = $(this).attr("data-gender"),
			birthday = $(this).attr("data-birthday"),
			address = $(this).attr("data-address"),
			photo = $(this).attr("data-photo"),
			email = $(this).attr("data-email"),
			password = $(this).attr("data-password");
			
		success:
			window.location="../modificar/index.html?dataid="+dataid+"&firstname="+firstname+"&lastname="+lastname+"&gender="+gender+"&birthday="+birthday+"&address="+address+"&photo="+photo+"&email="+email+"&password="+password;
	});

})();