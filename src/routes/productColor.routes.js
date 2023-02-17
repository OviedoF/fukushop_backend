const express = require('express')
const router = express.Router();
const path = require('path');
const productColorController = require(path.join(__dirname, '..', 'controllers', 'productColor.controller'));

router.get('/', productColorController.getAll);

router.post('/', productColorController.create)

router.put('/:id', productColorController.updateOne);

router.delete('/:id', productColorController.delete);

module.exports = router;