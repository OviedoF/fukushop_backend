const path = require('path');
const {Product, ProductColor} = require(path.join(__dirname, '..', 'models', 'product.model'))
const productController = {};
const {deleteReqImages} = require(path.join(__dirname, '..', 'utils', 'images.utils'));
require('dotenv').config();

productController.getAll = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).send(products);
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Ha ocurrido un error'})
    }
}

productController.getOne = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findById(id);

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
        const colors = JSON.parse(req.body.colors);

        for (let index = 0; index < colors.length; index++) {
            const color = colors[index];
            
            if(req.files[color.imageKey]) {
                const images = req.files[color.imageKey].map((image, index) => {
                    const {filename} = image;
                    return `${process.env.ROOT_URL}/images/${filename}`;
                })

                colors[index].principalImage = images.shift();
                colors[index].images = images;
            }
        }

        const product = new Product({
            ...body,
            colors
        })

        console.log(product)

        await product.save();

        res.status(200).send({message: 'Producto creado correctamente!'});
    } catch (error) {
        deleteReqImages(req);
        console.log(error)
        res.status(500).send({message: 'Ha ocurrido un error!'})
    }
}



module.exports = productController;