import { Upload, Play, BarChart3, TrendingUp, Grid3x3 } from "lucide-react";
import { useState, useRef } from "react";
import PCAChart from "../Components/PCAChart";
import VolcanoChart from "../Components/VolcanoChart";
import HeatmapChart from "../Components/HeatmapChart";
import { fetchPCA, fetchVolcano, fetchHeatmap } from "../services/api";
import "./ProjectPage.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ProjectPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [pca, setPCA] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [variance, setVariance] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [volcano, setVolcano] = useState({ logFC: [], pvals: [] });
  const [heatmap, setHeatmap] = useState();
  const [loadingPCA, setLoadingPCA] = useState(false);
  const [loadingVolcano, setLoadingVolcano] = useState(false);
  const [loadingHeatmap, setLoadingHeatmap] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const token = localStorage.getItem("token");
  const projectId = "69de13e957dea9f45d4f93fe";
  const PCAchartRef = useRef();
  const HeatMapRef = useRef();
  const VolcanoChartRef = useRef();

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setFileName(selectedFile?.name || "");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
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

  const handlePCA = async () => {
    setLoadingPCA(true);
    try {
      const data = await fetchPCA(projectId, token);
      setPCA(data.pca);
      setClusters(data.clusters);
      setVariance(data.variance);
      setCentroids(data.centroids);
      console.log("Here is your PCA Data", data);
    } finally {
      setLoadingPCA(false);
    }
  };

  const handleVolcano = async () => {
    setLoadingVolcano(true);
    try {
      const data = await fetchVolcano(projectId, token);
      setVolcano(data);
    } finally {
      setLoadingVolcano(false);
    }
  };

  const handleHeatmap = async () => {
    setLoadingHeatmap(true);
    try {
      const data = await fetchHeatmap(projectId, token);
      setHeatmap(data);
    } finally {
      setLoadingHeatmap(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select file");

    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", projectId);

      const res = await fetch(
        "https://metagenomics-backend.onrender.com/api/projects/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      alert("File uploaded successfully");

      // const pcaData = await fetchPCA(projectId, token);
      // setPCA(pcaData.pca);
      // handlePCA();
      // handleVolcano();
      // handleHeatmap();
    } finally {
      setUploadingFile(false);
    }
  };

  return (
    <div className="omics-page-wrapper">
      <div className="omics-page-container">
        <div className="omics-header">
          <h1 className="omics-main-title">PLATFORMS</h1>
          <div className="omics-title-divider"></div>
        </div>

        <div className="omics-playground-section">
          <h2 className="omics-section-title">MetaGenomics Playground</h2>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`omics-dropzone ${isDragging ? "omics-dropzone--active" : ""}`}
          >
            <div className="omics-dropzone-content">
              <Upload className="omics-icon-large" />
              <div className="omics-dropzone-text">
                <label className="omics-file-label">
                  <span className="omics-file-link">Choose a file</span>
                  <span className="omics-file-subtext"> or drag it here</span>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                    className="omics-file-input"
                  />
                </label>
                {fileName && <p className="omics-file-name">{fileName}</p>}
              </div>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || uploadingFile}
            className="omics-upload-btn"
          >
            <Play className="omics-icon-small" />
            {uploadingFile ? "Uploading..." : "Upload File"}
          </button>

          <div className="omics-analysis-grid">
            <button
              onClick={handlePCA}
              disabled={loadingPCA}
              className="omics-analysis-btn"
            >
              <BarChart3 className="omics-icon-medium" />
              <span className="omics-btn-label">
                {loadingPCA ? "Loading..." : "PCA"}
              </span>
            </button>
            <button
              onClick={handleVolcano}
              disabled={loadingVolcano}
              className="omics-analysis-btn"
            >
              <TrendingUp className="omics-icon-medium" />
              <span className="omics-btn-label">
                {loadingVolcano ? "Loading..." : "Volcano"}
              </span>
            </button>
            <button
              onClick={handleHeatmap}
              disabled={loadingHeatmap}
              className="omics-analysis-btn"
            >
              <Grid3x3 className="omics-icon-medium" />
              <span className="omics-btn-label">
                {loadingHeatmap ? "Loading..." : "Heatmap"}
              </span>
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="omics-charts-container">
          {/* PCA */}
          {(pca.length > 0 || loadingPCA) && (
            <div className="omics-chart-section">
              <div className="omics-chart-header">
                <h3 className="omics-chart-title">📊 PCA Plot</h3>
                {!loadingPCA && (
                  <button
                    className="omics-export-btn"
                    onClick={() => handleExport(PCAchartRef, "PCA_Chart.pdf")}
                  >
                    Export as PDF
                  </button>
                )}
              </div>
              <div className="omics-chart-wrapper">
                {loadingPCA ? (
                  <div className="omics-spinner-container">
                    <div className="omics-spinner"></div>
                    <p>Analyzing PCA data...</p>
                  </div>
                ) : (
                  <PCAChart
                    data={pca}
                    clusters={clusters}
                    variance={variance}
                    centroids={centroids}
                    ref={PCAchartRef}
                  />
                )}
              </div>
            </div>
          )}

          {/* Volcano */}
          {(volcano.logFC.length > 0 || loadingVolcano) && (
            <div className="omics-chart-section">
              <div className="omics-chart-header">
                <h3 className="omics-chart-title">🌋 Volcano Plot</h3>
                {!loadingVolcano && (
                  <button
                    className="omics-export-btn"
                    onClick={() =>
                      handleExport(VolcanoChartRef, "Volcano_Chart.pdf")
                    }
                  >
                    Export as PDF
                  </button>
                )}
              </div>
              <div className="omics-chart-wrapper">
                {loadingVolcano ? (
                  <div className="omics-spinner-container">
                    <div className="omics-spinner"></div>
                    <p>Analyzing Volcano data...</p>
                  </div>
                ) : (
                  <VolcanoChart
                    logFC={volcano.logFC}
                    pvals={volcano.pvals}
                    ref={VolcanoChartRef}
                  />
                )}
              </div>
            </div>
          )}

          {/* Heatmap */}
          {(heatmap || loadingHeatmap) && (
            <div className="omics-chart-section">
              <div className="omics-chart-header">
                <h3 className="omics-chart-title">🔥 Heatmap</h3>
                {!loadingHeatmap && (
                  <button
                    className="omics-export-btn"
                    onClick={() => handleExport(HeatMapRef, "Heat_Map.pdf")}
                  >
                    Export as PDF
                  </button>
                )}
              </div>
              <div className="omics-chart-wrapper">
                {loadingHeatmap ? (
                  <div className="omics-spinner-container">
                    <div className="omics-spinner"></div>
                    <p>Analyzing Heatmap data...</p>
                  </div>
                ) :heatmap ? (
                  <HeatmapChart
                    matrix={heatmap.matrix}
                    rows={heatmap.rows}
                    cols={heatmap.cols}
                  />
                ):(
                  null
                )}
              </div>
            </div>
          )}
        </div>

        <div className="omics-stats-section">
          <div className="omics-stat">
            <div className="omics-stat-value">3</div>
            <div className="omics-stat-label">Analysis Methods</div>
          </div>
          <div className="omics-stat">
            <div className="omics-stat-value">Fast</div>
            <div className="omics-stat-label">Processing Time</div>
          </div>
          <div className="omics-stat">
            <div className="omics-stat-value">Cloud</div>
            <div className="omics-stat-label">Based Platform</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
