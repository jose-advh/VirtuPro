import express from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import guardarIntento from './controllers/guardarIntento.js';
import authController from './controllers/authController.js';
import registerController from './controllers/registerController.js';
import preguntas from './controllers/preguntasController.js';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], 
    methods: ['GET', 'POST'],
    credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(process.cwd(), 'frontend')));

app.post('/auth', authController.login);
app.post('/register', registerController.register);
app.get('/preguntas', preguntas);
app.post('/guardarIntento', guardarIntento);

app.use((req, res, next) => {
    console.log('Sesión actual:', req.session);
    next();
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});