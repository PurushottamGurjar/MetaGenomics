const HeatmapChart = ({ matrix }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${matrix[0]?.length}, 20px)` }}>
      {matrix.flat().map((val, i) => (
        <div
          key={i}
          style={{
            width: 60,
            height: 2,
            background: `rgba(255, 0, 0, ${val / 100})`
          }}
        />
      ))}
    </div>
  );
};

export default HeatmapChart;