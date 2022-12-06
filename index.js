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
app.use( '/api/hospitales', require( './routes/hospitales' ) );
app.use( '/api/medicos', require( './routes/medicos' ) );
app.use( '/api/login', require( './routes/auth' ) );
app.use( '/api/busquedas', require( './routes/busquedas' ) );
app.use( '/api/busqueda', require( './routes/busquedas' ) );
app.use( '/api/subir_imagen', require( './routes/subirImagenes' ) );


app.listen( process.env.PORT, () => {
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
})

