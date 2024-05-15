const { Schema, model } = require('mongoose');

const orderDetailSchema = Schema({
    order: {
        type: Schema.Types.ObjectId,
        required: [true, 'El No. de order es obligatorio']
    },
    product: {
        type: Schema.Types.ObjectId,
        required: [true, 'El No. de producto es obligatorio']
    },
    amount:  {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },
    unitPrice: {
        type: Number
    }
})

module.exports = model('OrderDetail', orderDetailSchema);