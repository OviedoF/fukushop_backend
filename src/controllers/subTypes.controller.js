const path = require('path');
const {SubType, Type} = require(path.join(__dirname, '..', 'models', 'types.model'))
const subTypeController = {};

subTypeController.getAll = async (req, res) => {
    try {
        const subTypes = await SubType.find();
        res.status(200).send(subTypes)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

subTypeController.create = async (req, res) => {
    try {
        const body = req.body;

        if(!req.files) return res.status(500).send({message: 'Las imágenes son necesarias.'})

        body.images = [];

        for (let index = 0; index < req.files.images.length; index++) {
            const file = req.files.images[index];
            body.images.push(`${process.env.ROOT_URL}/images/${file.filename}`)
        }

        const newSubType = new SubType(req.body);

        await Type.findByIdAndUpdate(req.body.category, {$push: {subTypes: newSubType._id}})
        await newSubType.save();

        res.status(201).send(newSubType);
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

subTypeController.update = async (req, res) => {
    try {
        const {id} = req.params;
        const updated = await SubType.findByIdAndUpdate(id, req.body, {
            new: true
        });

        res.status(200).send(updated);
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

subTypeController.delete = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await SubType.findByIdAndDelete(id);

        if(!deleted) return res.status(404).send({
            message: 'Sub-tipo de ropa inexistente.'
        })

        res.status(200).send(deleted);
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
};

module.exports = subTypeController;