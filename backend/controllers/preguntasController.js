import connect from '../configs/dbConnection.mjs';

const preguntas = async (req, res) => {
    let db; // Declaramos la variable aquí para cerrar la conexión en el bloque finally

    try {
        db = await connect();
        const [results] = await db.execute(
            'SELECT p.id, p.pregunta, p.opcion_correcta, GROUP_CONCAT(o.opcion) AS opciones FROM preguntas p INNER JOIN opciones o ON p.id = o.id_pregunta GROUP BY p.id'
        );

        const preguntasProcesadas = results.map(pregunta => ({
            ...pregunta,
            opciones: pregunta.opciones.split(',')
        }));

        res.json(preguntasProcesadas);

    } catch (error) {
        console.error('Hubo un error al consultar las preguntas:', error);
        res.status(500).json({ mensaje: 'Error al consultar las preguntas' });

    } finally {
        if (db) {
            await db.end(); // Cerramos la conexión
        }
    }
}

export default preguntas;
