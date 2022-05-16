// jquery  para que aparezca seccion contacto y galeria de imagenes al hacer scroll
$(function(){

	$(document).on("scroll", function(){
		var desplazamientoActual = $(document).scrollTop();
		var servicios = $("#servicios");
		var galeriaSeccion = $("#galeria");
		var testimonios = $("#testimonios");

		// console.log("Estoy en " , desplazamientoActual); 
		if(desplazamientoActual > 500 && servicios.css("display") == "none"){
			
			servicios.fadeIn(2000);
		}

		else if (desplazamientoActual > 1400 && galeriaSeccion.css("display") == "none"){
			galeriaSeccion.fadeIn(2500);
		}

		else if (desplazamientoActual > 1800 && testimonios.css("display") == "none"){
			testimonios.fadeIn(4000);		

		}
		
	});
});




// accedo a nodos de los inputs del formulario
const inputcheckIn = document.querySelector("#check-in");
const inputcheckOut = document.querySelector("#check-out");
const inputHuespedes = document.querySelector("#huespedes");

const btn = document.querySelector("#boton");
btn.addEventListener("click", () => {
	if (
		inputcheckIn.value === "" ||
		inputcheckOut.value === "" ||
		inputHuespedes.value === ""
	) {
		Swal.fire({
			padding:"2%",
			text: 'Por favor, completa todos los campos',
			confirmButtonColor: "rgb(82 86 90)",
			showClass: {
			  popup: 'animate__animated animate__fadeInDown'
			},
			hideClass: {
			  popup: 'animate__animated animate__fadeOutUp'
			}
		})
		
		return false;
	} else {
		Swal.fire({
			text: "Está seguro de las fechas buscadas?",
			icon: "success",
			showCancelButton: true,
			confirmButtonText: "Sí, seguro",
			cancelButtonText: "No, volver a buscar",
			confirmButtonColor: "rgb(82 86 90)",
			cancelButtonColor: "rgb(82 86 90)",
		}).then((result) => {
			if (result.isConfirmed) {
				cargarDatos();
			}
		});
	}
});

// clase creadora de objetos para datos del formulario
class Datos {
	constructor(checkin, checkout, huespedes) {
		this.checkin = checkin;
		this.checkout = checkout;
		this.huespedes = huespedes;
	}
}

// funcion ejecutada por el botón buscar del formulario
function cargarDatos() {
	// en vez de pushear al arrayDatos el nuevo objeto, solo pongo new. para que se vaya reemplazando y no se acumule en el local

	arrayDatos = [
		new Datos(inputcheckIn.value, inputcheckOut.value, inputHuespedes.value),
	];
	actualizarSessionStorage(arrayDatos);

	// pongo objeto Location para redireccionar a la pag de reservas.html al apretar el boton buscar. antes la habia linkeado simplemente desde el boton, pero asi es mejor para evitar problemas.
	window.location = "../pages/reserva.html";
}

// funcion para actualizar sessionStorage con Datos de busqueda
function actualizarSessionStorage(array) {
	sessionStorage.setItem("Reserva", JSON.stringify(array));
}
