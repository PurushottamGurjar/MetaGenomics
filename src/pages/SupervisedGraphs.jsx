import React, { useState, useRef } from "react";
import ConfusionMatrix from "../Components/Graphs/ConfusionMatrix";
import { fetchConfusion } from "../services/api";
import "./SupervisedGraphs.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SupervisedGraphs = () => {
  const [confusion, setConfusion] = useState(null);
  const [loadingConfusion, setLoadingConfusion] = useState(false);
  const confusionChartRef = useRef();

  const token = localStorage.getItem("token");
  const projectId = "69de13e957dea9f45d4f93fe";

  const handleConfusion = async () => {
    setLoadingConfusion(true);
    try {
      const data = await fetchConfusion(projectId, token);
      setConfusion(data);
    } finally {
      setLoadingConfusion(false);
    }
  };

  const handleExport = async (ref, fileName = "chart.pdf") => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
  };

  return (
    <div className="supervised-container">
      <h1 className="supervised-title">
        Supervised Learning: Evaluation Metrics & Diagnostic Plots
      </h1>

      <div className="warning-container">
        <div className="warning-card">
          ⚠️ Please only provide data with <b>multi-class labels</b> and ensure
          the <b>last column contains labels</b>.
        </div>
      </div>

      <div className="button-wrapper">
        <button
          className="primary-btn"
          onClick={handleConfusion}
          title="Show Confusion Matrix"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
          </svg>
          <p className="button-label">Confusion Matrix</p>
        </button>
      </div>


      {confusion?.error && (
        <div className="error-card">
          {confusion.error}
        </div>
      )}

      {(confusion || loadingConfusion) && (
        <div className="supervised-chart-section">
          <div className="supervised-chart-header">
            <h3 className="supervised-chart-title">🎯 Confusion Matrix</h3>
            {!loadingConfusion && (
              <button
                className="supervised-export-btn"
                onClick={() =>
                  handleExport(confusionChartRef, "Confusion_Matrix.pdf")
                }
              >
                Export as PDF
              </button>
            )}
          </div>
          <div className="supervised-chart-wrapper">
            {loadingConfusion ? (
              <div className="supervised-spinner-container">
                <div className="supervised-spinner"></div>
                <p>Analyzing Confusion Matrix data...</p>
              </div>
            ) : (
              <div ref={confusionChartRef}>
                <ConfusionMatrix
                  matrix={confusion.matrix}
                  labels={confusion.labels}
                  metrics={{
                    accuracy: confusion.accuracy,
                    precision: confusion.precision,
                    recall: confusion.recall,
                    f1: confusion.f1,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupervisedGraphs;