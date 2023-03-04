const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const { Schema, model } = mongoose;

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

const productVariantSchema = new Schema({
    color: {
        type: Schema.Types.ObjectId,
        ref: 'ProductColor'
    },
    size: {
        type: Schema.Types.ObjectId,
        ref: 'Size'
    },
    stock: {
        type: Number
    },
    image: {
        type: String,
        required: true
    },
    gallery: [String]
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
        ref: 'SubCategory',
    },
    variants: [{
        type: Schema.Types.ObjectId,
        ref: 'ProductVariant'
    }],
    // colors: [{
    //     color: {
    //       type: Schema.Types.ObjectId,
    //       ref: 'ProductColor'
    //     },
    //     principalImage: {
    //       type: String,
    //       required: true
    //     },
    //     images: [String],
    //     sizes: [{
    //         size: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'Size'
    //         },
    //         stock: {
    //             type: Number
    //         },
    //     }]
    // }],
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

productSchema.plugin(deepPopulate);

module.exports = {
    ProductColor: model('ProductColor', productColorSchema),
    Size: model('Size', sizeSchema),
    Product: model('Product', productSchema),
    ProductVariant: model('ProductVariant', productVariantSchema)
};

