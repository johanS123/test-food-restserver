const { response, request } = require('express');

const Stocktaking = require('../models/stocktaking');

const stocktakingGet = async(req = request, res = response) => {
    const { limit = 5, from = 0} = req.query;
    const query = { status: true };

    const [total, stocktaking] = await Promise.all([
        Stocktaking.countDocuments(query),
        Stocktaking.find(query)
            .populate('product', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        stocktaking
    });
}

const stocktakingPost = async(req = request, res = response) => {
    const { ...rest } = req.body;
    
    const stocktaking = new Stocktaking( rest );

    await stocktaking.save();

    res.json({
        ok: true,
        msg: 'post API - controlador',
        stocktaking
    })
}

const stocktakingPut = async (req, res = response) => {
    const { id } = req.params;
    const { ...rest } = req.body;

    const stocktaking = await Stocktaking.findByIdAndUpdate(id, rest);

    res.json(stocktaking);
}

const stocktakingDelete = async (req, res = response) => {
    const { id } = req.params;

    // Logicamente lo borramos
    const stocktaking = await Stocktaking.findByIdAndUpdate(id, { status: false });

    res.json(stocktaking);
}


module.exports = {
    stocktakingGet,
    stocktakingPost,
    stocktakingPut,
    stocktakingDelete
}