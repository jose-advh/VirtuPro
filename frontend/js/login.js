document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formError = document.getElementById('formError');
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
            window.location.href = data.redirect; // Redirige a la página del frontend
        } else {
            formError.innerText = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al iniciar sesión');
    }
});