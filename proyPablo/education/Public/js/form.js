//var ;
var todo,
	id,
	educc=[],
	users=[];

$(function(){
	var form = $('container'),
		i=-1,
		templateContainer = $('#template');
		templateContainer.load('/todo/todotemplate.html',function(){
			botoooness = templateContainer.html();
			leBase();
			
			
});
function leBase(){
	
	var paramstr = window.location.search.substr(1);
		var paramarr = paramstr.split ("=");
		var param;

		param = paramarr[1];
		id=param;

	form.append('<div id="ess">'+'</div>');
	$('#ess').append('<form id="avv">'+'</form>');
	getId(id);
	
}

function getId(id){
	$.ajax({
		url:'http://connectedin.herokuapp.com/person/'+id,
		method:'GET',
		contentType: 'application/json',
		success:function(data){
			var l,
				summary={},
				b;

				users = data.education;
				summary = users;
			console.log(data.education.length);
			for (var i = 0; i<summary.length;i++) {
				$('#avv').append('<br>');
				b=0;
				l=1;
				while(summary[i].edu2[l]){
					if(b==0){
						b=1;
						$('#avv').append('<br>'+summary[i].edu1);

					}
					else{  
						var booton='<br><span id="todolisto">'+summary[i].edu2[l]+'</span>';
						$('#avv').append(booton);
					l++;
					}
				}
			}
		}
	});
	toDo();
}

function toDo(){
	var i =0,
		todolistadoooo =	'<h3>Education</h3>'+'<input id="title"/>'+
							'<textarea id="inpt1" type="text" name="inpt1" />'+
							'<br><button type="submit">save</button>';
	$('form').append(todolistadoooo);
	$('form').off('submit').on('submit', agregarTarea);
		
	function agregarTarea(){
		var title = $('#title').val(),
			educationa={},
			summary={},
			todo = $('#inpt1').val().split('\n'); // variable a guardar
			//summary[0] = title;
			console.log(educc, educationa, todo);


		if(todo && title){
			if(todo[0]!="" && title!=""){
				if(todo.length!=0){
					// Muestro el education
					for(var j=0;j<todo.length;j++){
						summary[j+1]=todo[j];
						var booton='<br><span>'+todo[j]+'</span>';
						$('#ess').append('<div id="jss">'+'</div');
						if(j==0){
							jss=$('#jss');
							//jss.append('<br>'+title);
							
						}
						//jss.append(booton);
					}	
					educationa.edu2=summary;
					educationa.edu1=title;
					educc.push(educationa);

					var user={education:educc};
					console.log(educc, educationa, todo);
					$.ajax({ 
						url:'http://connectedin.herokuapp.com/person/'+id,
						method: 'PUT',
						data: JSON.stringify(user),
						contentType: 'application/json',
						success: function(data){
							alert('User Added');
						}
					});


				}			
			}
		}

		return false;
	}

}	



});