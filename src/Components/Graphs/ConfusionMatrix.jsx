import React, { useMemo } from "react";

const getColor = (value, max) => {
  const ratio = value / (max + 1e-9);

  const r = 255;
  const g = Math.floor(255 * (1 - ratio));
  const b = Math.floor(255 * (1 - ratio));

  return `rgb(${r}, ${g}, ${b})`;
};

const ConfusionMatrixChart = ({ matrix = [], labels = [], metrics }) => {
  if (!matrix.length) return <div>No data</div>;

  const max = Math.max(...matrix.flat());


  const insights = useMemo(() => {
    if (!metrics) return [];

    return [
      `Accuracy: ${(metrics.accuracy * 100).toFixed(2)}%`,
      `Precision: ${metrics.precision.toFixed(3)}`,
      `Recall: ${metrics.recall.toFixed(3)}`,
      `F1 Score: ${metrics.f1.toFixed(3)}`,
    ];
  }, [metrics]);

  return (
    <div style={{ width: "90vw", maxWidth:"1200px",background: "white", padding: "10px" }}>
    <div className="cm-container">
      <div className="cm-graph" style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <div style={{ height: "50px" }}></div>
            {labels.map((label, i) => (
              <div
                key={i}
                style={{
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <div style={{ display: "flex",justifyContent:"center", alignItems:"center" }}>
              {labels.map((label, i) => (
                <div
                  key={i}
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "10px",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    textAlign: "center",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {matrix.map((row, i) => (
              <div key={i} style={{ display: "flex" }}>
                {row.map((val, j) => (
                  <div
                    key={j}
                    style={{
                      width: "60px",
                      height: "60px",
                      background: getColor(val, max),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      color: val > max * 0.5 ? "#fff" : "#000",
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
    <div
        style={{
          marginTop: "24px",
          padding: "24px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          border: "none",
          boxShadow:
            "0 10px 40px rgba(37, 99, 235, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
              padding: "8px 12px",
              backdropFilter: "blur(10px)",
            }}
          >
            📊
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
            }}
          >
            Data Insights
          </h3>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {insights.map((insight, i) => (
            <li
              key={i}
              style={{
                marginBottom: "12px",
                padding: "16px",
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontSize: "16px",
                lineHeight: "1.6",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
                transition: "all 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <span
                style={{
                  marginRight: "10px",
                  fontSize: "18px",
                  opacity: 0.9,
                }}
              >
                ✨
              </span>
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConfusionMatrixChart;
