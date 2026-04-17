import React, { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const VolcanoChart = ({ logFC = [], pvals = [] }) => {
  if (!logFC.length || !pvals.length) {
    return <div>No data available</div>;
  }

  const data = logFC.map((fc, i) => {
    const p = pvals[i] || 1e-10;
    const y = -Math.log10(p);

    let type = "neutral";

    if (fc > 1 && p < 0.05) type = "up";
    else if (fc < -1 && p < 0.05) type = "down";

    return {
      x: fc,
      y,
      pval: p,
      type,
      id: i,
    };
  });

  const upData = data.filter((d) => d.type === "up");
  const downData = data.filter((d) => d.type === "down");
  const neutralData = data.filter((d) => d.type === "neutral");

  // 🔥 AI INSIGHTS
  const insights = useMemo(() => {
    const arr = [];

    const total = data.length;
    const up = upData.length;
    const down = downData.length;
    const neutral = neutralData.length;

    const sig = up + down;

    // 1. Signal strength
    arr.push(
      `${sig} features are statistically significant out of ${total}, indicating ${
        sig / total > 0.3 ? "strong" : "moderate"
      } signal in the dataset.`
    );

    // 2. Up vs Down balance
    if (up > down) {
      arr.push("Upregulated features dominate, indicating increased activity in one group.");
    } else if (down > up) {
      arr.push("Downregulated features dominate, indicating suppression in one group.");
    } else {
      arr.push("Upregulated and downregulated features are balanced.");
    }

    // 3. Symmetry
    const ratio = up / (down + 1e-9);
    if (ratio > 2 || ratio < 0.5) {
      arr.push("The plot shows asymmetry, suggesting directional bias in feature changes.");
    } else {
      arr.push("The distribution is relatively symmetric across both groups.");
    }

    // 4. Extreme values
    const extreme = data.filter(d => Math.abs(d.x) > 2 && d.y > 3).length;
    if (extreme > 0) {
      arr.push("Several features show both high fold change and strong significance, making them key candidates.");
    }

    // 5. Noise insight
    if (neutral / total > 0.6) {
      arr.push("Majority of features are not significant, indicating presence of noise.");
    }

    // 6. Separation clarity
    if (sig > 0 && (up > 20 || down > 20)) {
      arr.push("Clear separation between significant and non-significant features is observed.");
    }

    // 7. Data quality
    if (sig / total < 0.1) {
      arr.push("Very few significant features detected, suggesting weak differentiation between groups.");
    }

    return arr;
  }, [data, upData, downData, neutralData]);

  return (
    <div style={{ width: "100%", background: "white" }}>

      {/* GRAPH (UNCHANGED) */}
      <div style={{ height: "600px" }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 50, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="x"
              name="Log2 Fold Change"
              type="number"
              domain={["auto", "auto"]}
              label={{
                value: "Log2 Fold Change",
                position: "insideBottom",
                offset: -10,
              }}
            />

            <YAxis
              dataKey="y"
              name="-log10(p-value)"
              type="number"
              label={{
                value: "-log10(p-value)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip />
            <Legend />

            <ReferenceLine x={1} stroke="black" strokeDasharray="4 4" label="FC > 1" />
            <ReferenceLine x={-1} stroke="black" strokeDasharray="4 4" label="FC < -1" />
            <ReferenceLine y={-Math.log10(0.05)} stroke="black" strokeDasharray="4 4" label="p = 0.05" />

            <Scatter name="Downregulated" data={downData} fill="blue" />
            <Scatter name="Upregulated" data={upData} fill="red" />
            <Scatter name="Not Significant" data={neutralData} fill="#999" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 AI INSIGHTS CARD */}
      <div style={{
        marginTop: "24px",
        padding: "24px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
        boxShadow: "0 10px 40px rgba(37, 99, 235, 0.3)",
        color: "#fff",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px"
        }}>
          <div style={{
            fontSize: "32px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "12px",
            padding: "8px 12px"
          }}>
            🤖
          </div>
          <h3 style={{ margin: 0, fontSize: "26px", fontWeight: "700" }}>
            Data Insights
          </h3>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {insights.map((insight, i) => (
            <li key={i} style={{
              marginBottom: "12px",
              padding: "14px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "10px",
              fontSize: "15px",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
            }}>
              ✨ {insight}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default VolcanoChart;