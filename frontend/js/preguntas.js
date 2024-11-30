const totalPreguntas = 10;
let preguntaActual = 0; 
let preguntas = [];
let puntos = 0;

async function cargarPreguntas() {
    try {
        const respuesta = await fetch('http://localhost:3000/preguntas');
        preguntas = await respuesta.json();
        mostrarPregunta();
    } catch (error) {
        console.error('No se pudo cargar las preguntas... ', error);
        document.getElementById('resultado').textContent = 'Error al cargar las preguntas';
    }
}

function mostrarPregunta() {
    const contenedor = document.getElementById('contenedor-pregunta');
    contenedor.innerHTML = '';

    if (preguntaActual < totalPreguntas) {
        const pregunta = preguntas[preguntaActual];
        const titulo = document.createElement('h2');
        titulo.textContent = pregunta.pregunta;

        contenedor.appendChild(titulo);

        pregunta.opciones.forEach(opcion => {
            const boton = document.createElement('button');
            boton.textContent = opcion;
            boton.className = 'opcion';
            boton.onclick = (event) => validarRespuesta(event.target, opcion, pregunta.opcion_correcta);
            contenedor.appendChild(boton);
        });
    } else {
        document.getElementById('preguntasCorrectas').textContent = `${puntos}`;
        document.getElementById('resultadoFinal').classList.remove('ocultar')
        document.getElementById('cuestionario').classList.add('ocultar');
        // TO-DO: INSERTAR DATOS DE: INTENTO A LA BASE DE DATOS
    }
}


function validarRespuesta(boton, opcionSeleccionada, opcionCorrecta) {
    const resultado = document.getElementById('resultado');
    if (opcionSeleccionada === opcionCorrecta) {
        puntos++;
        boton.classList.add('green');
        resultado.textContent = '¡La respuesta seleccionada es correcta!';
        correcta = true;
    } else {
        resultado.textContent = 'La respuesta seleccionada es incorrecta :/';
    }

    const botones = document.querySelectorAll('.opcion');
    botones.forEach(b => b.disabled = true);
    document.getElementById('siguiente').style.display = 'inline-block';

}

    document.getElementById('siguiente').onclick = () => {
        preguntaActual++;
        document.getElementById('numeroPregunta').textContent = preguntaActual+'/10';
        document.getElementById('siguiente').style.display = 'none';
        document.getElementById('resultado').textContent = ''
        mostrarPregunta();
    }

cargarPreguntas();