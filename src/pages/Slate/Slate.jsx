import React from 'react'
import { Link } from 'react-router-dom'

const Slate = () => {
  
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
        <h1 className='font-medium text-3xl my-2'>{`todays date`}</h1>
        </div>
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
      </div>
      </div>
      
 
      </>
  )
}

export default Slate
