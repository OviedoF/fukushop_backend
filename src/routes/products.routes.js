const express = require('express')
const router = express.Router();
const path = require('path');
const productController = require(path.join(__dirname, '..', 'controllers', 'product.controller'));

router.get('/', productController.getAll);
router.get('/:name', productController.getOne);

router.post('/filter', productController.filter);
router.post('/', productController.create);

router.put('/:id', productController.update);

router.delete('/:id', productController.delete);

module.exports = router;