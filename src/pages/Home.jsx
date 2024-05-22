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
    fetch("https://baddie.pro/graph-data1/")
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


  const keypoints = [
    {
      image: '/bet1.png',
      heading: 'Get That Alpha, Dog.',
      content: 'Maximize your returns by relying on tools from experts data scientists who know what you need to consistently make valuable sports picks, efficiently.'
    },
    {
      image: '/bet4.png',
      heading: 'The EV calculator',
      content: 'Gives you the power of Poisson distributions at your fingertips. Easily pull up matchups and find mispriced line for positive expected value.'
    },
    {
      image: '/bet2.png',
      heading: 'Player Segment Models',
      content: 'Use state of the are clustering algorithms to learn more about individual players & apply hidden insights for future performance predictions.'
    },
    {
      image: '/bet3.png',
      heading: 'Player/Team EDA Dashboard',
      content: 'Curates correlated factors with game performance into easily digestible visualizations for fast analysis.'
    },
    {
      image: '/bet5.png',
      heading: '7-10 Weekly Picks',
      content: 'From data scientists with handicapping experience, using our tools & expertise in variance to make sharp decisions.'
    },
    {
      image: '/bet6.png',
      heading: 'Bet with BADDIE',
      content: 'And so much more. bet like a data scientist.'
    },
  ];


  const bets = [
    {
      heading: 'Total Bets',
      content: picks?.total_bets,
    },
    {
      heading: 'Win Percentage',
      content: `${picks?.win_percentage } %`,
    },
    {
      heading: 'Units',
      content:`${picks?.units >=0 ? "+"+picks?.units : picks?.units}` ,
    },
    {
      heading: 'Win - Loss - Push',
      content: `${picks?.wins} - ${picks?.losses} - ${picks?.pushes}` ,
    },
    {
      heading: 'Average Odds',
      content: picks?.average_odds ,
    },
    {
      heading: 'ROI',
      content: `${picks?.ROI} %` ,
    },
  ];

  return (
    <>

<div className="top_banner border-black py-5 px-5 mb-20 fullwidth mx-auto  h-auto ">
        <div className="text-center">
        <h1><span>Bet</span> like a data scientist</h1>
        </div>
          {
    !user &&
    <>
    <div className="text-center">
    <h4>Tryna Link Up?</h4>
        <p>BADDIE's suite of tools & expert picks make betting like a data scientist easy asf. Get a taste of BADDIE's innovative take on sports betting.</p>
          </div>
         <p class="promo_code absolute">Use promo code <span>dIM3SDFK</span> for <span>25%</span> off the life of 
         your monthly sub at checkout for the entire season for a limited time</p>
  
   </>   
   }
    </div>



    


    <div className="section2">
    <div className="container m-auto">
    <div className="flex items-center bets-section">
    <div className="col-6">
    <img src="/section2image.png" alt="logo"/>
      </div>
      <div className="col-6">
      <h1 className="text-white text-4xl font-bold sec2heading">YTD MLB Pick Stats</h1>
      <p>$100 unit bettors have made $1643 year to date so far
       with BADDIE’s picks</p>

       <ul>
       {bets.map((item, index) => (
      <li key={index}>
        <div className="batting_stats">
        <h1 className="text-3xl font-bold underline">{item.heading}</h1>
        <h2 className="text-2xl font-bold">{item.content}</h2>
        </div>
        </li>
       
      ))}
      </ul>

       
       <div className="w-full btn-row">
       <button className="text-black  bg-lightgray text-lg  w-40  button"> YTD MLB Detail</button>
       </div>
    </div>
    </div>
    </div>
    </div>


   {/* {
    !user &&
    <div className="m-4 mb-20">
      
    <img  src="/website_materials_BADDIE_homepg_promo_header_mobile.png" className="md:hidden" width="100%" alt="add" style={{ height:"550px"}} />

    <img  src="/baddiehome2.png" className="hidden md:block" width="100%" alt="add" />
  </div>
   } */}


<div className="section3">
    <div className="container m-auto">
    <div className="p-4 text-center">
    <h1>Zaddies of MLB</h1>
    </div>
      {graph && graph.map((item,i)=>(
    
        <div  key={i} className={` flex row items-center justify-center graph-row ${loading?"hidden":""}`}>
          <div className="col-6">
                  <img src={item.content.replace("storage.cloud.google.com","storage.googleapis.com") + `?new=${new Date()}`} alt="i" />
                  </div>
                  <div className="col-6 graph-content">
                  <p>
                  {item.content_text}
                  </p>
              </div>
              </div>
    )) }

{loading && <Apploader className="my-8" size={60}/>}
   

{/* 
    <div className="flex flex-col home-mobile items-center justify-center">
     
      <div className="h-auto m-4 w-full flex flex-col items-center justify-start p-4 ">
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
      <div className="w-full image-section h-auto flex flex-col items-center justify-center text-xl">
        {[1,2,3,4,5,6].map(item=>(<img key={item} src={`/website_materials_homepg_${item}.png`} alt="home image" className="home_image" />))}
      </div>
    </div> */}
    
    </div>
      </div>


      <div className="section4">
    <div className="container m-auto">
    <div className="bets-container">
    {keypoints.map((item, index) => (
       <div  key={index} className={` flex row items-center justify-center bet-row`}>
          <div className="col-6">
          <img src={item.image} alt={item.heading} />
          </div>
          <div className="col-6  bet-content">
          <h2>{item.heading}</h2>
          <p>{item.content}</p>
          {index === 4 && 
          <button className="text-black  bg-lightgray text-lg  w-100 login-sign bet-mlb-btn">
                  YTD MLB Detail
                </button>}
                </div>
        </div>
      ))}
</div>
      </div>
    </div>
    </>
  );
}

export default Home;
