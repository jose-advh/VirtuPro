const totalPreguntas = 10;
let preguntaActual = 0; 
let preguntas = [];
let puntos = 0;

async function cargarPreguntas() {
    try {
        const respuesta = await fetch('http://localhost:3000/preguntas');
        let todasLasPreguntas = await respuesta.json();
        todasLasPreguntas = mezclarArray(todasLasPreguntas);
        preguntas = todasLasPreguntas.slice(0, totalPreguntas);

        mostrarPregunta();
    } catch (error) {
        console.error('No se pudo cargar las preguntas... ', error);
        document.getElementById('resultado').textContent = 'Error al cargar las preguntas';
    }
}

function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function mostrarPregunta() {
    const contenedor = document.getElementById('contenedor-pregunta');
    contenedor.innerHTML = '';

    if (preguntaActual < totalPreguntas) {
        const pregunta = preguntas[preguntaActual];
        const titulo = document.createElement('h2');
        titulo.textContent = pregunta.pregunta;

        contenedor.appendChild(titulo);

        const opcionesMezcladas = mezclarArray([...pregunta.opciones]);

        opcionesMezcladas.forEach(opcion => {
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
        finalizarCuestionario();
        // TO-DO: INSERTAR DATOS DE: INTENTO A LA BASE DE DATOS
    }
}

function validarRespuesta(boton, opcionSeleccionada, opcionCorrecta) {
    const resultado = document.getElementById('resultado');
    if (opcionSeleccionada === opcionCorrecta) {
        puntos++;
        boton.classList.add('green');
        resultado.textContent = '¡La respuesta seleccionada es correcta!';
    } else {
        resultado.textContent = 'La respuesta seleccionada es incorrecta :/';
    }

    const botones = document.querySelectorAll('.opcion');
    botones.forEach(b => b.disabled = true);
    document.getElementById('siguiente').style.display = 'inline-block';
}

document.getElementById('siguiente').onclick = () => {
    preguntaActual++;
    document.getElementById('numeroPregunta').textContent = preguntaActual + '/10';
    document.getElementById('siguiente').style.display = 'none';
    document.getElementById('resultado').textContent = '';
    mostrarPregunta();
}

cargarPreguntas();

function finalizarCuestionario() {
    const nota = puntos; // Usamos la variable `puntos` como nota
    const valoracion = nota >= 7 ? 'Aprobado' : 'Desaprobado'; // Puedes ajustar el criterio
    const horaEvaluacion = new Date().toISOString(); // Hora actual en formato ISO

    guardarIntento(nota, valoracion, horaEvaluacion);
}

async function guardarIntento(nota, valoracion, horaEvaluacion) {
    try {
        const response = await fetch('http://localhost:3000/guardarIntento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nota, valoracion, hora_evaluacion: horaEvaluacion }),
        });

        const data = await response.json();
        if (data.success) {
            console.log('Intento guardado con éxito:', data.id_intento);
        } else {
            console.error('Error al guardar intento:', data.message);
        }
    } catch (error) {
        console.error('Error en el envío:', error);
    }
}

