import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import file CSS untuk styling

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">HeyJuice</div>
      <nav className="nav">
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="#menu">Menu</Link></li>
          <li><Link to="#contact">Contact</Link></li>
          <li><button className="order-btn">Order now</button></li>
          <li><Link to="profile" className="profile-link">Profil Saya</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
