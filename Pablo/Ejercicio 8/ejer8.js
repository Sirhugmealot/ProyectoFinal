var text = {"nombre":"Pablo Pirovano Varela", "job":"Freelance Procrastinator", "casa":"Castelar, Buenos Aires, ARG"};
//var json = {'nombre': ''}//
$($('h1')[0]).html(text.nombre);
$($('h3')[0]).html(text.job);
$($('p')[0]).html(text.casa);


var laburo ={
	'nombre':'pepe',
	'mees':['jjjfkj','nnnfkkkf'],
	'trabajos':[
	{'lugar':'este', 'tiempo':'2003'},
	{'lugar':'alla','tiempo':'10036'}
]};

var div1 = $('<div></div>');
var h2 = $('<h2></h2>');
h2.html(laburo.trabajos[0].lugar);
div1.append(h2);


//$('#prue').append('<div><h1>'+laburo.trabajos[1].lugar+'</h1></div>');

/*$.each(laburo, function (key, tiempo) {
    console.log(key)
    $.each(tiempo, function (index, tiempo) {
        $('#prue').append('<div><h1>'+laburo.trabajos.lugar+'</h1></div>');
    })
})*/
$.each(laburo, function(key,value){
	if (typeof value == 'string'){
		$('#'+key).html(value);
	}else{
		var ul=$('<ul></ul>');
		$.each(value,function(key,value){
		if (typeof value == 'string'){
			var li =$('<li></li>');
			li.html(value);
			ul.append(li);
		}});
	$('#'+key).append(ul);
	}
});

$.getJSON('cv.json', function (gee){
	console.log(gee);});
