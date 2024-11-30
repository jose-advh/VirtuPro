import express from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import authController from './controllers/authController.js';
import registerController from './controllers/registerController.js';
import preguntas from './controllers/preguntasController.js';

const app = express();
const PORT = 3000;

app.use(cors());

// Procesar datos del cliente

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Procesar forms

// Configuración de las sesiones

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
}));


app.use(express.static(path.join(process.cwd(), 'frontend')));


//Rutas 

app.post('/auth', authController.login);
app.post('/register', registerController.register);
app.get('/preguntas', preguntas);

// Iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});