import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  responsive: true,
    plugins: {
      legend: {
       display:false,
        position: 'right',
      },
      title: {
        display: false,
        text: 'Scatter',
      },
    },
};

const data = {
  datasets: [
    {
      label: 'A dataset',
      data: [
        { x: 30, y: 8 },
        { x: 10, y: 3 },
        { x: 15, y: 30 },
        { x: 20, y: 5 },
        { x: 8, y: 20 },
        { x: 25, y: 30 },
        // Add more data points as needed
      ],
      backgroundColor: 'gray',
    },
  ],
};

export function ScatterChart() {
  return (
    <>
    <div className="border-4 py-2 rounded-3xl" style={{border : "3px solid #ff5757"}}>
    <div className='grid grid-cols-2 gap-4 md:h-52 chart-card sm:h-auto  items-center px-3'>
    <div>
        <p className='pitcher-text'><strong>Pitcher A </strong>has highest K, more thn double the next highest qualified SP...</p>
        <ul className='list-inside list-disc pitcher-text'>
            <li>Detail</li>
            <li>Detail</li>
            <li>Detail</li>
            <li>Ipsum Lorem</li>
        </ul>
    </div>

    <div className='flex items-center justify-center'>
   <Scatter options={options} data={data} className='scatter-chart' />
   </div>
    </div>
   </div>
    </>
  );
}
