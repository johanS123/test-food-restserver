const { Router } = require('express');
const { check } = require('express-validator');
const { stocktakingGet, stocktakingPost, stocktakingPut, stocktakingDelete } = require('../controllers/stocktaking');
const { validateJWT, validateFields } = require('../middlewares');
const { existStocktakingForId } = require('../helpers/db-validators');

const router = Router();

router.get('/', stocktakingGet);

router.post('/', [
    validateJWT,
    check('product', 'El producto es obligatorio').not().isEmpty(),
    check('amountStock', 'La cantidad es obligatoria').not().isEmpty(),
    validateFields
],stocktakingPost);

router.put('/', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existStocktakingForId),
    validateFields
], stocktakingPut)

router.delete('/', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existStocktakingForId),
    validateFields
], stocktakingDelete)


module.exports = router;