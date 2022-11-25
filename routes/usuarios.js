// Ruta: /api/usuarios

const { Router } = require('express');
const {
            getUsuarios, 
            createUsuarios, 
            updateUsuario, 
            deleteUsuario
            
        } = require('../controllers/usuarios');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJwt ,getUsuarios );
router.post( '/', 
        [
            validarJwt,
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('pwd','El password es obligatorio').not().isEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            validarCampos,
        ], 
        createUsuarios );


router.put( '/:id', 
        [
            validarJwt,
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('role', 'El rol es obligatorio').not().isEmpty(),
            validarCampos,
        ], 
        updateUsuario );

router.delete('/:id', validarJwt, deleteUsuario );


module.exports = router;
