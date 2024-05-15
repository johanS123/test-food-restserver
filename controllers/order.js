const { response, request } = require('express');

const Order = require('../models/order');

const ordersGet = async (req = request, res = response) => {

    const { limit = 5, from = 0} = req.query;

    const [total, order] = await Promise.all([
        Order.countDocuments({}),
        Order.find({})
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        order
    });
}

const ordersPost = async (req = request, res = response) => {

    const { status, total } = req.body;

    // Generar data
    let data = {
        user: req.user._id,
        status,
        total
    }

    // const productDB = await Product.findOne({ name: data.name });

    // if ( productDB ) {
    //     return res.status(400).json({
    //         msg: `El producto ${ productDB.name }, ya existe`  
    //     });
    // }
    
    const order = new Order(data);

    await order.save();

    res.json({
        ok: true,
        msg: 'post API - controlador',
        order
    })
}

const ordersPut = async (req, res = response) => {
    const { id } = req.params;
    const { ...rest } = req.body;

    const order = await Order.findByIdAndUpdate(id, rest);

    res.json(order);
}

const ordersDelete = async (req, res = response) => {
    const { id } = req.params;

    // Logicamente lo borramos
    const order = await Order.findByIdAndUpdate(id, { status: false });

    res.json(product);
}

module.exports = {
    ordersGet,
    ordersPost,
    ordersPut,
    ordersDelete
}