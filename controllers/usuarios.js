const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJwt } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;    
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),
        Usuario.countDocuments()
    ])
    res.json({
        ok : true,
        usuarios,
        total
    });
};
const createUsuarios = async(req, res = response) => {
    const { email, pwd } = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msj: 'El correo ya está registrado' 
            })
        }

        const usuario = new Usuario(req.body);
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.pwd = bcrypt.hashSync( pwd, salt);
        
        
        await usuario.save();
        const usuarioDb = usuario.id;
        const token = await generarJwt( usuarioDb.id );

    
        res.json({
            ok : true,
            usuario,
            token
        });
    
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msj: 'Error inesperado'
        })

    };

};

const updateUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usrDb = await Usuario.findById( uid );

        if( !usrDb ) {
            return res.status(404).json({
                ok: false,
                msj: 'No existe el uid del usuario'
            });
        };
        // Actualizaciones
        const {pwd, google, email, ...campos} = req.body;

        if( usrDb.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msj: 'El email ya está registrado'
                })
            }
        };

        campos.email = email;
        
        const usuarioActualizado  = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error inesperado'
        })
    }

}
const deleteUsuario = async(req, res = response) => {

    const uid = req.params.id;
    try {
        const usrDb = await Usuario.findById( uid );
        if( !usrDb ) {
            return res.status(404).json({
                ok: false,
                msj: 'No existe el usuario con ese Id'
            })
        }
        await Usuario.findByIdAndDelete( uid );
        
        return res.status(200).json({
            ok: true,
            id: uid
        })
    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msj:'Error inesperado'
        })
    }
}
module.exports = {
    getUsuarios,
    createUsuarios,
    updateUsuario,
    deleteUsuario
}