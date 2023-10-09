const path = require('path');
const { Size } = require(path.join(__dirname, '..', 'models', 'product.model'))
const sizesController = {};

sizesController.getAll = async (req, res) => {
    try {
        const sizes = await Size.find();
        res.status(200).send(sizes)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

sizesController.create = async (req, res) => {
    try {
        const newSize = new Size(req.body);
        await newSize.save();

        res.status(201).send(newSize);
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

sizesController.updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        const updated = await Size.findByIdAndUpdate(id, req.body, {
            new: true
        });

        res.status(200).send(updated);
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

sizesController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Size.findByIdAndDelete(id);

        if (!deleted) return res.status(404).send({
            message: 'Tamaño de prenda inexistente.'
        })

        res.status(200).send(deleted);
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

module.exports = sizesController;