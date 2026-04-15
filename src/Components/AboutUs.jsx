import { Users, Target, Lightbulb, Award, Mail, Link, Code, MapPin, Briefcase } from "lucide-react";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-page-wrapper">
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <h1 className="about-main-title">ABOUT US</h1>
          <div className="about-title-divider"></div>
        </div>

        {/* Our Story Section */}
        <div className="about-story-grid">
          <div className="about-story-content">
            <div>
              <h2 className="about-section-title">Our Story</h2>
              <p className="about-text">
                This platform was initiated by Purushottam Gurjar, a passionate B.Tech student at the National Institute of Technology, Warangal. Driven by a vision to make omics data analysis accessible and intuitive, this project bridges the gap between complex bioinformatics workflows and researchers who need powerful yet user-friendly tools.
              </p>
              <p className="about-text">
                What started as an academic exploration has evolved into a comprehensive platform designed to empower researchers, students, and professionals in the field of computational biology and genomics.
              </p>
            </div>

            <div className="about-highlight-box">
              <div className="about-highlight-content">
                <Award className="about-icon-highlight" />
                <div>
                  <h3 className="about-highlight-title">Academic Excellence</h3>
                  <p className="about-highlight-text">
                    Developed at one of India's premier technical institutions, combining cutting-edge research with practical implementation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-founder-card">
            <div className="about-founder-image-wrapper">
              <img src="/src/assets/Bhu image.jpg" alt="Purushottam Gurjar" className="about-founder-image" />
            </div>
            <div className="about-founder-info">
              <h3 className="about-founder-name">Purushottam Gurjar</h3>
              <p className="about-founder-role">Founder & Developer</p>
              <div className="about-founder-details">
                <div className="about-detail-item">
                  <MapPin className="about-detail-icon" />
                  <span>NIT Warangal</span>
                </div>
                <div className="about-detail-item">
                  <Briefcase className="about-detail-icon" />
                  <span>Research Intern at IIT BhU</span>
                </div>
              </div>
              <p className="about-founder-description">
                B.Tech Student at National Institute of Technology, Warangal. Worked as a Research Intern at IIT BhU and initiated this project to democratize omics data analysis.
              </p>
              <div className="about-social-links">
                <button className="about-social-btn" title="Email">
                  <Mail className="about-social-icon" />
                </button>
                <button className="about-social-btn" title="LinkedIn">
                  <Link className="about-social-icon" />
                </button>
                <button className="about-social-btn" title="GitHub">
                  <Code className="about-social-icon" />
                </button>
                <div className="about-mentor-social">
                  <a href="https://purushottam.online" target="_blank" rel="noopener noreferrer" className="about-mentor-social-link">
                    Visit Purushottam's Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mentors Section */}
        <div className="about-mentors-section">
          <h2 className="about-section-title-center">Our Mentor</h2>
          <div className="about-mentor-card">
            <div className="about-mentor-content">
              <div className="about-mentor-image-wrapper">
                <img src="/src/assets/bt-asimbikas.jpg" alt="Prof. Asim Bikas Das" className="about-mentor-image" />
              </div>
              <div className="about-mentor-info">
                <h3 className="about-mentor-name">Prof. Asim Bikas Das</h3>
                <p className="about-mentor-title">Associate Professor</p>
                <p className="about-mentor-dept">Department of Biotechnology</p>
                <p className="about-mentor-institute">NIT Warangal</p>
                
                <div className="about-mentor-stats">
                  <div className="about-stat">
                    <div className="about-stat-number">24</div>
                    <div className="about-stat-label">Publications</div>
                  </div>
                  <div className="about-stat">
                    <div className="about-stat-number">6</div>
                    <div className="about-stat-label">Doctoral Students</div>
                  </div>
                  <div className="about-stat">
                    <div className="about-stat-number">4</div>
                    <div className="about-stat-label">Projects</div>
                  </div>
                </div>

                <div className="about-mentor-research">
                  <h4 className="about-research-title">Research Areas</h4>
                  <ul className="about-research-list">
                    <li>AI and Precision Medicine</li>
                    <li>Computational Genomics</li>
                    <li>Network Systems Biology</li>
                  </ul>
                </div>

                <div className="about-mentor-contact">
                  <p><strong>Room:</strong> 426</p>
                  <p><strong>Email:</strong> asimbikas@nitw.ac.in</p>
                  <p><strong>Phone:</strong> +91-870-2462899</p>
                </div>

                <div className="about-mentor-social">
                  <a href="https://asimbikas.wixsite.com/asimbikas" target="_blank" rel="noopener noreferrer" className="about-mentor-social-link">
                    Visit Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purpose & Vision Section */}
        <div className="about-vision-section">
          <h2 className="about-section-title-center">Purpose & Vision</h2>
          <div className="about-vision-grid">
            <div className="about-vision-card">
              <div className="about-vision-icon-wrapper">
                <Target className="about-vision-icon" />
              </div>
              <h3 className="about-vision-title">Democratize Analysis</h3>
              <p className="about-vision-text">
                Make advanced omics data analysis accessible to researchers regardless of their computational background or programming expertise.
              </p>
            </div>

            <div className="about-vision-card">
              <div className="about-vision-icon-wrapper">
                <Lightbulb className="about-vision-icon" />
              </div>
              <h3 className="about-vision-title">Accelerate Research</h3>
              <p className="about-vision-text">
                Streamline bioinformatics workflows to help researchers focus on insights rather than technical implementation challenges.
              </p>
            </div>

            <div className="about-vision-card">
              <div className="about-vision-icon-wrapper">
                <Users className="about-vision-icon" />
              </div>
              <h3 className="about-vision-title">Foster Collaboration</h3>
              <p className="about-vision-text">
                Create a unified platform where researchers can share methodologies, visualizations, and discoveries in genomics and proteomics.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="about-services-section">
          <h2 className="about-services-title">What We Serve</h2>
          <div className="about-services-grid">
            <div className="about-service-item">
              <div className="about-service-marker"></div>
              <div>
                <h3 className="about-service-name">Interactive Data Visualization</h3>
                <p className="about-service-text">
                  PCA plots, volcano plots, and heatmaps with intuitive controls for exploring multi-dimensional omics datasets.
                </p>
              </div>
            </div>

            <div className="about-service-item">
              <div className="about-service-marker"></div>
              <div>
                <h3 className="about-service-name">Multi-Omics Integration</h3>
                <p className="about-service-text">
                  Combine genomics, transcriptomics, proteomics, and metabolomics data for comprehensive biological insights.
                </p>
              </div>
            </div>

            <div className="about-service-item">
              <div className="about-service-marker"></div>
              <div>
                <h3 className="about-service-name">Cloud-Based Processing</h3>
                <p className="about-service-text">
                  No local installation required. Process large datasets efficiently with cloud computing infrastructure.
                </p>
              </div>
            </div>

            <div className="about-service-item">
              <div className="about-service-marker"></div>
              <div>
                <h3 className="about-service-name">Educational Resource</h3>
                <p className="about-service-text">
                  Serve as a learning platform for students and early-career researchers entering computational biology.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta-section">
          <h2 className="about-cta-title">Join Our Journey</h2>
          <p className="about-cta-text">
            We're continuously improving and expanding our platform. Your feedback and contributions help shape the future of accessible bioinformatics tools.
          </p>
          <button className="about-cta-btn">Get In Touch</button>
        </div>
      </div>
    </div>
  );
}
