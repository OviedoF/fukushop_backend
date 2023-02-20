const path = require('path');
const {ProductColor} = require(path.join(__dirname, '..', 'models', 'product.model'))
const productColorController = {};

productColorController.getAll = async (req, res) => {
    try {
        const productColors = await ProductColor.find();
        res.status(200).send(productColors)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

productColorController.create = async (req, res) => {
    try {
        const newProductColor = new ProductColor(req.body);
        await newProductColor.save();

        res.status(201).send(newProductColor);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error
        })
    }
};

productColorController.updateOne = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(req.body)
        const updated = await ProductColor.findByIdAndUpdate(id, req.body, {
            new: true
        });

        res.status(200).send(updated);
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

productColorController.delete = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await ProductColor.findByIdAndDelete(id);

        if(!deleted) return res.status(404).send({
            message: 'Color de producto inexistente.'
        })

        res.status(200).send(deleted);
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

module.exports = productColorController