const {Schema, model} = require('mongoose');

const productColorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

const sizeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sizes: {
        type: String,
        required: true
    }
})

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
    ProductColor: model('ProductColor', productColorSchema),
    Size: model('Size', sizeSchema),
    Product: model('Product', productSchema)
};

