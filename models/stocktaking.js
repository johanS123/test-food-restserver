const { Schema, model } = require('mongoose');

const stocktakingSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    amountStock: {
        type: Number,
        required: [true, 'La cantidad en stock es obligatorio']
    },
    updateDate: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Boolean,
        default: true
    }
})

stocktakingSchema.methods.toJSON = function () {
    const { __v , _id, status, ...stocktaking } = this.toObject();
    stocktaking.uid = _id;
    return stocktaking;
}

module.exports = model('Stocktaking', stocktakingSchema);