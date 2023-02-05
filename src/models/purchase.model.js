const {Schema, model} = require('mongoose');

const purchaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
    },
    products: [{
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    shippingDirection: {
        type: String,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true
    },
    shippingDate: {
        type: Date,
        required: true
    },
    shippingCompany: {
        type: String,
        required: true
    },
    shippingTrackingNumber: {
        type: String,
        required: true
    },
    shippingTrackingUrl: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = model('Purchase', purchaseSchema);