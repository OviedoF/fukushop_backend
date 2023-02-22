const {Schema, model} = require('mongoose');

const productColorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
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
        required: true
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
        type: Number
    },
    discount: {
        type: Number
    },
    clothe_type:{
        type: Schema.Types.ObjectId,
        ref: 'Type',
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
        color: {
          type: Schema.Types.ObjectId,
          ref: 'ProductColor'
        },
        principalImage: {
          type: String,
          required: true
        },
        images: [String],
        stock: {
          type: Number,
          required: true
        },
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
    timestamps: true
});

productSchema.index({ 'colors.color': 1 }, { unique: false });
productSchema.index({ 'colors.name': 1 }, { unique: false });

module.exports = {
    ProductColor: model('ProductColor', productColorSchema),
    Size: model('Size', sizeSchema),
    Product: model('Product', productSchema)
};

