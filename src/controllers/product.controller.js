const path = require('path');
const {Product, ProductColor} = require(path.join(__dirname, '..', 'models', 'product.model'))
const productController = {};
const {deleteReqImages} = require(path.join(__dirname, '..', 'utils', 'images.utils'));

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
        const {body, colors} = req.body;
        console.log(JSON.parse(body));
        console.log(colors);
        console.log(req.files);

        deleteReqImages(req);
        // const ColorsKeys = await ProductColor.find({imageKey: true});
        // const colors = [];

        // ColorsKeys.map(key => {
        //     if(req.files[key]) {
        //         const dataColor = body.colors.find(el => el.key == key);
        //         // const {}

        //         // colors.push({
        //         //     name: dataColor.name,
        //         //     hex: dataColor.hex,
        //         //     principalImage: 
        //         // })
        //     }
        // })

        res.status(200).send({message: 'ok'});
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Ha ocurrido un error'})
    }
}



module.exports = productController;