const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Menampilkan semua produk yang diurutkan berdasarkan kolom yang diberikan
router.get('/', productController.getAllProducts);

// Menampilkan produk berdasarkan ID
router.get('/:product_id', productController.getProductById);

// Menambahkan produk baru
router.post('/', productController.addProduct);

// Mengupdate produk sebagian berdasarkan ID (Menggunakan PATCH)
router.patch('/:product_id', productController.updateProduct);

// Menghapus produk berdasarkan ID
router.delete('/:product_id', productController.deleteProduct);

// Menampilkan produk berdasarkan kategori
router.get('/category/:category_id', productController.getProductsByCategory);

module.exports = router;
