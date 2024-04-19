import React, { useEffect, useState } from "react";
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
    <>
    <div className="m-4">
      <img  src="/baddiehome.png" width="100%" alt="add" />
    </div>
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
