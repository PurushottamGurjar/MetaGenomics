import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';


const NavBar = () => {
  const navigator = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'ABOUT', href: 'about' },
    { name: 'BENEFITS', href: 'benefits' },
    { name: 'PLATFORMS', href: 'platforms' },
    { name: 'RESOURCES', href: 'resources' },
    { name: 'CONTACT US', href: 'contact' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">MetaGenomics</div>
        
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <a key={index} href={link.href}>
              {link.name}
            </a>
          ))}
        </nav>

        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        
        <div className={`auth-section mobile ${isMenuOpen ? 'active' : ''}`}>
          <a onClick={()=>navigator('/login')} >Log In</a>
          <span className="separator">|</span>
          <a onClick={()=>navigator('/register')}>Register</a>
        </div>
      </div>
    </header>
  );
};

export default NavBar
