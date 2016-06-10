function parafor () {
		    console.log("ready sir!");
		    
		    var vectoris = [1,2,3,4,5,6];
			var suma;
			suma =0;

			for (var i=0 ; i<vectoris.length; i++) {
			 suma += vectoris[i];}	
			 console.log("la suma para for es: ",suma);

		    };
function parawhile (){
			var vectoris = [1,2,3,4,5,6];
			var suma;
			suma =0;
			var i=0;

			while (i<vectoris.length) {
			suma += vectoris[i];
			i++;}	
			 console.log("la suma para while es: ",suma);
};
var suma;
function meer(array,index,suma){
	suma+=array[index];
	index--;
	if (index>=0) {return meer(array,index,suma);}
		else	{return suma;}
};
function recursivo(){
			var vectoris = [1,2,3,4,5,6];
			var suma=0;
			var i=vectoris.length;
			i--;
			suma = meer(vectoris,i,suma);
			console.log("la suma por recursividad es: ",suma);
};
	
parafor();
parawhile();
recursivo();