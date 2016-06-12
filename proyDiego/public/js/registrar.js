var editarXid = false;
var registrar = (function(){

	var $form;
	/***
	editarXid es para ver si
	creo un usuario o
	edito un usuario.

	cuando ejecuto levantarID, tengo el id
	de la persona que hice click en listar.html
	si tengo el id, la variable editarXid
	ya no es falso y tengo que ejecutar editarUsuario
	que esta en la linea 33

	PERO NO ME SALE :(
	lo dejo para mañ o el lunes
	***/
		init();
    function init(){
        $form = $('form');
        setupListeners();
        levantarID($form);
				console.log(editarXid);
    }

    function setupListeners(){
        $form.on('submit', onFormSubmit);
    }

    function onFormSubmit(e){
    	e.preventDefault();

        var data = serializar.getData($form);
						/*if(editarXid)
						{
							service.editarUsuario(editarXid, data);
						}
            else
						{
							service.crearUsuario(data);
						}*/
						service.crearUsuario(data);
            console.log(data);
    }

    function levantarID($form){
        $.get({

        url:'/usuario/',
        data:{
        },
            success: function(data){
                console.log('respuesta del server', data);

								editarXid = data.id;
                $form.find('#nom').val(data.firstName);
              	$form.find('#ape').val(data.lastName);
                $form.find('#sex').val(data.gender);
                $form.find('#fenac').val(data.birthday);
								$form.find('#dir').val(data.address);
								$form.find('#foto').val(data.photo);
								$form.find('#pass').val(data.password);
								$form.find('#email').val(data.email);
            }
        });
    }

}());

var serializar = (function(){

	function getData($form){
        var serializeData = $form.serializeArray();
        var registro = {};

        serializeData.forEach(function (keyValue){
            registro[keyValue.name] = keyValue.value;
        });

        return registro;
	}

	return{
		getData: getData
	}
}());

var service = (function(){

    function crearUsuario(user){
        $.ajax({
            url: 'https://connectedin.herokuapp.com/person',
            method: 'POST',
            data: JSON.stringify(user),
            contentType:'application/json'
        });
    }
		function editarUsuario(id, user){
			console.log(editarXid);
	    $.ajax({
	    url: 'https://connectedin.herokuapp.com/person/' + id,
	    method: 'PUT',
	    data: JSON.stringify(user),
	    contentType:'application/json'
	    })
		}

    return{
        crearUsuario: crearUsuario,
				editarUsuario: editarUsuario
    }
}());
