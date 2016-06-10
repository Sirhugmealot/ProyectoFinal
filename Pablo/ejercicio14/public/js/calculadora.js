var resultado;
var calcular = (function calc(){
	init();

	function tryParse(input){
		input = parseInt(input,10);
		if(isNaN(input)){
			throw 'Numero Invalido';
		}
		return input;
	}
	function sumar(input){
		input = tryParse(input);
		resultado += input;
		return resultado;
	}
	function restar(input){
		input = tryParse(input);
		resultado -= input;
		return resultado;
	}
	function dividir(input){
		input = tryParse(input);
		if (input===0){
			throw 'La chingaste, no se divide por cero';
		}
		resultado = resultado / input;
		return resultado;
	}
	function multi(input){
		input = tryParse(input);
		resultado *= input;
		return resultado;	
	}
	function clear(){
		init();
		return resultado;
	}
	function init(){
		resultado = 0;
	}
	function asignar(input){
		input = tryParse(input);
		resultado = input;
		return resultado;
	}
	function obtener(){
		return resultado
	}

	return {
		sumar:sumar,
		restar:restar,
		dividir:dividir,
		multi:multi,
		clear:clear,
		asignar:asignar,
		obtener:obtener
	}
})();

$(function(){
	var $form,
		inputNumero,
		operacion,
		concatenar,
		numerito;
	init();

	function init(){
		$form = $('.container');
		inputNumero = $form.find('.input');
		inicializar();
		$('.numero').on('click',onNumero);
		$('.operacion').on('click',onOperacion);
	}
	function onNumero(){
		var numero = $(this).html();
		if (concatenar){
			numero = parseInt(inputNumero.val() + numero, 10);
		}
		concatenar = true;
		inputNumero.val(numero);

		if(!operacion){
			calcular.asignar(numero);
			//numerito = numero;
		}
	}		
	function onOperacion(){
		var nueoperacion = $(this).data('operacion');
		concatenar = false;
		if(nueoperacion === 'clear'){
			return inicializar();
		}

		if (nueoperacion === 'igual'){
			if(operacion){
			var	dosresultado = calcular[operacion](numerito);
			inputNumero.val(dosresultado);
			console.log(dosresultado);
			}
			return ;
		}
		
		if(nueoperacion){
			numerito = parseInt(inputNumero.val(),10);
			operacion = nueoperacion;
			console.log(operacion);
		}
	}
	function inicializar(){
		inputNumero.val(calcular.clear());
		concatenar = true;
		operacion = null;
	}
});
/*
$(function(){
	var form = $('.container');
		form.find('#1').on('click',uno);
		form.find('#2').on('click',dos);
		form.find('#3').on('click',tres);
		form.find('#4').on('click',cuatro);
		form.find('#5').on('click',cinco);
		form.find('#6').on('click',seis);
		form.find('#7').on('click',siete);
		form.find('#8').on('click',ocho);
		form.find('#9').on('click',nueve);
		form.find('#0').on('click',cero);
		form.find('#mas').on('click',mas);
		form.find('#menos').on('click',menos);
		form.find('#por').on('click',por);
		form.find('#barra').on('click',barra);
		form.find('#igual').on('click',igual);
		form.find('#C').on('click',clear);
	
	function uno(){
		console.log(calcular.sumar(1));
		//console.log(resultado);
		
	}
	function dos(){
		
	}
	function tres(){
		
	}
	function cuatro(){
		
	}
	function cinco(){
		
	}
	function seis(){
		
	}
	function siete(){
	
	}
	function ocho(){
	
	}
	function nueve(){
		
	}
	function cero(){
		
	}
	function mas(){
		
	}
	function menos(){
		
	}
	function por(){
		
	}
	function barra(){
		
	}
	function igual(){

		
	}
	function clear(){
		
	}
	return false;
});*/
