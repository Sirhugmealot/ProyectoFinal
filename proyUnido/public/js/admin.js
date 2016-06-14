var form = (function(){
    var templateForm = $('#divtabla');
    var form = $('.container');

    function loadTemplate(){
    	form.find('#divtabla').load('/templates/form.html',createListeners);
    }

    function createListeners(){
		form.find('#continue').off('click').on('click',service.addUser);
 		form.find('#back').off('click').on('click',deleteForm);
	}

	function deleteForm(){ //Boton Back del Form
		$('#divtabla').html('<div class="wrap" id="divtabla"></div>');
	}
    
   	return{
   		loadTemplate: loadTemplate,
   	}
})();


var list = (function(){
    var container = $('.container'),
    	templateForm = $('#divtabla');

	var filacero,
        filadatos;
        tablafin = '</table>';
        

	function init(){
		container.find(templateForm).load('/templates/filacero.html', function(){
	    filacero = container.find(templateForm).html();
	    });

	    container.find(templateForm).load('/templates/filadatos.html', function(){
	    filadatos = container.find(templateForm).html();
	    });
	} 
    
    function crearTablaYFilaCero(){
        var tablaini = '<table id="tabla" class="pure-table tabla margen-arriba">'+
        				'<thead></thead>'+
        				'<tbody></tbody>'+
        				'</table>';

        return tablaini += filacero;
    }

    function filaDatos(){
        return filadatos;
    }
        
    function crearTablaYFilaCero(){
        var tablaini = '<table id="tabla" class="pure-table tabla margen-arriba">';
        
        return tablaini += filacero;
    }
    
    function construirPersonaHTML(cadenaHTML, persona){
    	var fechaObject = new Date(persona.birthday);
    	var mes = fechaObject.getMonth() + 1;
    	var fechaString = fechaObject.getUTCDate() + " / " + 0+mes + " / " + fechaObject.getFullYear();
    	

    	var gender = persona.gender;

    	if(gender == 'F'){
    		gender = 'Female';
    	}
    	else{
    		gender = 'Male';
    	}

    	return cadenaHTML
                      .replace(/%id%/g, persona._id)
                      .replace(/%Nombre%/g, persona.firstName)
                      .replace(/%Apellido%/g, persona.lastName)
                      .replace(/%Sexo%/g, gender)
                      .replace(/%Fecha Nac%/g, 0+fechaString)
                      .replace(/%Direccion%/g, persona.address)
                      .replace(/%Foto%/g, persona.photo)
                      .replace(/%Contraseña%/g, persona.password)
                      .replace(/%Email%/g, persona.email);
    }

   return{
   		init: init,
   		crearTablaYFilaCero: crearTablaYFilaCero,
        construirPersonaHTML: construirPersonaHTML,
        filaDatos: filaDatos
    }
   	
})();

var service = (function(){
	var form = $('.container'),
	    adminButtons = $('.header'),
		columna = $('.col-info');

	function addUser(e){ // Boton Continue del  Form (POST)
		e.preventDefault();
		
		var user = {
		firstName: form.find('#nombre').val(), 
		lastName: form.find('#apellido').val(),
		gender: form.find('#sexo:checked').val(),
		birthday: form.find('#edad').val(),
		address: form.find('#direcc').val(),
		photo: form.find('#foto').val(),
		email: form.find('#email').val()+'@gmail.com',
		password: form.find('#contra').val(),
		};
		console.log(user); // Mostrar usuario en consola
		if(form.find('#contra').val()==form.find('#contra2').val()){
			$.ajax({ 
				url:'http://connectedin.herokuapp.com/person',
				method: 'POST',
				data: JSON.stringify(user),
				contentType: 'application/json',
				success: function(data){
					$('#formulario').trigger("reset"); // Limpio formulario
					alert('User Added');
				},
				error: function(data){
					alert('Check the info');
				}
			});//POST	
		}
		else{
			alert('Mismatch Password');
		}
		return false;
	}

	function getUser(userId){
		$.ajax({
            url: 'https://connectedin.herokuapp.com/person/'+userId,
            method: 'GET',
            contentType:'application/json',
            success: function(data){            	
				$.get("/templates/userData.html", function (r){
					var columnaData;
            		var html;

					columnaData = r;

					html = list.construirPersonaHTML(columnaData, data); // reemplazo los token
            		columna.html(html); // Columna en string


            		var userNam = '<p>Hello %name%</p>';
            		var replaced = userNam.replace(/%name%/gi, data.firstName);
					adminButtons.find('#name').html(replaced);	// Muesto el nombre

					$('.container .col-info').find('#editButton').off('click').on('click', function(){
       						   alert('asd');
            		});
				}); 
            }
        });
	}

	function listUsers(){
        $.ajax({
            url: 'https://connectedin.herokuapp.com/person',
            method: 'GET',
            contentType:'application/json',

            success: function(data){
                var tam = data.length;
                $('.tabla').remove();
                var tablaini = list.crearTablaYFilaCero();

                for(var i = 0 ; i < tam ; i++){
                    tablaini += list.construirPersonaHTML(list.filaDatos(), data[i]);
                }

                tablaini += tablafin;
                $('#divtabla').html(tablaini);
            }
        });
	} 
            

    return{
    	getUser: getUser,
    	addUser: addUser,
    	listUsers: listUsers
    }

})();

var admin = (function(){
	var adminButtons = $('.header');

	init();

	function init(){
		var form = $('.container'),
			colData = $('.col-info');
			
		var userId = getParams();
	
		service.getUser(userId); // cargar usuario

		$('.col-icons').find('#aboutMe').on('click', function(){
			alert(parapatin);
		})

		adminButtons.find('#createUsers').off('click').on('click',create);
		adminButtons.find('#listUsers').off('click').on('click',lista);
	}

	function getParams (){
		var paramstr = window.location.search.substr(1);
		var paramarr = paramstr.split ("&");
		var param;

		param = paramarr[1];
		return param;
	}

	function create (e){
		e.preventDefault();
		form.loadTemplate();
	}

	function lista (e){
		e.preventDefault();
		list.init();
		service.listUsers();
	}

})();


