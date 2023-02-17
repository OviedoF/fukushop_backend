const express = require('express')
const router = express.Router();
const path = require('path');
const sizesController = require(path.join(__dirname, '..', 'controllers', 'sizes.controller'));

router.get('/', sizesController.getAll);

router.post('/', sizesController.create)

router.put('/:id', sizesController.updateOne);

router.delete('/:id', sizesController.delete);

module.exports = router;