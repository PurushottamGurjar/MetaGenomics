import React, { useEffect } from 'react';
import './notfound.css';

const NotFound = () => {
  useEffect(() => {
    // Generate floating particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 50 + 10;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-50px';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
      }
    }

    // Cleanup function
    return () => {
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="notfound-wrapper">
      {/* Background effects */}
      <div className="grid"></div>
      <div className="dna-background">
        <div className="helix-strand"></div>
        <div className="helix-strand"></div>
        <div className="helix-strand"></div>
        <div className="helix-strand"></div>
      </div>
      <div className="particles" id="particles"></div>
      <div className="glow-orb"></div>

      {/* Main content */}
      <div className="notfound-container">
        <div className="error-code">404</div>
        
        <div className="icon-container">
          <span className="construction-icon">🔬</span>
          <span className="construction-icon">🧬</span>
          <span className="construction-icon">⚡</span>
        </div>

        <h1>Page Under Development</h1>
        <p className="subtitle">Our expert team is working diligently to bring this page to life. We're building cutting-edge genomics solutions that will revolutionize research.</p>

        <div className="progress-wrapper">
          <div className="status-badge">
            <div className="spinner"></div>
            <span>Development in Progress</span>
          </div>
          
          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
          <p className="progress-text">Our scientists are crafting something extraordinary</p>
        </div>


        <a href="/" className="notfound-btn">Return to Homepage</a>
      </div>
    </div>
  );
};

export default NotFound;