import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const Linechart = ()=>{
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const  options = {    
    responsive: true,
    plugins: {
      legend: {
       display:false,
        position: 'right',
      },
      title: {
        display: false,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

const labels = ['1', '2', '3', '4', '5', '6', '7'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 80, 30, 70, 50, 60, 30],
      borderColor: 'gray',
      backgroundColor: 'gray',
    }
  ],
};

 
  return   (
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
   <Line options={options} data={data} className='line-chart' />
   </div>
    </div>
   </div>
    </>
  )
}

export default Linechart;
