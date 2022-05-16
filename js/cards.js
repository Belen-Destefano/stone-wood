// accedo a nodos: -Del boton de cada cuarto, -de donde va a ir los Datos buscados en index, y -donde va a ir precio del cuarto seleccionado y monto final.


const btns = document.querySelectorAll(".btn-room"); //querySelectorAll x que agarra TODOS los botones en forma de arreglo, junto con todos los nodos dentro de el //
const cardRoom = document.querySelector("#cardRoom");
const listaDatos = document.querySelector("#lista-Datos");


// declaro checkin checkout como variables globales vacias y array arrayHabitacion vacio tmb
let checkIn 
let checkOut
let arrayHabitacion = [];


//////////////////////////////////////////////////////////////////////////////////////////////////
//PENDIENTES QUE QUEDARON DEL INDEX.HTML. NEXO ENTRE INDEX.HTML Y RESERVA.HTML

// Recupero array del SessionStorage. Si sessionStorage está vacío, la variable se inicializa con un array vacío
let arrayDatos = JSON.parse(sessionStorage.getItem("Reserva")) || [];


// Si el arrayDatos del index ya contiene Datos, los imprimimo en reserva.html 
arrayDatos.length && console.log("DATOS DE RESERVA");
console.log(arrayDatos);imprimirDatos(arrayDatos); checkIn= arrayDatos[0].checkin;
checkOut= arrayDatos[0].checkout;	


// funcion para imprimir la lista de Datos de la busqueda del HTML
function imprimirDatos(array) {
 
	listaDatos.innerHTML = "";
	array.forEach((Dato) => {

    let cardDato  = document.createElement("div");
    cardDato.innerHTML=
		`<div class="card animacion">
			
			<div class="card-header">
			<h3 class="title is-5 has-text-light block">TU BUSQUEDA</h2>
			</div>		
			<br>
			<div class="content">
				<ul>
	
					<li class="lista-card">Check-In: ${Dato.checkin}</li>
					<li class="lista-card">Check-Out: ${Dato.checkout}</li>
					<li class="lista-card">Huespedes: ${Dato.huespedes}</li>
          <li class="lista-card"><a href="../index.html"> Elegir otra fecha </a></li>
          
				</ul>				
        
			</div>			
      
			
    	</div> <br>`;
		
    listaDatos.appendChild (cardDato);
    

	});
}
////////////////////////////////////////////////JS DE RESERVA.HTML

// recorro nodo boton que agarre en linea 4 Y le agrego evento click   
btns.forEach((element) =>
  element.addEventListener("click", (e) => {
    // parentElement accedo a la info del padre del boton, 
    Habitacion(e.target.parentElement);  
    $("#formularioReserva").fadeOut();  
    
  })
);

//funcion que se ejecuta en el foreach donde recorro los botones
function Habitacion(parentElement) {
  let habitacionInfo = {
    tipoHabitacion: parentElement.querySelector("h2").textContent,
    precio: parseInt(parentElement.querySelector("h4 span").textContent),
  };

  // Envio a array habitacion. pero no pusheo asi: arrayHabitacion.push(habitacionInfo). para que se vaya reemplazando.
  arrayHabitacion=[habitacionInfo];
  console.log("HABITACION SELECCIONADA");
  console.log(arrayHabitacion);
  


  //metodo getTime del objeto Date para sacar la diferencia entre checkin y checkout//
  let fechaInicio = new Date(checkIn).getTime();
  let fechaFin    = new Date(checkOut).getTime();

  let diff = fechaFin - fechaInicio;

  let estadia = (diff/(1000*60*60*24) );

  // recorro array para sacar el precio de habitacion y multiplicarlo por la estadia= valor total
  for (valorRoom of arrayHabitacion){
    let precio= valorRoom.precio;
    precioTotal= precio * estadia;    
    // uso preciototal en funcion imprimirRoom 
  }

  /////////////////////////////////////////////////////////
 
  actualizarSessionStorageRoom(arrayHabitacion);
  imprimirRoom(arrayHabitacion);  
}

// funcion para actualizar localStorage con Datos de Habitacion elegida
function actualizarSessionStorageRoom(arrayHabitacion) {
  sessionStorage.setItem("Habitacion", JSON.stringify(arrayHabitacion));
  
}


// // funcion para imprimir habitacion al HTML
function imprimirRoom(arrayHabitacion, ) {
  cardRoom.innerHTML = "";  

  arrayHabitacion.forEach((habitacionInfo) => {
    const cardHabitacion =
    `<div style="display: none;" id="cardHabitacion"  class="card animacion">
				
			<br>
			<div class="content">
				<ul>
	
          <li class="lista-card">Habitacion: ${habitacionInfo.tipoHabitacion}</li>
          <li class="lista-card">Precio: ${habitacionInfo.precio}</li>	
          <li class="lista-card">VALOR TOTAL: ${precioTotal}</li>
				</ul>				
			</div>		
			
			<div>		
				<a id="btnContinuarReserva" href="#formularioReserva" class="btn btn-primary" onclick="fadeInReserva()" >CONTINUAR RESERVA</a>
			</div>
			<br>
    	</div> <br>`;
    cardRoom.innerHTML = cardHabitacion;
  });

  
  // BOOTSTRAP FADE IN
  $("#cardHabitacion").fadeIn(2000);
  
}



// BOOTSTRAP FADE IN
function fadeInReserva () {
  $("#formularioReserva").fadeIn(3000);
}







