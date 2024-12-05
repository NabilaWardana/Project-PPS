const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Endpoint untuk menambahkan kategori baru
router.post('/', categoryController.addCategory);

// Endpoint untuk menampilkan semua kategori
router.get('/', categoryController.getAllCategories);

// Endpoint untuk menampilkan kategori berdasarkan ID
router.get('/:category_id', categoryController.getCategoryById);

// Endpoint untuk mengedit kategori berdasarkan ID
router.put('/:category_id', categoryController.updateCategoryById);

// Endpoint untuk menghapus kategori berdasarkan ID
router.delete('/:category_id', categoryController.deleteCategoryById);

module.exports = router;
