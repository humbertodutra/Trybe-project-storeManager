const express = require('express');

const productsController = require('../controllers/productController');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/search/', productsController.search);
router.get('/:id', productsController.getById);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;