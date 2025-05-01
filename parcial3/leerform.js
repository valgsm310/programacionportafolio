function leer() {

	//reefrencia por pseudoclase
	var nom=document.forms["formulario"].elements[0].value;
	//reerencia por id
	var clave=document.getElementById("pass").value;
	//rerencia por etiqueta
	var carrera1=document.getElementsByTagName("select")[0].value;
	//referencia por name
	var gen=document.getElementsByName("genero");
	var g,i;
	for(i=0; i<gen.length; i++){

		if(gen[i].checked){
			g=gen[i].value;
		}
	}

	//referencia por id
	var ok=document.getElementById("casilla").checked;
	
	document.getElementById("resultado").innerHTML="Tu nombre es:"+nom+
	"\<br>tu password es:"+clave+"\<br>Tu carrera es:"+carrera1+
	"\<br>Tu género es:"+g+"\<br>Aceptación de los acuerdos:"+ok;
	

}