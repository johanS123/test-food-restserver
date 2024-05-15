const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { existOrderForId } = require('../helpers/db-validators');
const { ordersGet, ordersPost, ordersPut } = require('../controllers/order');

const router = Router();

router.get('/', ordersGet);

router.post('/', [
    validateJWT,
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('total', 'El total es obligatorio').not().isEmpty(),
    validateFields
], ordersPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existOrderForId),
    validateFields    
], ordersPut);

// router.delete('/:id', [
//     validateJWT,
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom(existProductForId),
//     validateFields
// ], productDelete);

// router.patch('/', () => {})

module.exports = router;