const {Schema, model} = require('mongoose');

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

module.exports = model('Size', sizeSchema);