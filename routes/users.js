const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateFields,
    validateJWT,
    isAdminRole,
    hasRole
} = require('../middlewares');


const { usersGet, 
        usersPost,
        usersPut,
        usersDelete,
        usersPatch
    } = require('../controllers/users');

const { isRoleValid, emailExist, existUserForId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExist),
    check('rol').custom(isRoleValid),
    validateFields
],usersPost);

router.put('/:id',[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], usersPut);

router.delete('/:id', [
    validateJWT,
    // esAdminRole,
    hasRole('ADMIN_ROLE', 'NOSE_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], usersDelete);

router.patch('/', usersPatch);


module.exports = router;