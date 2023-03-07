const path = require('path');
const {Product, ProductVariant, ProductColor} = require(path.join(__dirname, '..', 'models', 'product.model'))
const productController = {};
const {deleteReqImages} = require(path.join(__dirname, '..', 'utils', 'images.utils'));
require('dotenv').config();

productController.getAll = async (req, res) => {
    try {
        const products = await Product.find().deepPopulate(['clothe_type', 'category', 'subCategory', 'variants.color', 'variants.size', 'variants.image', 'variants.gallery']);

        res.status(200).send(products);
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Ha ocurrido un error'})
    }
}

productController.getOne = async (req, res) => {
    try {
        const {name} = req.params;

        const product = await Product.findOne({name}).deepPopulate(['clothe_type', 'category', 'subCategory', 'variants.color', 'variants.size']);

        if(!product) return res.status(404).send({message: 'Producto inexistente'});

        res.status(200).send(product);
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Ha ocurrido un error'})
    }
}

productController.create = async (req, res) => {
    try {
        const body = JSON.parse(req.body.body);

        const imagesKeys = Object.keys(req.files);
        
        for (const key of imagesKeys) {
            const color = await ProductColor.findOne({imageKey: key});

            if(color && body.variants) {
                body.variants.forEach(variant => {
                    if(variant.color === color._id.toString()) {
                        variant.image = `${process.env.ROOT_URL}/images/${req.files[key][0].filename}`;
                        variant.gallery = req.files[key].map((image, index) => {
                            if(index !== 0) return `${process.env.ROOT_URL}/images/${image.filename}`;
                        });
                    }
                });
            }
        }

        const variantsCreated = [];

        for (const variant of body.variants) {
            console.log(variant)
            const productVariant = new ProductVariant(variant);
            variantsCreated.push(productVariant._id);
            await productVariant.save();
        }

        body.variants = variantsCreated;

        const product = new Product(body);

        await product.save();

        res.status(200).send({message: 'Producto creado correctamente!'});
    } catch (error) {
        deleteReqImages(req);
        console.log(error)
        res.status(500).send({message: 'Ha ocurrido un error!'})
    }
}



module.exports = productController;