const path = require('path');
const {Product, ProductColor} = require(path.join(__dirname, '..', 'models', 'product.model'))
const productController = {};

productController.get = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).send(products);
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Ha ocurrido un error'})
    }
}

productController.create = async (req, res) => {
    try {
        const body = req.body;
        const ColorsKeys = await ProductColor.find({imageKey: true});
        const colors = [];

        ColorsKeys.map(key => {
            if(req.files[key]) {
                const dataColor = body.colors.find(el => el.key == key);
                // const {}

                // colors.push({
                //     name: dataColor.name,
                //     hex: dataColor.hex,
                //     principalImage: 
                // })
            }
        })

        res.status(200).send(products);
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Ha ocurrido un error'})
    }
}



module.exports = productController;