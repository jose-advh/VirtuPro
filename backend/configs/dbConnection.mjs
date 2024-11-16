import mysql from 'mysql2/promise';

async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'virtupro_db'
        });
        console.log('Conexión a MySQL establecida.');
        return connection;
    } catch (error) {
        console.error('Error al conectar a MYSQL:', error)
        throw error;
    }
}

export default connect;