var loadUser = (function (){
	
	init();

	function init(){
		var userId;
		userId = getParams();
	}

	function getParams (){ // Obtengo el id de login.html
		var paramstr = window.location.search.substr(1);
		var paramarr = paramstr.split ("&");
		var param;

		param = paramarr[1];
		return param;
	}

	return{
		init: init
	}

}());

$(function(){

  loadUser.init();
})