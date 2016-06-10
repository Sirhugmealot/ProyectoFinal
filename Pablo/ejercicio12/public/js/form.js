//var ;
var botoooness,
	lissta;

$(function(){
	var form = $('container'),
		templateContainer = $('#template');
		templateContainer.load('/todo/todotemplate.html',function(){
			botoooness = templateContainer.html();
			$('.container').append(botoooness);
			$('#a1').on('click',fullList);
			$('#a2').on('click',oneList);
			$('#a3').on('click',addUser);
			$('#a4').on('click',removeUser);
			$('#a5').on('click',toDo);
			fullList();
});
		
		

		
		
function fullList(){
	$.get({
		url:'/persona',
		data:{
			id:'',
			nombre:'',
			edad:'',
			email:''
			},
		success: function(data){
			$('#ess').remove();
			$('.container').append('<div id="ess">'+'</div>');
			var templateCont = $('#ess2');
			templateCont.load('/todo/todolista.html',function(){
				lissta = templateCont.html();
				for(var i =0 ; i< data.length;i++){
					var replacing = lissta.replace(/%id%/g,data[i].id)
										.replace(/%nombre%/gi,data[i].nombre)
										.replace(/%edad%/gi,data[i].edad)
										.replace(/%email%/gi,data[i].email);
					$('#ess').append(replacing);
			}
			});
			
		
			}
		});
	return false;
}//cierra lista completa

function oneList(){
	$('#ess').remove();
	$('.container').append('<div id="ess" style="display:inline">'+'</div>');
	$('#subm').remove();
	$('#ess').append('<input id="inpt">'+'</input>'+'<button id="subm">'+'Search'+'</button>');
	

	$('#subm').off('click').on('click',function(){
		

		var entra = $('#inpt').val();
			$('#ess').remove();
			$('.container').append('<div id="ess">'+'</div>');
			$.get({
			url:'/persona/' + entra,
			data:{
				id: entra,
				nombre:'',
				edad:'',
				email:''
			},
			success: creando
			}).fail(function() {
				alert('la has cagado');
			});
	});
	return false;
} //cierra lista singular


function addUser(){
	reduccion();
	$('#subm').off('click').on('click',function(){
		var user = {};
			user.nombre = $('#inpt1').val();
			user.edad = $('#inpt2').val();
			user.email = $('#inpt3').val();
		$.post({ 
			url:'/persona',
			data:{
				id:'',
				nombre:user.nombre,
				edad:user.edad,
				email:user.email
				},
			success: function(data){
				reduccion();
				$('#ess').append('<br><br><span id="">'+'User Added'+'</span>');
			}
		});
	}); 
	return false;
} //cierra agregar usuario


function removeUser(){
	$('#ess').remove();
	$('.container').append('<div id="ess" style="display:inline">'+'</div>');
	$('#subm').remove();
	$('#ess').append('<input id="inpt">'+'</input>' + '<button id="subm">'+'Remove'+'</button>');
	

	$('#subm').off('click').on('click',function(){
		var entra = $('#inpt').val();
			$('#ess').remove();
			$('.container').append('<div id="ess">'+'</div>');

			$.ajax({
			url:'/persona/' + entra,
			method: 'DELETE',
			data:{
				id: entra,
				nombre:'',
				edad:'',
				email:''
			},
			success: function(){
				$('#ess').append('<br><br><span id="">'+'User Removed'+'</span>');
			}
			}).fail(function() {
				alert('la has cagado');
			});
	});
	return false;
} //cierra eliminar usuario


function reduccion(){
	var completeando = 	'<br><p>'+'Nombre:'+'</p><input id="inpt1">'+'</input>' +
						'<br><p>'+'Edad:'+'</p><input id="inpt2">'+'</input>' +
						'<br><p>'+'Email:'+'</p><input id="inpt3">'+'</input>' +
						'<br><button id="subm">'+'Add User'+'</button>' ;
	$('#ess').remove();
	$('.container').append('<div class="div" id="ess">'+'</div>');
	$('#ess').append(completeando);
} //cierra bloque de quitar y agregar 

function toDo(){
	var i =0,
		todolistadoooo =	'<p>TODO List</p><input id="inpt1" type="text" name="inpt1" />'+
							'<p>TODO Date</p><input id="inpt2" type="date" name="inpt2" />'+
							'<button type="submit" style="display:none">save</button>'	;
	$('#ess').remove();
	$('.container').append('<div id="ess">'+'</div>');
	$('#ess').append('<form>'+'</form>');
	$('form').append(todolistadoooo);
	$('form').off('submit').on('submit', agregarTarea);
		
	function agregarTarea(){

		var todo = $('#inpt1').val(),
			todo2= $('#inpt2').val();
		i++;
		var booton='<br><span id="todolisto'+i+'">%name%<br>%date%</span>'+
		'<button id="borrar'+i+'">'+'X'+'</button>';
		$('#ess').append('<div class="essas" id="jss'+i+'">'+'</div');
		var replaced = booton.replace(/%name%/gi, todo)
						 	.replace(/%date%/g, todo2);
		//replaces siempre devuele algo y se debe mostrar o guardar
		$('#jss'+i).append(replaced);
		$('#borrar'+i).attr('data-id', i).off('click').on('click', limpiarlo);
		return false;
	}

	function limpiarlo(){
		var iNUEVO = $(this).attr('data-id');
		$('#jss'+iNUEVO).remove();	 
	}	
}	

function creando(data){
    $('#ess').append('<li>' + data.id + '</li>');
    $('#ess').append('<li>' + data.nombre + '</li>');
    $('#ess').append('<li>' + data.edad + '</li>');
    $('#ess').append('<li>' + data.email + '</li>'+'<br>');			
}

});