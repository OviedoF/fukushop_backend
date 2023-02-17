const path = require('path');
const {Type} = require(path.join(__dirname, '..', 'models', 'types.model'))
const typesController = {};
const imagesUtils = require(path.join(__dirname, '..', 'utils', 'images.utils'))
require('dotenv').config();

typesController.getAll = async (req, res) => {
    try {
        const types = await Type.find().populate('subCategories');
        res.status(200).send(types)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

typesController.getOne = async (req, res) => {
    try {
        const {id} = req.params;
        const type = await Type.findById(id).populate('subTypes');
        res.status(200).send(type)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

typesController.create = async (req, res) => {
    try {
        const body = req.body;
        
        if(!req.files) return res.status(500).send({message: 'Las imágenes son necesarias.'})

        body.images = [];

        for (let index = 0; index < req.files.images.length; index++) {
            const file = array[index];
            body.images.push(`${process.env.ROOT_URL}/images/${file.filename}`)
        }

        const newType = new Type(req.body);
        await newType.save();
        
        res.status(201).send(newType);
    } catch (error) {
        imagesUtils.deleteReqImages(req)
        res.status(500).send({
            message: error.message
        });
    }
}

typesController.update = async (req, res) => {
    try {
        const {id} = req.params;
        const body = req.body;

        if(req.files && req.files.images) {
            for (let index = 0; index < req.files.images.length; index++) {
                const file = array[index];
                body.images.push(`${process.env.ROOT_URL}/images/${file.filename}`)
            }
        }

        const actualizedType = await Type.findByIdAndUpdate(id, req.body);
        
        res.status(201).send(actualizedType);
    } catch (error) {
        imagesUtils.deleteReqImages(req)
        res.status(500).send({
            message: error.message
        });
    }
}

typesController.delete = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Type.findByIdAndDelete(id);
        
        if(deleted.images) {
            deleted.images.forEach(file => {
                const filename = file.split('/images/')[1];
                const dir = path.join(__dirname, '..', 'public', 'images', filename);
                imagesUtils.deleteImage(dir)
            })

            console.log('Imágenes de la categoría borradas.')
        }

        res.status(200).send(deleted)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

module.exports = typesController;