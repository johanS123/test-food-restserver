const { Schema, model } = require('mongoose');

const orderSchema = Schema({
    user: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: [true, 'El usuario es obligatorio'] 
    },
    orderDate: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        default: 'PENDIENTE',
        enum: ['PENDIENTE', 'COMPLETADO', 'CANCELADO']
    },
    total:  {
        type: Number,
        required: [true, 'El total es obligatorio']
    }
})

module.exports = model('Order', orderSchema);