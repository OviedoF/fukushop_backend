const path = require('path');
const {SubCategory, Category} = require(path.join(__dirname, '..', 'models', 'category.model'))
const subCategoryController = {};
const imagesUtils = require(path.join(__dirname, '..', 'utils', 'images.utils'))
require('dotenv').config();

subCategoryController.getAll = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).send(subCategories)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

subCategoryController.getOne = async (req, res) => {
    try {
        const {id} = req.params;
        const subCategory = await SubCategory.findById(id);
        res.status(200).send(subCategory)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

subCategoryController.create = async (req, res) => {
    try {
        const body = req.body;

        if(!req.files) return res.status(500).send({message: 'Las imágenes son necesarias.'})

        body.images = [];

        for (let index = 0; index < req.files.images.length; index++) {
            const file = req.files.images[index];
            body.images.push(`${process.env.ROOT_URL}/images/${file.filename}`)
        }

        const newSubCategory = new SubCategory(req.body);

        await Category.findByIdAndUpdate(req.body.category, {$push: {subCategories: newSubCategory._id}})
        await newSubCategory.save();
        
        res.status(201).send(newSubCategory);
    } catch (error) {
        imagesUtils.deleteReqImages(req);
        console.log(error)
        res.status(500).send({
            message: error.message
        });
    }
}

subCategoryController.update = async (req, res) => {
    try {
        const {id} = req.params;
        const body = req.body;

        if(req.files && req.files.images) {
            for (let index = 0; index < req.files.images.length; index++) {
                const file = array[index];
                body.images.push(`${process.env.ROOT_URL}/images/${file.filename}`)
            }
        }

        const newSubCategory = await SubCategory.findByIdAndUpdate(id, req.body);(req.body);
        
        res.status(201).send(newSubCategory);
    } catch (error) {
        imagesUtils.deleteReqImages(req)
        res.status(500).send({
            message: error.message
        });
    }
}

subCategoryController.delete = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await SubCategory.findByIdAndDelete(id);
        
        if(deleted.images) {
            deleted.images.forEach(file => {
                const filename = file.split('/images/')[1];
                const dir = path.join(__dirname, '..', 'public', 'images', filename);
                imagesUtils.deleteImage(dir)
            })

            console.log('Imágenes de la sub-categoría borradas.')
        }

        res.status(200).send(deleted)
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

module.exports = subCategoryController;