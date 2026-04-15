import { ScatterChart, Scatter, XAxis, YAxis, Tooltip } from "recharts";

const VolcanoChart = ({ logFC, pvals }) => {
  const data = logFC.map((fc, i) => ({
    x: fc,
    y: -Math.log10(pvals[i] || 1e-10),
  }));

  return (
    <ScatterChart width="100%" height={600}>
      <XAxis dataKey="x" name="logFC" />
      <YAxis dataKey="y" name="-log10(p)" />
      <Tooltip />
      <Scatter
        data={data}
        fill="#ff4d4f"
        shape={(props) => {
          const { cx, cy } = props;
          return <circle cx={cx} cy={cy} r={1.5} fill="#8884d8" />;
        }}
      />
    </ScatterChart>
  );
};

export default VolcanoChart;
