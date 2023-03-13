const path = require('path');
const {Product, ProductVariant, ProductColor} = require(path.join(__dirname, '..', 'models', 'product.model'))
const productController = {};
const {deleteReqImages} = require(path.join(__dirname, '..', 'utils', 'images.utils'));
require('dotenv').config();
const cloudinary = require(path.join(__dirname, '..', 'config', 'cloudinary.config'));

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

productController.filter = async (req, res) => {
    try {
        const {filters} = req.body;
        const {categories, types, colors, sizes, price} = JSON.parse(filters);

        const products = await Product.find().deepPopulate(['clothe_type', 'category', 'subCategory', 'variants.color', 'variants.size']);

        const filteredProducts = products.filter(product => {
            let category = true;
            let type = true;
            let color = true;
            let size = true;
            let priceFilter = true;

            if(categories.length > 0) {
                category = categories.includes(product.category._id.toString());
            }

            if(types.length > 0) {
                type = types.includes(product.clothe_type._id.toString());
            }

            if(colors.length > 0) {
                color = product.variants.some(variant => colors.includes(variant.color._id.toString()));
            }

            if(sizes.length > 0) {
                size = product.variants.some(variant => sizes.includes(variant.size._id.toString()));
            }

            if(price.length > 0) {
                priceFilter = product.some(variant => variant.price >= price[0] && variant.price <= price[1]);
            }

            return category && type && color && size && priceFilter;
        });

        res.status(200).send(filteredProducts);
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Ha ocurrido un error'})
    }
}

productController.create = async (req, res) => {
    try {
        const body = JSON.parse(req.body.body);
        console.log(req.files)

        const imagesKeys = Object.keys(req.files);
        
        for (const key of imagesKeys) {
            const color = await ProductColor.findOne({imageKey: key});

            if(color && body.variants) {
                body.variants.forEach(variant => {
                    if(variant.color === color._id.toString()) {
                        variant.image = req.files[key][0].cloudinary_url;
                        variant.gallery = req.files[key].map((image, index) => {
                            if(index !== 0) return image.cloudinary_url;
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