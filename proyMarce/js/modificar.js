(function(){

	var paramstr = window.location.search.substr(1);
	var paramarr = paramstr.split ("&");
	var params = {};

	for (var i = 0; i < paramarr.length; i++) {
		var tmparr = paramarr[i].split("=");
		params[tmparr[0]] = tmparr[1];
	}

	console.log(params['dataid']);
	$('#firstName').val(params['firstname']);
	$('#lastName').val(params['lastname']);
	$('').val(params['gender']);
	$('#birthday').val(params['birthday']);
	$('#address').val(params['address']);
	$('#photo').val(params['photo']);
	$('#email').val(params['email']);
	$('#password').val(params['password']);

})();