const express = require('express')
const router = express.Router();
const path = require('path');
const subTypesController = require(path.join(__dirname, '..', 'controllers', 'subTypes.controller'));

router.get('/', subTypesController.getAll);

router.post('/', subTypesController.create)

router.put('/:id', subTypesController.update);

router.delete('/:id', subTypesController.delete);

module.exports = router;