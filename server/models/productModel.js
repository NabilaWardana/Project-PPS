const db = require('../config/database');

// Ambil semua produk, bisa diurutkan berdasarkan kategori, harga, atau nama produk
exports.getAllProducts = (orderBy, callback) => {
    const validColumns = ['nama_produk', 'harga', 'kategori', 'created_at']; // Kolom yang valid untuk diurutkan
    
    if (!validColumns.includes(orderBy)) {
        return callback(new Error('Invalid column for sorting'), null);
    }

    const sql = `SELECT * FROM products ORDER BY ${orderBy}`;
    db.query(sql, callback);
};

// Ambil produk berdasarkan ID
exports.getProductById = (productId, callback) => {
    const sql = 'SELECT * FROM products WHERE product_id = ?';
    db.query(sql, [productId], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) {
            return callback(new Error('Product not found'));
        }
        callback(null, results[0]);
    });
};

// Menambahkan produk baru ke dalam kategori
exports.addProduct = (data, callback) => {
    const sql = `
        INSERT INTO products (nama_produk, harga, deskripsi, stock, size, gambar, category_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    db.query(sql, [data.nama_produk, data.harga, data.deskripsi, data.stock, data.size, data.gambar, data.category_id], callback);
};

// Mengupdate produk berdasarkan ID (Menggunakan PATCH)
exports.updateProductById = (productId, updatedData, callback) => {
    let fields = [];
    let values = [];

    // Periksa data mana yang akan diupdate dan susun query
    for (const [key, value] of Object.entries(updatedData)) {
        if (value !== undefined) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
    }

    if (fields.length === 0) {
        return callback(new Error('No valid fields to update'), null);
    }

    values.push(productId);
    const sql = `UPDATE products SET ${fields.join(', ')} WHERE product_id = ?`;
    db.query(sql, values, callback);
};

// Menghapus produk berdasarkan ID
exports.deleteProductById = (productId, callback) => {
    const sql = 'DELETE FROM products WHERE product_id = ?';
    db.query(sql, [productId], callback);
};

// Menampilkan daftar produk berdasarkan kategori
exports.getProductsByCategory = (categoryId, callback) => {
    const sql = 'SELECT * FROM products WHERE category_id = ?';
    db.query(sql, [categoryId], callback);
};
