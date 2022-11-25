
// Path 'api/login'
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/',
            [
                check('email', 'El correo es obligatorio').isEmail(),
                check('pwd', 'El password es obligatorio').not().isEmpty(),
                validarCampos

            ],
            login
)





module.exports = router;