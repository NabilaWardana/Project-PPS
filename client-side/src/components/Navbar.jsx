import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Impor CSS Bootstrap

const Navbar = () => {
  return (
    <BootstrapNavbar bg="light" expand="lg" className="shadow-sm">
      {/* Menambahkan padding di sebelah kiri logo */}
      <BootstrapNavbar.Brand as={Link} to="/" className="font-weight-bold ps-4">
        HeyJuice
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <BootstrapNavbar.Collapse id="navbar-nav">
        {/* Menu di sebelah kanan dengan ms-auto */}
        <Nav className="ms-auto pe-4"> {/* `pe-4` menambahkan padding di kanan */}
          <Nav.Link as={Link} to="/home" className="px-3">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="#menu" className="px-3">Manajemen Pesanan</Nav.Link>
          <Nav.Link as={Link} to="#menu" className="px-3">Laporan</Nav.Link>
          <Nav.Link as={Link} to="/productmanagement" className="px-3 order-btn">Manajemen Produk</Nav.Link>
          <Nav.Link as={Link} to="/profiles" className="px-3 profile-link">Profil Saya</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
