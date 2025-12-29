import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../context/AuthContext';
import './navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'BENEFITS', href: '#benefits' },
    { name: 'PLATFORMS', href: '#platforms' },
    { name: 'RESOURCES', href: '#resources' },
    { name: 'CONTACT US', href: '#contact' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')}>
          MetaGenomics
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          
          {/* Mobile auth section */}
          <div className="mobile-auth">
            {user ? (
              <>
                <div className="mobile-user-info">
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="mobile-logout-btn">
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button onClick={handleLogin} className="mobile-login-btn">
                Login
              </button>
            )}
          </div>
        </nav>

        {/* Desktop auth section */}
        <div className="auth-container">
          {user ? (
            <div className="user-section">
              <div className="user-info">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <span className="logout-icon">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="login-btn">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;