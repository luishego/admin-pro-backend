const jwt = require('jsonwebtoken');
const validarJwt = ( req, res, next ) => {
    // Leer token
    const token = req.header('x-token');
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msj: 'Unauthorized'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        
        next();

    } catch( error ){
        return res.status(401).json({
            ok: false,
            msj: 'Token no valido'
        })
    }
};

module.exports = {
    validarJwt
}