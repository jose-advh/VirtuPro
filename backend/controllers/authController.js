import connect from '../configs/dbConnection.mjs';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
    const { identificacion, password } = req.body;

    if (identificacion && password) {
        let db;
        try {
            db = await connect();
            const [results] = await db.execute(
                'SELECT * FROM empleados WHERE identificacion = ?', [identificacion]
            );

            if (results.length > 0) {
                const user = results[0];
                const contraseñaCorrecta = await bcrypt.compare(password, user.contrasena);

                if (contraseñaCorrecta) {
                    req.session.loggedin = true;
                    req.session.username = user.nombres;
                    req.session.idUsuario = identificacion;
                
                    res.json({ success: true, redirect: 'http://localhost:5500/frontend/pages/panel.html' });
                } else {
                    res.status(401).json({ success: false, message: 'Usuario o contraseña incorrecta' });
                }
            } else {
                res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        } finally {
            if (db) {
                await db.end(); // Cierra la conexión a la base de datos
            }
        }
    } else {
        res.status(400).json({ success: false, message: 'Por favor ingresa usuario y contraseña' });
    }
};

export const home = (req, res) => {
    if (req.session.loggedin) {
        res.send(`Bienvenido, ${req.session.username}`);
    } else {
        res.status(401).send('Por favor inicia sesión para acceder.');
    }
};

export default { login, home };
