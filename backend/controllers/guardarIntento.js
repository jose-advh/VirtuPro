import express from 'express';
import connect from '../configs/dbConnection.mjs';

const router = express.Router();

router.post('/guardarIntento', async (req, res) => {
    const { nota, valoracion, hora_evaluacion } = req.body;
    const idUsuario = req.session.idUsuario; // Usuario guardado en la sesión en tu login.
    console.log(idUsuario)

    if (!idUsuario) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    let db;
    try {
        db = await connect();

        const [intentosPrevios] = await db.execute(
            'SELECT COUNT(*) AS total FROM intento_evaluacion WHERE id_usuario = ?',
            [idUsuario]
        );

        const intento = intentosPrevios[0].total + 1;

        const [result] = await db.execute(
            'INSERT INTO intento_evaluacion (id_usuario, intento, nota, valoracion, hora_evaluacion) VALUES (?, ?, ?, ?, ?)',
            [idUsuario, intento, nota, valoracion, hora_evaluacion]
        );

        res.json({ success: true, id_intento: result.insertId });
    } catch (error) {
        console.error('Error al guardar el intento:', error);
        res.status(500).json({ success: false, message: 'Error interno al guardar el intento' });
    } finally {
        if (db) await db.end();
    }
});

export default router;
