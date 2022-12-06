// Ruta '/api/medicos'


const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos,
        createMedicos,
        updateMedicos,
        deleteMedicos
    } = require('../controllers/medicos')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/' , getMedicos );
router.post( '/', 
[
        validarJwt,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital debe ser valido').isMongoId(),
        validarCampos
],
        createMedicos );


router.put( '/:id', 
        [], 
        updateMedicos );

router.delete('/:id', deleteMedicos );


module.exports = router;
