var agregar = (function(){
	var form = $('.container');
	$('#aa').off('click').on('click',addUser);
	$('#bb').off('click').on('click',fullList);

	function fullList() {
		$.ajax({
			url:'http://connectedin.herokuapp.com/person',
			method:'GET',
			success: function(data){
				var myDiv = '<table id="jojojo">' + '<tr>' + 
							'<th> ID </th>' +
							'<th> First Name </th>' +
							'<th> Last Name </th>' +
							'<th> Gender </th>' +
							'<th> Birthday </th>' +
							'<th> Address </th>' +
							'<th> Photo </th>' +
							'<th> Email </th>' +
							'<th> Password </th>' +
							'<th> Education </th>' +
							'<th> Experience </th>' +
							'<th> Modifications </th>' +
							'</tr>';
				form.find('#jejeje').append(myDiv);
				for(var i =0 ; i< data.length;i++){
					var replacing = '<tr>' + '<td>' + data[i]._id + '</td>' + 
									'<td>' + data[i].firstName + '</td>' + 
									'<td>' + data[i].lastName + '</td>' + 
									'<td>' + data[i].gender + '</td>' + 
									'<td>' + data[i].birthday + '</td>' + 
									'<td>' + data[i].address + '</td>' + 
									'<td>' + data[i].photo + '</td>' + 
									'<td>' + data[i].email + '</td>' + 
									'<td>' + data[i].password + '</td>' + 
									'<td>' + data[i].education + '</td>' + 
									'<td>' + data[i].experience + '</td>' + 
									'<td>' + '<button id="'+i+'" class="btn btn-danger">Modify</button>' + '</td>'
									'</tr>';
					
					form.find("#jojojo").append(replacing);
					form.find('#'+i).attr('data-id', i).off('click').on('click',function(){
	 					var iN = $(this).attr('data-id');
						console.log(iN);
						var user = {
							firstName: form.find('#nombre').val(), 
							lastName: form.find('#apellido').val(),
							gender: form.find('#sexo').val(),
							birthday: form.find('#edad').val(),
							address: form.find('#direcc').val(),
							photo: form.find('#foto').val(),
							email: form.find('#email').val()+'@gmail',
							password: form.find('#contra').val(),
							education: form.find('#educ').val(),
							experience: form.find('#exp').val()
						};
						$.ajax({
		 					url:'http://connectedin.herokuapp.com/person/'+data[iN]._id,
		 					method: 'PUT',
		 					data: JSON.stringify(user),
							contentType: 'application/json',
							success: function(data){
								alert('User Modified');
							}
						});
					});
				}
				form.find("#jejeje").append('</table>');
			}
		});
		return false;
	}//cierra lista completa

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
		education: form.find('#educ').val(),
		experience: form.find('#exp').val()
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
	}; 
	 //cierra agregar usuario

}());