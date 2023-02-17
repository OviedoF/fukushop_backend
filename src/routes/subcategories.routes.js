const express = require('express')
const router = express.Router();
const path = require('path');
const subCategoriesController = require(path.join(__dirname, '..', 'controllers', 'subCategories.controller'));

router.get('/', subCategoriesController.getAll);

router.post('/', subCategoriesController.create)

router.put('/:id', subCategoriesController.update);

router.delete('/:id', subCategoriesController.delete);

module.exports = router;