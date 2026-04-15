import { Code, Microscope, Users, Upload, MousePointer } from "lucide-react";
import "./Benefits.css";

export default function Benefits() {
  return (
    <div className="benefits-page-wrapper">
      <div className="benefits-container">
        {/* Benefits Header */}
        <div className="benefits-header">
          <h1 className="benefits-main-title">Benefits</h1>
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid">
          <div className="benefits-card">
            <div className="benefits-image-wrapper">
              <img src="/src/assets/benefit1.webp" alt="Bioinformaticians" className="benefits-image" />
            </div>
            <h2 className="benefits-card-title">For Bioinformaticians</h2>
            <p className="benefits-card-text">
              Off-load repetitive tasks like data exploration, filtering tables, and creating graphs thanks to our intuitive interfaces.
            </p>
          </div>

          <div className="benefits-card">
            <div className="benefits-image-wrapper">
              <img src="/src/assets/benefit2.webp" alt="Biologists" className="benefits-image" />
            </div>
            <h2 className="benefits-card-title">For Biologists</h2>
            <p className="benefits-card-text">
              Discover more, analyze less. Access your RNA-Seq and proteomics data effortlessly, no coding required. Perform PCA analysis and more without writing a single line of code.
            </p>
          </div>

          <div className="benefits-card">
            <div className="benefits-image-wrapper">
              <img src="/src/assets/benefit3.webp" alt="Managers and PIs" className="benefits-image" />
            </div>
            <h2 className="benefits-card-title">Zero Coding Requirement</h2>
            <p className="benefits-card-text">
              No Coding Required. Perform PCA analysis and more without writing a single line of code and multiple graph analysis.
            </p>
          </div>
        </div>

        {/* How to Get Started Section */}
        <div className="started-section">
          <h1 className="started-main-title">How to get started</h1>

          <div className="started-grid">
            <div className="started-card">
              <div className="started-step">
                <span className="started-step-number">Step 1</span>
              </div>
              <div className="started-image-wrapper">
                <img src="/src/assets/started1.webp" alt="Register" className="started-image" />
              </div>
              <h3 className="started-card-title">Register</h3>
              <p className="started-card-text">
                Create a trial account using your work or institutional email.
              </p>
            </div>

            <div className="started-card">
              <div className="started-step">
                <span className="started-step-number">Step 2</span>
              </div>
              <div className="started-image-wrapper">
                <img src="/src/assets/started2.webp" alt="Upload data" className="started-image" />
              </div>
              <h3 className="started-card-title">Upload your data</h3>
              <p className="started-card-text">
                Explore public datasets or upload up to 4 RNA-Seq or proteomics datasets for free.
              </p>
            </div>

            <div className="started-card">
              <div className="started-step">
                <span className="started-step-number">Step 3</span>
              </div>
              <div className="started-image-wrapper">
                <img src="/src/assets/started3.webp" alt="Explore" className="started-image" />
              </div>
              <h3 className="started-card-title">Have fun exploring!</h3>
              <p className="started-card-text">
                Start exploring your data. Chat with us if you need help. We are here to support you.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="features-section">
          <h2 className="features-title">Key Features</h2>
          <div className="features-grid">
            <div className="features-item">
              <div className="features-image-wrapper">
                <img src="/src/assets/benefit3.webp" alt="Multiple Graphs" className="features-image" />
              </div>
              <h3 className="features-item-title">Analyze Multiple Graphs</h3>
              <p className="features-item-text">Visualize complex datasets with interactive charts and plots</p>
            </div>
            <div className="features-item">
              <div className="features-image-wrapper">
                <img src="/src/assets/benefit2.webp" alt="No Coding" className="features-image" />
              </div>
              <h3 className="features-item-title">No Coding Required</h3>
              <p className="features-item-text">Perform PCA analysis and more without writing a single line of code</p>
            </div>
            <div className="features-item">
              <div className="features-image-wrapper">
                <img src="/src/assets/benefit1.webp" alt="Single Click" className="features-image" />
              </div>
              <h3 className="features-item-title">Data at Single Click</h3>
              <p className="features-item-text">Zero installation, everything runs on cloud infrastructure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
