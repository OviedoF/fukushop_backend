const {model, Schema} = require('mongoose');

const subTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type'
    }
})

const typeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    subTypes: [{
        type: Schema.Types.ObjectId,
        ref: 'SubType'
    }]
})

module.exports = {
    SubType: model('SubType', subTypeSchema),
    Type: model('Type', typeSchema)
}