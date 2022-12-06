const { Router } = require('express');
const fileUpload  = require('express-fileupload');
const { subirImagen, getImage } = require('../controllers/subirImagen');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();
router.use(fileUpload());

router.put('/:tipo/:id', validarJwt, subirImagen)
router.get('/:tipo/:img', validarJwt, getImage)


module.exports = router;