const { response } = require("express");
const Usuario = require( "../models/usuario" );
const bcrypt = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt")

const login = async(req, res = response) => {
    const {email, pwd} = req.body;
    try {
        // Verifica email
        const usuarioDb = await Usuario.findOne({ email });        
        console.log(usuarioDb);

        if( !usuarioDb ) {
            return res.status(404).json({
                ok: false,
                msj: 'El usuario no existe'
            })
        }

        // Verifica pwd
        const validPwd = bcrypt.compareSync( pwd, usuarioDb.pwd );
        if( !validPwd ){
            return res.status(400).json({
                ok: false,
                msj: 'Password incorrecto'
            })

        };

        // Generar JWT
        const token = await generarJwt( usuarioDb.id );

        res.status(200).json({
            ok: true,
            token
        })
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Hable con el admin'
        })
    }
}

module.exports = {
    login
}