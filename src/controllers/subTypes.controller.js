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
            body.images.push(`${process.env.ROOT_URL}/uploads/${file.filename}`)
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
        const body = req.body;
        
        const subType = await SubType.findById(id);

        if(!subType) return res.status(404).send({message: 'La categoría no existe.'})

        if(req.files && req.files.images) {
            body.image = `${process.env.ROOT_URL}/uploads/${req.files.images[0].filename}`;
            
            if(subType.image) {
                const filename = subType.image.split('/uploads/')[1];
                const dir = path.join(__dirname, '..', 'public', 'uploads', filename);
                imagesUtils.deleteImage(dir)
            }
        }

        const updated = await SubType.findByIdAndUpdate(id, body, {
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