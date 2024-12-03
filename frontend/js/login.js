document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera tradicional

    const identificacion = document.getElementById('identificacion').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Enviar cookies para manejar la sesión
            body: JSON.stringify({ identificacion, password }),
        });

        const data = await response.json();

        if (data.success) {
            // Almacenar idUsuario si la respuesta lo incluye
            const idUsuario = data.idUsuario; // Esto debe estar en la respuesta del servidor
            // Redirigir o realizar cualquier otra acción necesaria
            window.location.href = '../pages/panel.html'; // Redirigir después del login exitoso
        } else {
            // Si el login falla, mostrar el mensaje de error
            document.getElementById('error-message').textContent = data.message;
            document.getElementById('error-message').style.display = 'block';
        }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        document.getElementById('error-message').textContent = 'Error de conexión.';
        document.getElementById('error-message').style.display = 'block';
    }
});
