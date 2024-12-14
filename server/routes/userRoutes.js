const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Mendapatkan daftar pengguna
router.get('/', userController.getAllUsers);

// Mendapatkan profil pengguna berdasarkan ID
router.get('/:user_id', userController.getUserProfile);

// Memperbarui profil pengguna berdasarkan ID
router.patch('/:user_id', userController.updateUserProfile);

module.exports = router;
