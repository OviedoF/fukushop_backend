const express = require('express');
const router = express.Router();
const path = require('path');
const emailsController = require(path.join(__dirname, '..', 'controllers', 'emails.controller'));

router.post('/contact', emailsController.contactEmail);

module.exports = router;