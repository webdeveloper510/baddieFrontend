import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Apploader from "../component/Apploader";
import { userContext } from "../App";
import { getPicksSummary } from "../api";

function Home() {

  const {user} = useContext(userContext)
  const params = useParams();
  console.log("params", params);
  const [graph, setGraph] = useState(null);
  const [picks , setPicks] = useState([])
  console.log("🚀 ~ Home ~ picks:", picks)
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

  const getpickssummary = async () => {
    try {
       const response =  await getPicksSummary()
       console.log("get picks summary", response)     
       setPicks(response.data)
    } catch (error) {
      alert("There is some error");
    } 
  }


  useEffect(() => {
    appLoad()
    getpickssummary()
  }, [])
  return (
    <>
    <div className="text-center mb-5">
      <h1 className="text-white text-4xl font-bold">YTD MLB Pick Stats</h1>
    </div>
    <div className="bg-white  border-black py-5 mb-20 w-3/4 md:w-2/3 mx-auto border-4 h-auto rounded-[60px]">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 text-center gap-6">
          <div className="my-3">
            <h1 className="text-3xl font-bold underline">Total Bets</h1>
            <h2 className="text-2xl font-bold">{picks?.total_bets}</h2>
          </div>
          <div className="my-3">
            <h1 className="text-3xl font-bold underline">Win - Loss - Push</h1>
            <h2 className="text-2xl font-bold">{`${picks?.wins} - ${picks?.losses} - ${picks?.pushes}`}</h2>
          </div>
          <div className="my-3">
            <h1 className="text-3xl font-bold underline">Wins Percentage</h1>
            <h2 className="text-2xl font-bold">{picks?.win_percentage}%</h2>
          </div>
          <div className="my-3">
            <h1 className="text-3xl font-bold underline">Average Odds</h1>
            <h2 className="text-2xl font-bold">{picks?.average_odds}</h2>
          </div>
          <div className="my-3">
            <h1 className="text-3xl font-bold underline">Units</h1>
            <h2 className="text-2xl text-green-500 font-bold">{`${picks?.units >=0 ? "+"+picks?.units : picks?.units}`}</h2>
          </div>
          <div className="my-3">
            <h1 className="text-3xl font-bold underline">ROI</h1>
            <h2 className="text-2xl text-green-500 font-bold">{picks?.ROI}%</h2>
          </div>
        </div>
    </div>
   {
    !user &&
    <div className="m-4 mb-20">
    <img  src="/baddiehome2.png" width="100%" alt="add" style={{borderRadius:"70px" , height:"550px"}} />
  </div>
   }
    <div className="flex flex-col home-mobile items-center justify-center">
     
      <div className="bg-white h-auto m-4 w-full flex flex-col items-center justify-start p-4 ">
        <div className="w-4/5 zaddie-text bg-lightgray [letter-spacing:5px] sm:text-lg  p-4 text-center rounded-xl md:text-4xl">
          Zaddies of MLB
        </div>
        <div className="grid  sm:grid-cols-1 chart-section md:grid-cols-2 gap-6 mt-5 h-auto">
          {graph && graph.map((item,i)=>(
            <div  key={i} className={` my-2 ${loading?"hidden":""}`}>
              <img src={item.content.replace("storage.cloud.google.com","storage.googleapis.com") + `?new=${new Date()}`} alt="i" />
          </div>
          )) }
          {loading && <Apploader className="my-8" size={60}/>}
         
        </div>
      </div>
      <div className="bg-white  w-full image-section h-auto flex flex-col items-center justify-center text-xl">
        {[1,2,3,4,5,6].map(item=>(<img key={item} src={`/website_materials_homepg_${item}.png`} alt="home image" className="home_image" />))}
       
      </div>
    </div>
    </>
  );
}

export default Home;
