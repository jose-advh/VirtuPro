
import connect from '../configs/dbConnection.mjs';


const preguntas = async (req, res) => {
    try {
        const db = await connect()
    } catch (error) {

    }
}







app.use(express.json());

app.get('api/preguntas', (req, res) => {
    const query = 'SELECT * FROM preguntas';

    connect.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ message: 'error en la consulta'})
        }
        
        res.json(results);
        
    });
});

app.listen(port, () => {
    console.log('Servidor gou')
});
