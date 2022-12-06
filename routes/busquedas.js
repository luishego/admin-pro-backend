// Ruta api/todo/param

const { Router } = require('express');
const { getUserByName, getInfoByTable } = require('../controllers/busquedas');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/:busqueda', validarJwt, getUserByName );
router.get( '/:tabla/:busqueda', validarJwt, getInfoByTable );

module.exports = router;
