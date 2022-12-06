const response = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async( req, res = response ) => {
    const hospitales = await Hospital.find().populate('usr', 'nombre email')
    res.json({
        ok: true,
        hospitales
    })
};

const createHospitales = async( req, res = response ) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usr: uid,
        ...req.body
    });

    try {
        const hospitalDb = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDb
        });

    } catch(error){
        res.status(500).json({
            ok: false,
            msj: 'Error con el hospital'
        })
    }
};

const updateHospitales = ( req, res = response ) => {
    res.json({
        ok: true,
        msj: 'Update hospitales'
    })
};

const deleteHospitales = ( req, res = response ) => {
    res.json({
        ok: true,
        msj: 'Delete hospitales'
    })
};


module.exports = {
    getHospitales,
    createHospitales,
    updateHospitales,
    deleteHospitales
}