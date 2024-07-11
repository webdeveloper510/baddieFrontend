import React from "react";
import Plot from "react-plotly.js";

const BarGraph = ({ data }) => {
  //   const data = [
  //     {
  //       name: 'LHP',
  //       x: ['Last Game', 'L7D', 'L21D', 'L45D', 'YTD'],
  //       y: [1.0, 0.375, 0.3, 0.32692, 0.24299],
  //       type: 'bar'
  //     },
  //     {
  //       name: 'RHP',
  //       x: ['Last Game', 'L7D', 'L21D', 'L45D', 'YTD'],
  //       y: [0.0, 0.13636, 0.1, 0.15126, 0.17557],
  //       type: 'bar'
  //     }
  //   ];

  //   const layout = {
  //     template: {
  //       data: {
  //         bar: [
  //           {
  //             error_x: { color: '#2a3f5f' },
  //             error_y: { color: '#2a3f5f' },
  //             marker: {
  //               line: { color: '#E5ECF6', width: 0.5 },
  //               pattern: { fillmode: 'overlay', size: 10, solidity: 0.2 }
  //             },
  //             type: 'bar'
  //           }
  //         ]
  //       },
  //       layout: {
  //         autotypenumbers: 'strict',
  //         colorway: ['#636efa', '#EF553B', '#00cc96', '#ab63fa', '#FFA15A', '#19d3f3', '#FF6692', '#B6E880', '#FF97FF', '#FECB52'],
  //         font: { color: '#2a3f5f' },
  //         hovermode: 'closest',
  //         hoverlabel: { align: 'left' },
  //         paper_bgcolor: 'white',
  //         plot_bgcolor: '#E5ECF6',
  //         xaxis: {
  //           gridcolor: 'white',
  //           linecolor: 'white',
  //           ticks: '',
  //           title: { standoff: 15 },
  //           zerolinecolor: 'white',
  //           automargin: true,
  //           zerolinewidth: 2
  //         },
  //         yaxis: {
  //           gridcolor: 'white',
  //           linecolor: 'white',
  //           ticks: '',
  //           title: { standoff: 15 },
  //           zerolinecolor: 'white',
  //           automargin: true,
  //           zerolinewidth: 2
  //         },
  //         title: { x: 0.05 },
  //         mapbox: { style: 'light' }
  //       }
  //     },
  //     barmode: 'group',
  //     title: { text: 'K Rate by Hand over Time Ending 2024-07-08' },
  //     xaxis: { title: { text: '' } },
  //     yaxis: { title: { text: 'Strikeout Rate' }, range: [0, 1.2] },
  //     shapes: [
  //       {
  //         line: { dash: 'dash', width: 4 },
  //         type: 'line',
  //         x0: 0,
  //         x1: 1,
  //         xref: 'x domain',
  //         y0: 0.22227,
  //         y1: 0.22227,
  //         yref: 'y'
  //       }
  //     ],
  //     annotations: [
  //       {
  //         showarrow: false,
  //         text: 'League Avg',
  //         x: 0.5,
  //         xanchor: 'center',
  //         xref: 'x domain',
  //         y: 0.22227,
  //         yanchor: 'bottom',
  //         yref: 'y'
  //       }
  //     ]
  //   };

  return (
    <Plot
      data={data?.data}
      layout={data.layout}
      style={{ width: "100%", height: "100%" }}

    />
  );
};

export default BarGraph;

{
  /* <BarGraph
           data={JSON.parse(graphData?.hnd_hr_pct_graph)}
           config={{ responsive: true }}
         /> */
}
