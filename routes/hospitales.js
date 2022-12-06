// Ruta '/api/hospitales'

const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getHospitales, 
    createHospitales, 
    updateHospitales, 
    deleteHospitales } = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/' ,getHospitales );
router.post( '/', 
        [
                validarJwt,
                check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
                validarCampos
        ], 
        createHospitales );


router.put( '/:id', 
        [], 
        updateHospitales );

router.delete('/:id', deleteHospitales );


module.exports = router;
