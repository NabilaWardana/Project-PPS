//controllers/productController.js
const productModel = require('../models/productModel');

// Menampilkan semua produk yang diurutkan berdasarkan kolom yang diberikan
exports.getAllProducts = (req, res) => {
    const orderBy = req.query.orderBy || 'created_at'; // Default urutkan berdasarkan created_at
    productModel.getAllProducts(orderBy, (err, products) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ success: true, data: products });
    });
};

// Menampilkan detail produk berdasarkan ID
exports.getProductById = (req, res) => {
    const productId = req.params.product_id;
    productModel.getProductById(productId, (err, product) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    });
};

// Menambahkan produk baru
exports.addProduct = (req, res) => {
    const { nama_produk, harga, deskripsi, stock, size, gambar, category_id } = req.body;

    // Validasi input
    if (!nama_produk || !harga || !deskripsi || !stock || !size || !gambar || !category_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = { nama_produk, harga, deskripsi, stock, size, gambar, category_id };
    productModel.addProduct(newProduct, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ success: true, message: 'Product added successfully', data: result });
    });
};

// Mengupdate produk berdasarkan ID (menggunakan PATCH)
exports.updateProduct = (req, res) => {
    const productId = req.params.product_id;
    const updatedData = req.body;

    // Pastikan ada data untuk diperbarui
    if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: 'No data to update' });
    }

    // Menggunakan metode PATCH untuk memperbarui sebagian data produk
    productModel.updateProductById(productId, updatedData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product updated successfully' });
    });
};

// Menghapus produk berdasarkan ID
exports.deleteProduct = (req, res) => {
    const productId = req.params.product_id;
    productModel.deleteProductById(productId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    });
};

// Menampilkan daftar produk berdasarkan kategori
exports.getProductsByCategory = (req, res) => {
    const categoryId = req.params.category_id;
    productModel.getProductsByCategory(categoryId, (err, products) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ success: true, data: products });
    });
};
