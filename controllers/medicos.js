const response = require('express');
const Medico = require('../models/medico');

const getMedicos = async( req, res = response ) => {
    const medicos = await Medico.find().populate('usr', 'nombre').populate('hospital', 'nombre')
    res.json({
        ok: true,
        medicos
    })
};
const createMedicos = async( req, res = response ) => {
    
    const uid = req.uid;
    const hospitalId = req.body.hospital;
    const medico = new Medico({
        usr: uid,
        hospital: hospitalId,
        ...req.body 
    });

    try {
 
        const medicoDb = await medico.save();

        res.json({
            ok: true,
            medico: medicoDb
        })

    } catch( error ) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Hable con el admin'
        })
    }


};
const updateMedicos = ( req, res = response ) => {
    res.json({
        ok: true,
        mjs: 'Update Medicos'
    })
};
const deleteMedicos = ( req, res = response ) => {
    res.json({
        ok: true,
        mjs: 'Delete Medicos'
    })
};

module.exports = {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
}