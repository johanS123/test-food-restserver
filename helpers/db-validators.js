
const Role = require('../models/role');
const User = require('../models/user');
const product = require('../models/product');
const stocktaking = require('../models/stocktaking');

const isRoleValid = async(rol = '') => {
    const existeRole = await Role.findOne({ rol })
    if (!existeRole) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

const emailExist = async (email = '') => {
    const existeEmail = await User.findOne({ email });

    if (existeEmail) {
        throw new Error(`El correo: ${ email }, ya esta registrado`)
    }
}

const existUserForId = async( id ) => {

    // verificar si el correo existe
    const existUser = await User.findById(id);
    if ( !existUser ) {
        throw new Error(`El ID no existe ${ id }`)
    }

}

const existProductForId = async( id ) => {

    // verificar si el producto existe
    const existProduct = await product.findById(id);
    if ( !existProduct ) {
        throw new Error(`El ID no existe ${ id }`)
    }
}

const existStocktakingForId = async( id ) => {

    // verificar si el invetario existe
    const existStocktaking = await stocktaking.findById(id);
    if ( !existStocktaking) {
        throw new Error(`El ID no existe ${ id }`)
    }
}

const existOrderForId = async( id ) => {
    // verificar si el invetario existe
    const existOrder = await order.findById(id);
    if ( !existOrder) {
        throw new Error(`El ID no existe ${ id }`)
    }
}


module.exports = {
    isRoleValid,
    emailExist,
    existUserForId,
    existProductForId,
    existStocktakingForId,
    existOrderForId
}