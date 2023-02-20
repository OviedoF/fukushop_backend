const {model, Schema} = require('mongoose');

const SubCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    }
})

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'SubCategory'
    }]
})

module.exports = {
    Category: model('Category', CategorySchema),
    SubCategory: model('SubCategory', SubCategorySchema)
}