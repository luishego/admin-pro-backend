const { response } = require('express');
const { Usuario, Medico, Hospital } = require('../models/index');


const getUserByName = async( req, res = response ) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre : regex } , 'nombre email role google'),
        Medico.find({ nombre : regex } , 'nombre usr hospital'),
        Hospital.find({ nombre : regex } , 'nombre usr')
        
    ]);
   
    try {
        res.status(200).json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error inesperado'
        })
    }
};

const getInfoByTable = async ( req, res = response ) => {
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    let data;
    
    try {
        switch (tabla) {
            case 'medicos':
                data = await Medico
                                .find({ nombre: regex })
                                .populate('usr', 'nombre img')
                                .populate('hospital', 'nombre img');

                break;
            case 'hospitales':
                data = await Hospital
                                .find({ nombre: regex })
                                .populate('usr', 'nombre img');          
                
                break;
            case 'usuarios':
                data = await Usuario.find({ nombre: regex });              
    
                break;
        
            default:
                return res.status(404).json({
                    ok: false,
                    msj:'Recurso no encontrado'
                });
            
            }
            res.json({
                ok: true,
                resultados: data
            });
        }
    catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error inesperado'
        });
    };

};
module.exports = {
    getUserByName,
    getInfoByTable
}