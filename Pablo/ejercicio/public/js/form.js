$(function(){
	$('form input[type=submit]').on('click',onClick);
	

	/*function onClick(){
		$.get({ 
			url:'/pepe',
			
			data:{
				nombre:$('input[type=text]').val()
			},
			success: function(data){
				console.log(data);
			}

			});
			return false;
			} //forma mas facil de llamar a ajax*/

	function onClick(){
		$.ajax({ 
			url:'/pepe',
			method:'POST',
			data:{
				nombre:$('input[type=text]').val()
			},
			success: function(data){
				console.log(data);
			}

			});
			return false;
			}

	/*function onClick(){
		$.get(
			url:'/pepe',
			data:{nombre: $},
			success:function(data){
					console.log('respuesta del server',data);
			})};*/

	

	
});