const express = require('express');

const productsController = require('../controllers/productController');

const router = express.Router();

router.post('/', productsController.createProduct);
router.get('/:id', productsController.getById);
router.get('/', productsController.getAll);

module.exports = router;