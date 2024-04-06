import React, { useEffect, useState } from 'react'
import { getPicks } from '../../api'
import Apploader from '../../component/Apploader'
import { useParams } from 'react-router'
import { Document, Page } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom'
import moment from 'moment';

const Page2 = () => {
  const location = useLocation()
  const { from } = location.state
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center px-4">
    <div className="bg-white w-full flex flex-col px-5 items-center py-3  text-xl">
      <div className="w-4/5 bg-gray team-over p-4 my-4 text-center rounded-xl text-2xl">
        <h1> {moment(from.date_key).format('dddd, MMM Do YY')}  - {from?.title || "There is some error"}</h1>        
      </div>
      <p className='text-greyLight team-over text-center my-4'><i>{from?.sub_title || "There is some error"}</i></p>
     {/* <div className='border-dashed border-2 w-[85%] px-5 text-center flex items-center justify-center my-4 h-[100vh]'>
      <p className='text-greyLight text-center team-over'>Text, Image Content - can be uploaded into an image or PDF format to avoid <br/> having to worry about layout etc.</p>
     </div> */}
     
     {loading && <><Apploader size={20}/> Wait Pdf is loading</>}
      {from?.content   && (
        <iframe src={from?.content + "#toolbar=0"} style={{ width: '100%', height: loading?"0px":'600px' }} width="100%" frameborder="0" onLoad={handleLoad} />
      //   <Document
      //   file={from?.content}
      //   onLoadSuccess={handleLoad}
      //   loading={<Apploader size={20} />}
      // >
      //   <Page pageNumber={1} width={window.innerWidth} />
      // </Document>
      )}
      
    </div>
   
  </div>
  )
}

export default Page2
