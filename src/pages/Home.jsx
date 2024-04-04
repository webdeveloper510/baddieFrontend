import React, { useEffect, useState } from "react";
import Linechart from "./charts/linechart";
import { ScatterChart } from "./charts/scater";
import { BarChart } from "./charts/barchart";
import { DoughnutChart } from "./charts/doughnut";
import { useParams } from "react-router";
import axios from "axios";
import Apploader from "../component/Apploader";

function Home() {
  const params = useParams();
  console.log("params", params);
  const [graph, setGraph] = useState(null);
  const [loading, setLoading] = useState(false);
  const appLoad = async () => {
    setLoading(true);
    fetch("https://baddie.pro/graph-data/")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("🚀 ~ appLoad ~ response:", data);
        setGraph(data?.data || [])
        setLoading(false);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      });

  }
  useEffect(() => {
    appLoad()
  }, [])
  return (
    <div className="flex flex-col items-center justify-center pe-4">
      <div className="bg-white  md:p-10 w-full image-section h-auto sm:p-40 flex flex-col items-center justify-center text-xl">
        <img src="/home_1.png" alt="home image" />
        <img src="/home_2.png" alt="home image" />
        {/* <p className="baddie-text">
          Placeholder text/images for copy currently under consideration...
        </p>
        <br />
        <p className="baddie-text">Bet like a data scientist. Bet with baddie winky face emoji</p> */}
      </div>
      <div className="bg-white m-4 w-full flex flex-col items-center justify-start p-4 ">
        <div className="w-4/5 zaddie-text bg-lightgray [letter-spacing:5px] sm:text-lg  p-4 text-center rounded-xl md:text-4xl">
          Zaddies of MLB
        </div>
        <div className="grid  sm:grid-cols-1 chart-section md:grid-cols-2 gap-6 mt-5 min-h-36">
          {graph && graph.map((item,i)=>(
            <div key={i} className=" my-2">
              <img src={item.content+`?new=${new Date()}`} alt="i" />
          </div>
          )) }
          {loading && <Apploader className="my-8" size={60}/>}
          {/* <div className=" my-2">

            <BarChart />
          </div>
          <div className=" my-2">
            <DoughnutChart />
          </div>
          <div className=" my-2">
            <ScatterChart />
          </div>

          <div className=" my-2">
            <Linechart />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
