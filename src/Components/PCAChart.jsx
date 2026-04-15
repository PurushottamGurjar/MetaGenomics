import { ScatterChart, Scatter, XAxis, YAxis, Tooltip } from "recharts";

const PCAChart = ({ data }) => {
  const formatted = data.map((point, index) => ({
    x: point[0],
    y: point[1],
    id: index,
  }));

  return (
    <>
      <ScatterChart width="100%" height={600}>
        <XAxis dataKey="x" name="PC1" />
        <YAxis dataKey="y" name="PC2" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter
          data={formatted}
          fill="#8884d8"
          shape={(props) => {
            const { cx, cy } = props;
            return <circle cx={cx} cy={cy} r={1.5} fill="#8884d8" />;
          }}
        />
      </ScatterChart>
    </>
  );
};

export default PCAChart;
