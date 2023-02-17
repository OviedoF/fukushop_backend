const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const userSchema = new mongoose.Schema({
    userImage: {
        type: String,
        required: true
    },
    
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    cellphone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    roles: [{
        ref: 'Role',
        type: mongoose.Schema.Types.ObjectId
    }],

    shoppingCart: [{
        
    }],

    shoppingHistory: [{
        ref: "Purchase",
        type: mongoose.Schema.Types.ObjectId
    }],

    notifications: [{
        subject: String,
        message: String,
        redirect: String
    }],

    locations: [{
        country: String,
        city: String,
        address: String
    }],

    googleId: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.plugin(deepPopulate)

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

module.exports = mongoose.model('User', userSchema);