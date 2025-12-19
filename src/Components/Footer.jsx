import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="genomics-footer">
      <div className="footer-container">
        <div className="footer-columns">
          {/* Navigation Section */}
          <div className="footer-col">
            <h3 className="footer-heading">NAVIGATION</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#benefits">Benefits</a></li>
              <li><a href="#platforms">Platforms</a></li>
              <li><a href="#resources">Resources</a></li>
            </ul>
          </div>

          {/* Links Section */}
          <div className="footer-col">
            <h3 className="footer-heading">LINKS</h3>
            <ul className="footer-links">
              <li><a href="#login">Log in</a> | <a href="#register">Register</a></li>
              <li><a href="#sequencing">DNA Sequencing</a></li>
              <li><a href="#analysis">Genome Analysis</a></li>
              <li><a href="#bioinformatics">Bioinformatics</a></li>
              <li><a href="#consulting">Research Consulting</a></li>
            </ul>
          </div>

          {/* Where to Find Us Section */}
          <div className="footer-col">
            <h3 className="footer-heading">WHERE TO FIND US</h3>
            <div className="footer-contact">
              <p className="company-name">MetaGenomics</p>
              <p>6th Floor, Biotech Building</p>
              <p>National Institute of Technology ,Warangal</p>
              <p className="contact-info">Phone: +1 555 123 4567</p>
              <p className="contact-info">Email: info@metagenomics.com</p>
            </div>
          </div>

          {/* Legal Section */}
          <div className="footer-col">
            <h3 className="footer-heading">LEGAL</h3>
            <ul className="footer-links">
              <li><a href="#impressum">Impressum</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#privacy">Privacy policy</a></li>
              <li><a href="#terms">Terms and conditions</a></li>
              <li><a href="#service">Service level agreement</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="footer-copyright">
          <p>&copy; 2025 MetaGenomics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;