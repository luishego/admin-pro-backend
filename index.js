const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config')

// Crear servidor en express
const app = express();

// Configurar CORS
app.use(cors());

//Base de datos
dbConnection();

// Rutas
app.get( '/', (req, res) => {
    res.json({
        ok : true,
        msj: 'Hola mundo'
    });
} );

app.listen( process.env.PORT, () => {
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
})

