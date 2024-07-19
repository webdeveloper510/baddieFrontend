import React from "react";
import Plot from "react-plotly.js";

const BarGraph = ({ data }) => {

  const customizedData = data?.data?.map(dataset => ({
    ...dataset,
    hovertemplate: 'x: %{x}<br>y: %{y}<extra></extra>',
  }));
 
  return (
    <Plot
      data={customizedData}
      layout={data?.layout}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default BarGraph;

