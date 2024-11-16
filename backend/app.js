import connect from './configs/dbConnection.mjs';

async function fetchData() {
    const db = await connect();
    try {
        const [rows, fields] = await db.execute('SELECT * FROM empleados')
        console.log('todos los empleados:', rows);
    } catch (error) {
        console.error('error al obtener datos:', error);
    } finally {
        db.end();
    }
} 

fetchData();