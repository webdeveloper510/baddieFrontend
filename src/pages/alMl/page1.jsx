import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";

const AlPage1 = () => {
  
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h4 className="text-white page-title text-center font-bold mb-4">
        AI & ML
      </h4>
      <p className="text-white page-desc text-center mb-4">
        straight up high-quality outputs & predictions using AI & ML
      </p>

       <div className="bg-white w-full py-5 my-4 example flex flex-col h-[50vh] overflow-x-auto items-center">
        <div className="w-4/5 bg-gray tool-text p-4 my-4 pitcher-tools text-center rounded-xl text-2xl">
          pitcher tools
        </div>

        <div className="w-4/5 bg-lightblue my-4 text-white p-4 text-center rounded-xl text-2xl">
          <Link to="/al-ml-hub/pitcher">
            <h5 className="text-2xl segment font-semibold">
              Pitcher Segmentation Model
            </h5>
            <p className="text-lg segment-desc">
              uncover pitcher groups that share similar characteristics &
              examine performance
            </p>
          </Link>
        </div>

        {/* <div className="w-4/5 bg-lightblue my-3 text-white p-4 text-center rounded-xl text-2xl">
          <Link to="/metric-model/pitcher">
            <h5 className="text-2xl segment font-semibold">
              Pitcher Ks Model
            </h5>
            <p className="text-lg segment-desc">
              see the results of our expertly crafted pitcher strikeouts
              prediction model
            </p>
          </Link>
        </div> */}
        {/* <div className="w-4/5 bg-lightblue my-3 text-white p-4 text-center rounded-xl text-2xl">
          <Link to="/metric-model/pitcher">
            <h5 className="text-2xl segment font-semibold">
              Pitcher Hits Allowed Model
            </h5>
            <p className="text-lg segment-desc">
              explore the outputs of our pitcher hits allowed prediction model
            </p>
          </Link>
        </div> */}
      </div>
      <div className="bg-white w-full py-5 my-4 example flex flex-col h-[50vh] overflow-x-auto items-center">
        <div className="w-4/5 bg-gray tool-text pitcher-tools p-4 my-4 text-center rounded-xl ">
          batter tools
        </div>
        <div className="w-4/5 bg-lightgreen my-4 text-white p-4 text-center rounded-xl text-2xl">
          <Link to="/al-ml-hub/batter">
            <h5 className="text-2xl segment font-semibold">
              Batter Segmentation Model
            </h5>
            <p className="text-lg segment-desc">
              take a look at batter clusters to unearth hidden insights & trends
            </p>
          </Link>
        </div>
        {/* <div className="w-4/5 bg-lightgreen my-3 text-white p-4 text-center rounded-xl text-2xl">
          <Link to="/metric-model/batter">
            <h5 className="text-2xl segment font-semibold">
              Batter Total Bases Model
            </h5>
            <p className="text-lg segment-desc">
              leverage our lovingly made batter total bases prediction model
            </p>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default AlPage1;
