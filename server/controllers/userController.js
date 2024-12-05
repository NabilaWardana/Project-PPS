// controllers/userController.js
const db = require('../config/database');

//menampilkan daftar pengguna
const userModel = require('../models/userModel');

// Menampilkan daftar pengguna
exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ success: true, data: users });
  });
};

// Menampilkan profil pengguna berdasarkan user_id (GET)
exports.getUserProfile = (req, res) => {
  const userId = req.params.user_id;

  userModel.getUserById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  });
};

// Update Profil Pengguna (PATCH)
exports.updateUserProfile = (req, res) => {
  const userId = req.params.user_id;
  const { nama_lengkap, no_hp, alamat, email } = req.body;

  // Validasi input: memeriksa setidaknya satu atribut yang diberikan
  if (!nama_lengkap && !no_hp && !alamat && !email) {
    return res.status(400).json({ message: 'At least one field (nama_lengkap, no_hp, alamat, email) is required to update' });
  }

  const updatedData = { nama_lengkap, no_hp, alamat, email };

  userModel.updateUserById(userId, updatedData, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User profile updated successfully' });
  });
};
