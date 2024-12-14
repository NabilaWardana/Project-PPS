const userModel = require('../models/userModel');

// Menampilkan daftar pengguna
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Menampilkan profil pengguna berdasarkan user_id
exports.getUserProfile = async (req, res) => {
  const userId = req.params.user_id;

  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update profil pengguna
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


// Hapus akun pengguna
exports.deleteUserAccount = async (req, res) => {
  const userId = req.params.user_id;

  try {
    const results = await userModel.deleteUserById(userId);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

