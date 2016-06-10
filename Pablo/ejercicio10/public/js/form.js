$(function(){
	var form = $('form'),
		nombre = form.find('input[type=text]'),
		email = form.find('input[type=email]'),
		pass = form.find('input[type=password]');

	form 
		.find('input[type=submit]')
		.on('click',onClick);

	

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
	function validateEmail(email) {
    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
		}


	function onClick(){
		if (!nombre.val().length){ //val().length o .lenght
		nombre.parents('.form-group').addClass('required');
		}
		else {nombre.parents('.form-group').removeClass('required');
		}
		if(nombre.val().length && nombre.val().length < 3){
            nombre.parents('.form-group').addClass('invalid');
        }
        else{
            nombre.parents('.form-group').removeClass('invalid');
        }
        
        if(nombre.parents('.form-group.required, .form-group.invalid').length){
            nombre.parents('.form-group').addClass('has-error');
        }
        else{
            nombre.parents('.form-group').removeClass('has-error');            
        }

        if (!email.val().length){ //val().length o .lenght
		email.parents('.form-group').addClass('required');
		}
		else {email.parents('.form-group').removeClass('required');
		}
		if(!validateEmail(email.val())){
            email.parents('.form-group').addClass('invalid');
        }
        else{
        	email.parents('.form-group').removeClass('invalid');
        }
        
        if(email.parents('.form-group.required, .form-group.invalid').length){
            email.parents('.form-group').addClass('has-error');
        }
        else{
        	email.parents('.form-group').removeClass('has-error');            
        }


        if(!pass.val().length){
            pass.parents('.form-group').addClass('has-error required');
        }
        else{
            pass.parents('.form-group').removeClass('has-error required');            
        }

        if(form.find('.has-error').length){            
            return false;
        }

		$.ajax({ 
			url:'/pepe',
			method:'POST',
			data:{
				nombre:form.find('input[type=text]').val(),
				email:form.find('input[type=email]').val(),
				pass:form.find('input[type=password]').val()
			},
			success: function(data){
				console.log(data);
			}

			});
			return false;
			}

	

	
});