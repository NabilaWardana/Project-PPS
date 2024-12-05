//controlles/categoryController.js
const categoryModel = require('../models/categoryModel');

// Menambahkan kategori baru
exports.addCategory = (req, res) => {
  const { category } = req.body;

  // Validasi input
  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  // Panggil model untuk menambahkan kategori
  categoryModel.addCategory({ category }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, message: 'Category added successfully' });
  });
};

// Menampilkan semua kategori
exports.getAllCategories = (req, res) => {
  // Panggil model untuk mengambil semua kategori
  categoryModel.getAllCategories((err, categories) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ success: true, data: categories });
  });
};

// Menampilkan kategori berdasarkan ID
exports.getCategoryById = (req, res) => {
  const categoryId = req.params.category_id;

  // Panggil model untuk mengambil kategori berdasarkan ID
  categoryModel.getCategoryById(categoryId, (err, category) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: category });
  });
};

// Mengedit kategori berdasarkan ID
exports.updateCategoryById = (req, res) => {
  const categoryId = req.params.category_id;
  const { category } = req.body;

  // Validasi input
  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  // Panggil model untuk memperbarui kategori
  categoryModel.updateCategoryById(categoryId, { category }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category updated successfully' });
  });
};

// Menghapus kategori berdasarkan ID
exports.deleteCategoryById = (req, res) => {
  const categoryId = req.params.category_id;

  // Panggil model untuk menghapus kategori
  categoryModel.deleteCategoryById(categoryId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  });
};
