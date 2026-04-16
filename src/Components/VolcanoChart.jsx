import React from "react";
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
  // Safety check
  if (!logFC.length || !pvals.length) {
    return <div>No data available</div>;
  }

  // Transform data
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

  // Split data for better rendering & legend
  const upData = data.filter((d) => d.type === "up");
  const downData = data.filter((d) => d.type === "down");
  const neutralData = data.filter((d) => d.type === "neutral");

  return (
    <div style={{ width: "100%", height: "600px", background: "white" }}>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 50, left: 60 }}>
          
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* X Axis */}
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

          {/* Y Axis */}
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

          {/* Tooltip */}
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name) => {
              if (name === "y")
                return [value.toFixed(2), "-log10(p-value)"];
              if (name === "x")
                return [value.toFixed(2), "Log2 Fold Change"];
              return value;
            }}
            labelFormatter={(label) => `Gene Index: ${label}`}
          />

          {/* Legend */}
          <Legend />

          {/* Threshold Lines */}
          <ReferenceLine
            x={1}
            stroke="black"
            strokeDasharray="4 4"
            label="FC > 1"
          />
          <ReferenceLine
            x={-1}
            stroke="black"
            strokeDasharray="4 4"
            label="FC < -1"
          />
          <ReferenceLine
            y={-Math.log10(0.05)}
            stroke="black"
            strokeDasharray="4 4"
            label="p = 0.05"
          />

          {/* DOWN (Blue) */}
          <Scatter
            name="Downregulated"
            data={downData}
            fill="blue"
            shape={(props) => {
              const { cx, cy } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={2}
                  fill="blue"
                  opacity={0.6}
                />
              );
            }}
          />

          {/* UP (Red) */}
          <Scatter
            name="Upregulated"
            data={upData}
            fill="red"
            shape={(props) => {
              const { cx, cy } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={2}
                  fill="red"
                  opacity={0.6}
                />
              );
            }}
          />

          {/* NEUTRAL (Grey) */}
          <Scatter
            name="Not Significant"
            data={neutralData}
            fill="#999"
            shape={(props) => {
              const { cx, cy } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={1.5}
                  fill="#999"
                  opacity={0.4}
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolcanoChart;