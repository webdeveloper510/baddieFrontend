import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [90,10],
      backgroundColor: [
        'black',
        'gray',
      ],
      borderColor: [
        'black',
        'gray',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
    indexAxis: 'y',
    elements: {
      bar: {
          display:false,
        borderWidth: 2,
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
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

export function DoughnutChart() {
  return(
    <>
    <div className="border-4 py-2 rounded-3xl" style={{border : "3px solid #ff5757"}}>
    <div className='grid grid-cols-2 gap-4 md:h-52 chart-card sm:h-auto  items-center px-3'>
    <div >
        <p className='pitcher-text'><strong>Pitcher A </strong>has highest K, more thn double the next highest qualified SP...</p>
        <ul className='list-inside list-disc pitcher-text'>
            <li>Detail</li>
            <li>Detail</li>
            <li>Detail</li>
            <li>Ipsum Lorem</li>
        </ul>
    </div>

    <div className='flex items-center justify-center'>
   <Doughnut options={options} data={data} style={{width:"220px", height:"120px !important"}} className='dougnut-chart' />
   </div>
    </div>
   </div>
    </>
     );
}
