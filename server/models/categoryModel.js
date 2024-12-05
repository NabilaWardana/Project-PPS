//models/categoryModel.js
const db = require('../config/database');

// Menambahkan kategori baru
exports.addCategory = (categoryData, callback) => {
  const { category } = categoryData;
  const query = `
    INSERT INTO categories (category, created_at, updated_at)
    VALUES (?, NOW(), NOW())
  `;

  db.query(query, [category], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Mengambil semua kategori
exports.getAllCategories = (callback) => {
  const query = 'SELECT * FROM categories ORDER BY created_at DESC';

  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Mengambil kategori berdasarkan ID
exports.getCategoryById = (categoryId, callback) => {
  const query = 'SELECT * FROM categories WHERE category_id = ?';

  db.query(query, [categoryId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

// Mengedit kategori berdasarkan ID
exports.updateCategoryById = (categoryId, categoryData, callback) => {
  const { category } = categoryData;
  const query = `
    UPDATE categories
    SET category = ?, updated_at = NOW()
    WHERE category_id = ?
  `;

  db.query(query, [category, categoryId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Menghapus kategori berdasarkan ID
exports.deleteCategoryById = (categoryId, callback) => {
  const query = 'DELETE FROM categories WHERE category_id = ?';

  db.query(query, [categoryId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};
