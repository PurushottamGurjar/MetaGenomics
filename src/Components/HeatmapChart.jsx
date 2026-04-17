import React, { useMemo } from "react";

const getColor = (value, min, max) => {
  const ratio = (value - min) / (max - min + 1e-9);

  const r = ratio > 0.5 ? 255 : Math.floor(255 * ratio * 2);
  const b = ratio < 0.5 ? 255 : Math.floor(255 * (1 - ratio) * 2);
  const g = Math.floor(255 * (1 - Math.abs(ratio - 0.5) * 2));

  return `rgb(${r}, ${g}, ${b})`;
};

const HeatmapChart = ({ matrix = [], rows = [], cols = [] }) => {
  if (!matrix.length) return <div>No data</div>;

  const flat = matrix.flat();
  const min = Math.min(...flat);
  const max = Math.max(...flat);

  const insights = useMemo(() => {
    const arr = [];

    const total = flat.length;
    const mean = flat.reduce((a, b) => a + b, 0) / total;
    const variance =
      flat.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / total;

    arr.push(
      `Values range from ${min.toFixed(2)} to ${max.toFixed(2)}, indicating ${
        max - min > 50 ? "high variability" : "moderate variation"
      } in the dataset.`
    );

    if (variance > 500) {
      arr.push("High variability observed across the dataset.");
    } else {
      arr.push("Values are relatively consistent across the dataset.");
    }

    const highValues = flat.filter((v) => v > mean * 1.5).length;
    if (highValues / total > 0.2) {
      arr.push("High-value regions are prominent in the dataset.");
    }

    const lowValues = flat.filter((v) => v < mean * 0.5).length;
    if (lowValues / total > 0.2) {
      arr.push("Low-value regions indicate sparse areas.");
    }

    if (max - min < 10) {
      arr.push("The dataset appears uniform with minimal variation.");
    }

    const outliers = flat.filter(
      (v) => v > mean + 3 * Math.sqrt(variance)
    ).length;
    if (outliers > 0) {
      arr.push("Outliers detected in the dataset.");
    }

    arr.push(
      `Dataset size: ${rows.length} rows × ${cols.length} columns.`
    );

    return arr;
  }, [flat, min, max, rows.length, cols.length]);

  return (
    <div style={{width:"100%" , display:"flex", flexDirection:"column", justifyContent:"center" , gap:"20px", alignItems:"center"}}>

      <div className="heatmap-graph">
        <div style={{ overflow: "auto", maxHeight: "600px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "10px" }}>
              <div style={{ height: "30px" }}></div>
              {rows.map((r, i) => (
                <div key={i} style={{ height: "20px", fontSize: "10px" }}>
                  {r}
                </div>
              ))}
            </div>

            <div>
              <div style={{ display: "flex" }}>
                {cols.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: "20px",
                      height: "30px",
                      fontSize: "10px",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>

              {matrix.map((row, i) => (
                <div key={i} style={{ display: "flex" }}>
                  {row.map((val, j) => (
                    <div
                      key={j}
                      title={`Row: ${rows[i]} | Col: ${cols[j]} | Value: ${val.toFixed(2)}`}
                      style={{
                        width: "20px",
                        height: "20px",
                        background: getColor(val, min, max),
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <div style={{ fontSize: "12px" }}>Value Scale</div>
            <div
              style={{
                height: "10px",
                width: "200px",
                background:
                  "linear-gradient(to right, blue, white, red)",
              }}
            />
            <div style={{ fontSize: "10px" }}>
              {min.toFixed(2)} → {max.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div style={{width:"100%"}}>
        <div
          style={{
            padding: "24px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #059669 0%, #065f46 100%)",
            boxShadow: "0 10px 40px rgba(5, 150, 105, 0.3)",
            color: "#fff",
          }}
        >
          <h3 style={{ marginBottom: "16px" }}>📊 Data Insights</h3>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {insights.map((insight, i) => (
              <li
                key={i}
                style={{
                  marginBottom: "12px",
                  padding: "14px",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "10px",
                  fontSize: "15px",
                }}
              >
                ✨ {insight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;