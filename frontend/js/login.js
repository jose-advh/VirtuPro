document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const identificacion = document.getElementById('identificacion').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identificacion, password }),
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
            window.location.href = data.redirect; // Redirige a la página del frontend
        } else {
            alert(data.message); // Muestra el error
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al iniciar sesión');
    }
});