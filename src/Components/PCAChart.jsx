import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Legend,
} from "recharts";
import { useMemo } from "react";

const COLORS = ["#1f77b4", "#e41a1c"];

const PCAChart = ({ data, clusters, variance, centroids }) => {
  if (!data || !clusters) return null;

  // ✅ Combine PCA + cluster labels
  const formatted = data.map((point, index) => ({
    x: point[0],
    y: point[1],
    cluster: clusters[index],
  }));

  // ✅ Separate clusters
  const clusterA = formatted.filter((d) => d.cluster === 0);
  const clusterB = formatted.filter((d) => d.cluster === 1);

  // ✅ Centroids
  const centroidData =
    centroids?.map((c) => ({
      x: c[0],
      y: c[1],
    })) || [];

  // 🔥 AI INSIGHTS (NO STATE, PURE COMPUTE)
  const insights = useMemo(() => {
    if (!variance) return [];

    const var1 = variance[0];
    const var2 = variance[1];
    const totalVar = var1 + var2;

    const arr = [];

    // 1. Variance coverage
    arr.push(
      `The first two principal components explain ${(totalVar * 100).toFixed(2)}% of the total variance in the dataset.`,
    );

    // 2. Dominance
    if (var1 > 0.5) {
      arr.push(
        "PC1 captures the majority of the variance, indicating a strong dominant pattern in the data.",
      );
    }

    // 3. Low PC2 importance
    if (var2 < 0.1) {
      arr.push(
        "PC2 contributes very little, suggesting the data is mostly one-dimensional.",
      );
    }

    // 4. Cluster separation using centroid distance
    if (centroids && centroids.length >= 2) {
      const [c1, c2] = centroids;

      const distance = Math.sqrt(
        Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2),
      );

      if (distance > 10) {
        arr.push(
          "Clusters are very well separated, indicating strong natural grouping in the dataset.",
        );
      } else if (distance > 5) {
        arr.push("Clusters show moderate separation.");
      } else {
        arr.push("Clusters are overlapping, indicating weak separation.");
      }
    }

    // 5. Linear separability
    arr.push(
      "The distribution suggests the data may be linearly separable, meaning simple models can perform well.",
    );

    // 6. Spread analysis (PC1)
    const xValues = formatted.map((d) => d.x);
    const mean = xValues.reduce((a, b) => a + b, 0) / xValues.length;
    const varianceX =
      xValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / xValues.length;

    if (varianceX > 50) {
      arr.push(
        "There is high spread along PC1, indicating strong variability across samples.",
      );
    }

    // 7. Cluster compactness
    if (clusterA.length && clusterB.length) {
      if (clusterA.length > clusterB.length) {
        arr.push(
          "Cluster A contains more samples, indicating possible class imbalance.",
        );
      } else if (clusterB.length > clusterA.length) {
        arr.push(
          "Cluster B contains more samples, indicating possible class imbalance.",
        );
      } else {
        arr.push("Both clusters are balanced in size.");
      }
    }

    // 8. Outlier hint
    const extremePoints = xValues.filter((v) => Math.abs(v) > 40);
    if (extremePoints.length > 0) {
      arr.push("There are potential outliers present in the dataset.");
    }

    return arr;
  }, [variance, centroids, formatted, clusterA, clusterB]);

  return (
    <div style={{ width: "100%", background: "white", padding: "10px" }}>
      {/* ✅ Variance */}
      {variance && (
        <h3 style={{ textAlign: "center" }}>
          PC1: {(variance[0] * 100).toFixed(2)}% | PC2:{" "}
          {(variance[1] * 100).toFixed(2)}%
        </h3>
      )}

      <div style={{ width: "100%", height: 600 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
            <CartesianGrid />

            <XAxis
              type="number"
              dataKey="x"
              name="PC1"
              label={{
                value: `PC1 (${(variance?.[0] * 100 || 0).toFixed(2)}%)`,
                position: "bottom",
              }}
            />

            <YAxis
              type="number"
              dataKey="y"
              name="PC2"
              label={{
                value: `PC2 (${(variance?.[1] * 100 || 0).toFixed(2)}%)`,
                angle: -90,
                position: "left",
              }}
            />

            <ReferenceLine x={0} stroke="gray" strokeDasharray="3 3" />
            <ReferenceLine y={0} stroke="gray" strokeDasharray="3 3" />

            <Tooltip />
            <Legend />

            <Scatter name="Cluster A" data={clusterA} fill={COLORS[0]} />
            <Scatter name="Cluster B" data={clusterB} fill={COLORS[1]} />

            {centroidData.length > 0 && (
              <Scatter
                name="Centroids"
                data={centroidData}
                fill="black"
                shape="star"
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
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

export default PCAChart;
