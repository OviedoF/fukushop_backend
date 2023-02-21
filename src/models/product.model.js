const {Schema, model} = require('mongoose');

const productColorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hex: {
        type: String,
        required: true
    },
    imageKey: {
        type: String,
        required: true
    }
})

const sizeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    chest: {
        type: String,
        required: true
    },
    hips: {
        type: String,
        required: true
    },
    waist: {
        type: String,
        required: true
    },
    height: {
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
    discount: {
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
    subCategory: {
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
        imageKey: {
            type: String,
            required: true
        },
        principalImage: {
            type: String,
            required: true
        },
        images: [String]
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
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean
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

