import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo/Brand */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}><img src={`${process.env.PUBLIC_URL}/TMNT-LOGO.png`} alt='TMNT' className='logo-image'/></Link>
        </div>

        {/* Hamburger Menu Button */}
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
          <Link to="/projects" className="nav-link" onClick={closeMenu}>Projects</Link>
          <Link to="/skills" className="nav-link" onClick={closeMenu}>Skills</Link>
          <Link to="/experience" className="nav-link" onClick={closeMenu}>Experience</Link>
          <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;