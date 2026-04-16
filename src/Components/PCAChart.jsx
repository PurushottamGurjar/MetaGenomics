import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Legend
} from "recharts";

const COLORS = ["#1f77b4", "#e41a1c"];

const PCAChart = ({ data, clusters, variance, centroids }) => {

  if (!data || !clusters) return null;

  // ✅ Combine PCA + cluster labels
  const formatted = data.map((point, index) => ({
    x: point[0],
    y: point[1],
    cluster: clusters[index]
  }));

  // ✅ Separate clusters
  const clusterA = formatted.filter(d => d.cluster === 0);
  const clusterB = formatted.filter(d => d.cluster === 1);

  // ✅ Centroids
  const centroidData = centroids?.map(c => ({
    x: c[0],
    y: c[1]
  })) || [];

  return (
    <div style={{ width: "100%", height: 600, background: "white", padding: "10px" }}>

      {/* ✅ Variance */}
      {variance && (
        <h3 style={{ textAlign: "center" }}>
          PC1: {(variance[0] * 100).toFixed(2)}% | 
          PC2: {(variance[1] * 100).toFixed(2)}%
        </h3>
      )}

      <ResponsiveContainer width="100%" height="90%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>

          <CartesianGrid />

          {/* Axes */}
          <XAxis
            type="number"
            dataKey="x"
            name="PC1"
            label={{
              value: `PC1 (${(variance?.[0] * 100 || 0).toFixed(2)}%)`,
              position: "bottom"
            }}
          />

          <YAxis
            type="number"
            dataKey="y"
            name="PC2"
            label={{
              value: `PC2 (${(variance?.[1] * 100 || 0).toFixed(2)}%)`,
              angle: -90,
              position: "left"
            }}
          />

          {/* Center lines */}
          <ReferenceLine x={0} stroke="gray" strokeDasharray="3 3" />
          <ReferenceLine y={0} stroke="gray" strokeDasharray="3 3" />

          <Tooltip />
          <Legend />

          {/* 🔵 Cluster 0 */}
          <Scatter
            name="Cluster A"
            data={clusterA}
            fill={COLORS[0]}
          />

          {/* 🔴 Cluster 1 */}
          <Scatter
            name="Cluster B"
            data={clusterB}
            fill={COLORS[1]}
          />

          {/* ⭐ Centroids */}
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
  );
};

export default PCAChart;