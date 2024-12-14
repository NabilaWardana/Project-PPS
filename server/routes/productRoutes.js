const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require("multer");

// Konfigurasi multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Route untuk menambahkan produk
router.post("/products", upload.single("gambar"), productController.addProduct);

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
