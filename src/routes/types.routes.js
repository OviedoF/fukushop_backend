const express = require('express')
const router = express.Router();
const path = require('path');
const typesController = require(path.join(__dirname, '..', 'controllers', 'types.controller'));

router.get('/', typesController.getAll);

router.post('/', typesController.create)

router.put('/:id', typesController.update);

router.delete('/:id', typesController.delete);

module.exports = router;