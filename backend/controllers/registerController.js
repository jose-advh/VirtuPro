import connect from '../configs/dbConnection.mjs';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    const { identificacion, nombre, password } = req.body;

    if (identificacion && nombre && password) {
        try {
            const db = await connect();

            // Verificacion si está registrada la ID

            const [existingUser] = await db.execute(
                'SELECT * FROM empleados WHERE identificacion = ?', [identificacion]
            );

            if (existingUser.length > 0) {
                return res.status(409).json({success: false, message: 'La identificación ya está registrada'});
            }

            // Encriptación de contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar nuevo usuario en la bd
            const [result] = await db.execute(
                'INSERT INTO empleados (identificacion, nombres, contraseña) VALUES (?, ?, ?)', [identificacion, nombre, hashedPassword]
            );

            res.status(201).json({ success: true, message: 'Usuario registrado correctamente'});

        } catch (error) {
            console.error('Error en el registro', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor.'});
        }

    } else {
        res.status(400).json({ success: false, message: 'Por favor ingresa todos los datos requeridos.'});
    }
};

export default { register };