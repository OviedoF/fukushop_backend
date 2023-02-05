const {Schema, model} = require('mongoose');

const colorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    hex: {
        type: String,
        required: true
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }]
});

const sizeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sizes: {
        type: [String],
        required: true
    }
});

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceWithOffer: {
        type: Number,
        required: true
    },
    offer: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory',
    },
    colors: [{
        type: Schema.Types.ObjectId,
        ref: 'Color'
    }],
    principalImage: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    sizes: [{
        type: Schema.Types.ObjectId,
        ref: 'Size'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    rating: {
        type: Number
    },
    ratingCount: {
        type: Number
    },
    sold: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = {
    Color: model('Color', colorSchema),
    Size: model('Size', sizeSchema),
    Product: model('Product', productSchema)
};

