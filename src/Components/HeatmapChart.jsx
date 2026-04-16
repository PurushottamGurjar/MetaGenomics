import React from "react";

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

  return (
    <div style={{ overflow: "auto", maxHeight: "600px" }}>
      <div style={{ display: "flex" }}>
        
        <div style={{ marginRight: "10px" }}>
          <div style={{ height: "30px" }}></div>
          {rows.map((r, i) => (
            <div
              key={i}
              style={{
                height: "20px",
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
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
                  textAlign: "center",
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
  );
};

export default HeatmapChart;