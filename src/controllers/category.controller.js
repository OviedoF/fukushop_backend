const path = require('path');
const {Category} = require(path.join(__dirname, '..', 'models', 'category.model'))
const categoryController = {};
const imagesUtils = require(path.join(__dirname, '..', 'utils', 'images.utils'))
require('dotenv').config();

categoryController.getAll = async (req, res) => {
    try {
        const categories = await Category.find().populate('subCategories');
        res.status(200).send(categories)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

categoryController.getOne = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findById(id).populate('subCategories');
        res.status(200).send(category)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

categoryController.create = async (req, res) => {
    try {
        const body = req.body;
        console.log(req.files)
        console.log(req.body)
        
        if(!req.files.images) return res.status(500).send({message: 'Las imágenes son necesarias.'})

        body.image = `${process.env.ROOT_URL}/images/${req.files.images[0].filename}`;

        const newCategory = new Category(body);
        await newCategory.save();
        
        res.status(201).send(newCategory);
    } catch (error) {
        imagesUtils.deleteReqImages(req)
        res.status(500).send({
            message: error.message
        });
    }
}

categoryController.update = async (req, res) => {
    try {
        const {id} = req.params;
        const body = req.body;

        if(req.files && req.files.images) {
            for (let index = 0; index < req.files.images.length; index++) {
                const file = array[index];
                body.images.push(`${process.env.ROOT_URL}/images/${file.filename}`)
            }
        }

        const newCategory = await Category.findByIdAndUpdate(id, req.body);
        
        res.status(201).send(newCategory);
    } catch (error) {
        imagesUtils.deleteReqImages(req)
        res.status(500).send({
            message: error.message
        });
    }
}

categoryController.delete = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Category.findByIdAndDelete(id);
        
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

module.exports = categoryController;