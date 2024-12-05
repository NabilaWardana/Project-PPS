// models/userModel.js
const db = require('../config/database');

// Ambil semua pengguna
exports.getAllUsers = (callback) => {
    const sql = `
        SELECT user_id, role, nama_lengkap, no_hp, alamat, email
        FROM users
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return callback(err);
        }
        callback(null, results);
    });
};

// Ambil pengguna berdasarkan ID
exports.getUserById = (userId, callback) => {
    const sql = `
        SELECT user_id, role, nama_lengkap, no_hp, alamat, email
        FROM users
        WHERE user_id = ?
    `;
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(`Error fetching user with ID ${userId}:`, err);
            return callback(err);
        }
        if (results.length === 0) {
            return callback(new Error(`User with ID ${userId} not found`));
        }
        callback(null, results[0]);
    });
};

// Perbarui pengguna berdasarkan ID (support PATCH)
exports.updateUserById = (userId, data, callback) => {
    // Cek atribut yang disertakan dalam data
    let updateFields = [];
    let values = [];

    if (data.nama_lengkap) {
        updateFields.push('nama_lengkap = ?');
        values.push(data.nama_lengkap);
    }
    if (data.no_hp) {
        updateFields.push('no_hp = ?');
        values.push(data.no_hp);
    }
    if (data.alamat) {
        updateFields.push('alamat = ?');
        values.push(data.alamat);
    }
    if (data.email) {
        updateFields.push('email = ?');
        values.push(data.email);
    }

    // Jika tidak ada atribut yang diberikan untuk diperbarui
    if (updateFields.length === 0) {
        return callback(new Error('No valid fields provided for update'));
    }

    // Menambahkan user_id untuk kondisi WHERE
    values.push(userId);

    const sql = `
        UPDATE users
        SET ${updateFields.join(', ')}
        WHERE user_id = ?
    `;

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(`Error updating user with ID ${userId}:`, err);
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(new Error(`User with ID ${userId} not found`));
        }
        callback(null, results);
    });
};
