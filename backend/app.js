import express from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';


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

//Rutas 

app.use(express.static(path.join(process.cwd(), 'frontend')));

// Iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});