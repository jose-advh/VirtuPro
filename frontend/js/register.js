document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener los datos del formularop
    const identificacion = document.getElementById('identificacion').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const correo = document.getElementById('correo').value;
    const direccion = document.getElementById('direccion').value;
    const fechaNac = document.getElementById('fechaNac').value;
    const password = document.getElementById('password').value;
    const telefono = document.getElementById('telefono').value;
    const formError = document.getElementById('formError');

    console.log('Contraseña recibida:', password);

    try {
        console.log('Contraseña recibida:', password);
        // Parte de Isaac - Enviar Datos
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identificacion, nombres, apellidos, correo, password, direccion, telefono, fechaNac }),
        });

        // Respuesta del sv
        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            formError.innerText = result.message;
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al intentar registrar al usuario.');
    console.log('Contraseña recibida:', password);

    }

});