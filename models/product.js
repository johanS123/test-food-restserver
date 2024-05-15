const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    description:  {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    status: {
        type: Boolean,
        default: true
    },
    price:  {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

productSchema.methods.toJSON = function () {
    const { __v , _id, status, ...product } = this.toObject();
    product.uid = _id;
    return product;
}

module.exports = model('Product', productSchema);