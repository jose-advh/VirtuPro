import mysql from 'mysql2/promise';


export default async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'virtupro_db',
            port: 3306
        });
        console.log('Conexión a MySQL establecida.');
        return connection;
    } catch (error) {
        console.error('Error al conectar a MYSQL:', error)
        throw error;
    }
}
