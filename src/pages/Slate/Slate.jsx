import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getMatchupData } from '../../api';

const Slate = () => {

  const [data, setData] = useState(null)

  const getmatchup = () =>{
    getMatchupData().then((res)=>{
      console.log("res", res)
      setData(res)
    }).catch((error)=>{
      console.log(error)
    })
  }
  
  useEffect(()=>{
    getmatchup()
  },[])

  return (
   <>
    <div className="flex flex-col items-center w-[100%] bg-lightblack  px-4 min-w-full">
      <div className="text-center">
        <h2 className="text-white page-title text-4xl font-bold mb-4">
          daily matchup aggregate numerable
        </h2>
      </div>
      <div className="bg-white  m-auto flex flex-col px-20 main-section py-10 text-xl min-w-full">
        <div className='text-center'>
        <h1 className='font-bold text-5xl'>The Slate</h1>
        <h1 className='font-medium text-3xl my-2'>{data?.date_key}</h1>
        </div>
        

        <div className="my-10 px-10">
        <Tabs >
        {data?.data?.hr?.length > 0 ?
        data?.data?.date?.map((item, i) => (
          <TabPanel key={i}>
          <div className="w-full border-4 my-3 px-20 slate-box py-5 rounded-[60px] text-center border-black h-auto" >
           <div className='my-3'>
           <h1 className='font-extrabold text-4xl my-2'>{data?.data?.teams_away_team_name?.[i]}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`@`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-extrabold text-4xl my-2'>{data?.data?.teams_home_team_name?.[i]}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`Game ${data.data.series_game_number[i]} of ${data.data.games_in_series[i]} in Series`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`issa ${data.data.day_night[i]} game`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`Park: ${data.data.venue_name[i]}`}</h1>
           </div>

           <Link to="/game-page">
           <div className='rounded-[40px] bg-[#0d9957] py-2 my-5'>
           <h1 className='font-medium text-3xl my-2'>Fangraphs Park Factors</h1>
           <div className='grid md:grid-cols-3 sm:grid-cols-1 mb-2'>
           <h1 className='font-medium text-3xl my-2'>3yr: {data.data?.[`3yr`][i]}</h1>
           <h1 className='font-medium text-3xl my-2'>1yr: {data.data?.[`1yr`][i]}</h1>
           <h1 className='font-medium text-3xl my-2'>HR: {data.data?.hr[i]}</h1>
           </div>
           </div></Link>
        </div>
          </TabPanel>
        ))
      :""}
         
          {/* <TabPanel>
          <div className="w-full border-4 my-3 px-20 slate-box py-5 rounded-[60px] text-center border-black h-auto" >
           <div className='my-3'>
           <h1 className='font-extrabold text-4xl my-2'>{`Tampa Bay Rays`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`@`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-extrabold text-4xl my-2'>{`Chicago White Sox`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`# 1 of 3 in Series`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`issa day game`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`Park: Guaran Rate Field`}</h1>
           </div>

           <Link to="/game-page">
           <div className='rounded-[40px] bg-[#0d9957] py-2 my-5'>
           <h1 className='font-medium text-3xl my-2'>Fangraphs Park Factors</h1>
           <div className='grid md:grid-cols-3 sm:grid-cols-1 mb-2'>
           <h1 className='font-medium text-3xl my-2'>3yr: {`95`}</h1>
           <h1 className='font-medium text-3xl my-2'>1yr: {`98`}</h1>
           <h1 className='font-medium text-3xl my-2'>HR: {`101`}</h1>
           </div>
           </div></Link>
        </div>
          </TabPanel>
          <TabPanel>
          <div className="w-full border-4 my-3 px-20 slate-box py-5 rounded-[60px] text-center border-black h-auto" >
           <div className='my-3'>
           <h1 className='font-extrabold text-4xl my-2'>{`Tampa Bay Rays`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`@`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-extrabold text-4xl my-2'>{`Chicago White Sox`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`# 1 of 3 in Series`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`issa day game`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`Park: Guaran Rate Field`}</h1>
           </div>

           <Link to="/game-page">
           <div className='rounded-[40px] bg-[#0d9957] py-2 my-5'>
           <h1 className='font-medium text-3xl my-2'>Fangraphs Park Factors</h1>
           <div className='grid md:grid-cols-3 sm:grid-cols-1 mb-2'>
           <h1 className='font-medium text-3xl my-2'>3yr: {`02`}</h1>
           <h1 className='font-medium text-3xl my-2'>1yr: {`02`}</h1>
           <h1 className='font-medium text-3xl my-2'>HR: {`02`}</h1>
           </div>
           </div></Link>
        </div>
          </TabPanel>
          <TabPanel>
          <div className="w-full border-4 my-3 px-20 slate-box py-5 rounded-[60px] text-center border-black h-auto" >
           <div className='my-3'>
           <h1 className='font-extrabold text-4xl my-2'>{`Tampa Bay Rays`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`@`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-extrabold text-4xl my-2'>{`Chicago White Sox`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`# 1 of 3 in Series`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`issa day game`}</h1>
           </div>
           <div className='my-3'>
           <h1 className='font-medium text-4xl my-2'>{`Park: Guaran Rate Field`}</h1>
           </div>

           <Link to="/game-page">
           <div className='rounded-[40px] bg-[#0d9957] py-2 my-5'>
           <h1 className='font-medium text-3xl my-2'>Fangraphs Park Factors</h1>
           <div className='grid md:grid-cols-3 sm:grid-cols-1 mb-2'>
           <h1 className='font-medium text-3xl my-2'>3yr: {`03`}</h1>
           <h1 className='font-medium text-3xl my-2'>1yr: {`03`}</h1>
           <h1 className='font-medium text-3xl my-2'>HR: {`03`}</h1>
           </div>
           </div></Link>
        </div>
          </TabPanel> */}
          <TabList className="flex flex-wrap mt-3   text-center justify-center">
            {/* Total Products */}
            {
              data?.data?.date?.map((item, i)=>(
                <Tab className="cursor-pointer react-dot-tab" key={i}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-dot mx-[-5px]"
                viewBox="0 0 16 16"
              >
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              </svg>
            </Tab>
              ))
            }
            
            {/* Total Order  */}
           
          </TabList>
        </Tabs>
      </div>
      </div>
      </div>
      
 
      </>
  )
}

export default Slate
