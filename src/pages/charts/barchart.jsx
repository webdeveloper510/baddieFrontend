import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "right",
    },
    title: {
      display: false,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const generateRandomData = () =>
  labels.map(() => Math.floor(Math.random() * 20) - 0);

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: generateRandomData(),
      borderColor: "gray",
      backgroundColor: "lightgray",
    },
  ],
};

export function BarChart() {
  return (
    <>
      <div className="border-4 py-2 rounded-3xl" style={{border : "3px solid #ff5757"}}>
        <div className="grid grid-cols-2 gap-4 md:h-52 chart-card sm:h-auto  items-center px-3">
          <div>
            <p className="pitcher-text">
              <strong>Pitcher A </strong>has highest K, more thn double the next
              highest qualified SP...
            </p>
            <ul className="list-inside list-disc pitcher-text">
              <li>Detail</li>
              <li>Detail</li>
              <li>Detail</li>
              <li>Ipsum Lorem</li>
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <Bar options={options} data={data} className="bar-chart" />
          </div>
        </div>
      </div>
    </>
  );
}
