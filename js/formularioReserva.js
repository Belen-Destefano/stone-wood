(function(){
	emailjs.init("jt6DMsGIXAp9BHsX7");
})();

const resetear = document.querySelector("#myForm")

// USE https://www.emailjs.com/docs/rest-api/send-form/

$('#myForm').on('submit', function(event) {
	event.preventDefault(); // prevent reload
	
	var formData = new FormData(this);
	formData.append('service_id', 'service_d42ukif');
	formData.append('template_id', 'template_c4yqn5u');
	formData.append('user_id', 'jt6DMsGIXAp9BHsX7');
 
	$.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
		type: 'POST',
		data: formData,
		contentType: false, // auto-detection
		processData: false // no need to parse formData to string
	}).done(function() {
		
		resetear.reset()
		Swal.fire({
			title: "Tus datos fueron ingresados",
			text: 'Te enviaremos un mail a la brevedad. Gracias =)', 
			icon: "success",	
			
		
			showConfirmButton: false,
			timer: 5000
			
		})
	}).fail(function(error) {
		alert('Oops... ' + JSON.stringify(error));
	});
});

