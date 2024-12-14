import React from 'react';
import ReactDOM from 'react-dom/client'; // Ubah impor dari 'react-dom' ke 'react-dom/client'
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Impor Bootstrap CSS

const root = ReactDOM.createRoot(document.getElementById('root')); // Buat root menggunakan createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
