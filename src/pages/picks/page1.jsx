import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import { getPicks } from "../../api";
import Apploader from "../../component/Apploader";

const Page1 = () => {
  const {user} = useContext(userContext)
  const data = new Date()
  const dateFormate = moment(data).format('dddd, MMM Do YY'); 
  
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };
  const [picksData, setPicksData] = useState([])
  const [researchData, setReasearchData] = useState([])
  const [loader, setLoader] = useState(false)
  const onLoad = async () => {
    try {
      setLoader(true);
      const {data} = await getPicks({ "content_type": "pick", });
      console.log("🚀 ~ onLoad ~ data:", data)
      setPicksData(data)
      const {data:researchData} = await getPicks({ "content_type": "research", });
      console.log("🚀 ~ onLoad ~ researchData:", researchData)
      setReasearchData(researchData)
      setLoader(false);
    } catch (error) {
      alert("There is some error");
      setLoader(false);
    }

  };
  useEffect(() => { onLoad() }, []);
  
  if (loader) {
    return <div className="w-full h-full flex items-center justify-center"><Apploader size={80} />
    </div>
  }
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <h4 className="text-white page-title text-center lowercase font-bold mb-4">
        Sports picks & analytics hub
      </h4>
      <p className="text-white lowercase page-desc text-center mb-4">
        data scientist picks & research, curated for max value, hits different
      </p>
    {user?.status =="active" && <div className="bg-white w-full h-[85vh] overflow-x-auto example flex flex-col items-center py-3 text-xl">
        <div className="w-4/5 bg-gray picks-text p-4 my-4 text-center rounded-xl text-2xl">
          MLB sports picks - {dateFormate}
        </div>
        {
          picksData.map((item,i)=>{
            return <Link
            to= {'/picks-analysis2' }
            state={{ from: item }}
            className="w-4/5 bg-lightblue my-4 text-white p-4 text-center rounded-xl text-2xl"
          >
            <span className="pitcher-title ">
              {item?.title}
            </span>
            <span className="pitcher-desc text-xl">{item.sub_title}</span>
          </Link>
          })
        }
        {/* <div className="w-4/5 bg-lightblue my-3 text-white p-4 text-center rounded-xl text-2xl">
          <span className="pitcher-title">
            Pitcher B (Team) over 15.5 Ks Outs Recorded
          </span>
          <span  className="pitcher-desc text-xl">
            beat-up bullpen & good pitching weather shoul lead to a lengthly
            outing
          </span>
        </div> */}
        {/* <div className="w-4/5 bg-lightblue my-3 text-white p-4 text-center rounded-xl text-2xl">
          <h4 className="pitcher-title">
            Batter A (Team) over 1.5 Ks (Total Bases)
          </h4>
          <p  className="pitcher-desc">
            Lefty masher goes to Yankee Stadium & bats against a below-average
            LHP
          </p>
        </div> */}
      </div>}
      <div className="bg-white m-4 w-full h-[65vh]  example flex flex-col overflow-x-auto items-center justify-start p-4 ">
        <div className="w-4/5 bg-gray research-text p-4 my-4 text-center rounded-xl text-2xl">
        research & analysis
        </div>
        {
          researchData.map((item,i)=>{
            return <Link
            to= {'/picks-analysis2' }
            state={{ from: item }}
          className="w-4/5 bg-lightgreen my-4 text-white p-4 text-center rounded-xl text-2xl flex flex-col"
        >
          <span className="pitcher-title text-2xl">
          {moment(item?.date_key).format('dddd, MMM Do YY')}
          </span>
          <span className="pitcher-title text-2xl">
          {item?.title}
          </span>
          <span className="pitcher-desc text-xl">{item.sub_title}</span>
          </Link>
          })
        }
        
        {/* <div className="w-4/5 bg-lightgreen my-3 text-white p-4 text-center rounded-xl text-2xl">
          <h4 className="pitcher-title">
            Pitcher A (Team) over 5.5 Ks (title)
          </h4>
          <p className="pitcher-desc">
            beat-up bullpen & good pitching weather shoul lead to a lengthly
            outing
          </p>
        </div> */}
      
      </div>
    </div>
  );
};

export default Page1;
