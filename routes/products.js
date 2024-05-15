const { Router } = require('express');
const { productsGet, productsPost, productsPut, productDelete } = require('../controllers/products');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { existProductForId } = require('../helpers/db-validators');

const router = Router();

router.get('/', productsGet);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripcion es obligatoria').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    validateFields
], productsPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProductForId),
    validateFields    
], productsPut);

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProductForId),
    validateFields
], productDelete);

router.patch('/', () => {})

module.exports = router;