import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserProfile from "./pages/UserProfile";
import Home from './pages/Home';
import Footer from './components/Footer';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profiles" element={<Profile />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
