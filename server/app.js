// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require("path");

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serving images from 'uploads' folder

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Tambahan untuk kategori

// Middleware
app.use(cors()); // Aktifkan CORS untuk semua permintaan
app.use(bodyParser.json()); // Middleware untuk parse JSON

// Routes
app.use('/api/users', userRoutes); // Route untuk user management
app.use('/api/products', productRoutes); // Route untuk product management
app.use('/api/categories', categoryRoutes); // Route untuk category management

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
