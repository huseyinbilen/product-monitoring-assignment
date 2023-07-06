const express = require('express');
const router = express.Router();

const productController = require('../controllers/productControllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/add').post(authMiddleware, productController.addProduct);
router.route('/update').post(authMiddleware, productController.updateProduct);
router.route('/delete').delete(authMiddleware, productController.deleteProduct);
router.route('/get-product/:id').get(authMiddleware, productController.getProduct);
router.route('/get-products').get(authMiddleware, productController.getAllProducts);

module.exports = router;