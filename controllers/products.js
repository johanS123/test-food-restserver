const { response, request } = require('express');

const Product = require('../models/product');

const productsGet = async (req = request, res = response) => {

    const { limit = 5, from = 0} = req.query;
    const query = { status: true };

    const [total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        product
    });
}

const productsPost = async (req = request, res = response) => {

    const { name, price, description } = req.body;

    // Generar data
    let data = {
        name: name.toUpperCase(),
        description,
        price,
        user: req.user._id
    }

    const productDB = await Product.findOne({ name: data.name });

    if ( productDB ) {
        return res.status(400).json({
            msg: `El producto ${ productDB.name }, ya existe`  
        });
    }
    
    const product = new Product(data);

    await product.save();

    res.json({
        ok: true,
        msg: 'post API - controlador',
        product
    })
}

const productsPut = async (req, res = response) => {
    const { id } = req.params;
    const { ...rest } = req.body;

    if (rest.name != undefined) {
        rest.name = rest.name.toUpperCase()
    }

    const product = await Product.findByIdAndUpdate(id, rest);

    res.json(product);
}

const productDelete = async (req, res = response) => {
    const { id } = req.params;

    // Logicamente lo borramos
    const product = await Product.findByIdAndUpdate(id, { status: false });

    res.json(product);
}

module.exports = {
    productsGet,
    productsPost,
    productsPut,
    productDelete
}