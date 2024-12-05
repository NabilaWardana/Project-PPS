const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint untuk melihat daftar pengguna
router.get('/', userController.getAllUsers);

// Endpoint untuk melihat profil pengguna berdasarkan user_id
router.get('/:user_id', userController.getUserProfile);

// Endpoint untuk memperbarui profil pengguna (partial update)
router.patch('/:user_id', userController.updateUserProfile);  // Menggunakan PATCH untuk pembaruan parsial

module.exports = router;
