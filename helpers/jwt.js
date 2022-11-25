const jwt = require('jsonwebtoken');


const generarJwt = ( uid ) => {
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };
    
        jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: 43200 }, 
        ( err, token ) => {
    
            if( err ){
                console.log( err );
                reject( 'Error al generar el token' )
            } else {
                resolve( token );
            }
        });
    });


};

module.exports = {
    generarJwt
}