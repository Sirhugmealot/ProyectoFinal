var iniciando = (function toDo(){
	var feerr = $('.container'),
		i=0;
	function init(){
		var templateContainer = $('#template');
		templateContainer.load('/template/todoestruct.html',function(){
		var	todolistadoooo = templateContainer.html();
			feerr.find('form').append(todolistadoooo);
			feerr.find('form').off('submit').on('submit', agregarTarea);
			
		});
		return false;
	}

	function agregarTarea(){

		var todo = feerr.find('#inpt1').val(),
			todo2= feerr.find('#inpt2').val();
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

	return {
		init:init,
		agregarTarea:agregarTarea,
		limpiarlo:limpiarlo
	}


})();

/*$(function(){
	iniciando.init();
});*/