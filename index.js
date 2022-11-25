const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config')

// Crear servidor en express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parsing del Body
app.use(express.json());

//Base de datos
dbConnection();

// Rutas

app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require( './routes/auth' ) );


app.listen( process.env.PORT, () => {
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
})

