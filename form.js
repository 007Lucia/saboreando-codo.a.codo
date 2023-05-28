document.getElementById('myForm').addEventListener('submit', function(e) {
    var email = document.forms["myForm"]["email"].value;
    var message = document.forms["myForm"]["message"].value;

    if (email == "") {
        alert("El correo electrónico no puede estar vacío");
        e.preventDefault();
        return false;
    }

    var atposition = email.indexOf("@");  
    var dotposition = email.lastIndexOf(".");  
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
        alert("Por favor, introduce un correo electrónico válido");
        e.preventDefault();
        return false;
    }

    if (message.trim() == "") {
        alert("El mensaje no puede estar vacío");
        e.preventDefault();
        return false;
    }

    // Add more validations here

    alert("Formulario enviado con éxito");
});
