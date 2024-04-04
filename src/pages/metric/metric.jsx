import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetPlayerApi, GetTeamApi } from "../../api";

const Metric = () => {
  const {type} = useParams()
  const [team, setTeam] = useState([]);
  const [player, setPlayer] = useState(null);
  const onLoad = async () => {
    try {
      const [teams, pitcherData,] = await Promise.all([GetTeamApi(), GetPlayerApi(type)])
      setTeam(teams?.data?.team || []);
      setPlayer(pitcherData.data);
      
    } catch (error) {
      alert("There is some error");
    }

  };
  useEffect(() => { onLoad() }, []);
  return (
    <div className="flex flex-col px-4">
      <div className="text-center">
        <h4 className="text-white page-title font-bold mb-4">
        {type.charAt(0).toUpperCase() + type.slice(1)}  Metric Model
        </h4>
        {type == "pitcher" ? <p className="text-white  page-desc mb-4">
        see the results of our expertly crafted pitcher strikeouts prediction model
        </p>: <p className="text-white  page-desc mb-4">
        leverage our lovingly made batter total bases prediction model
        </p>}
      </div>
      <div className="bg-white h-[100vh] w-full flex flex-col px-20 py-10  text-xl">
        <div className="flex justify-between">
           <div>
           <select className="[letter-spacing:5px] bg-lightgray py-3 rounded px-40 focus:outline-none appearance-none">
                <option>Player Name</option>
               {player && player?.player_name.map((item, i) => (
                               (
                                <option key={i} >
                                  {item}
                                </option>
                              )
                            ))
                          }
            </select>
           </div>
           <div>
           <select className="[letter-spacing:5px] bg-lightgray py-3 rounded px-40 focus:outline-none appearance-none">
                <option>Team</option>
                {team.map((item, i) => (
                               (
                                <option key={i} >
                                  {item}
                                </option>
                              )
                            ))
                          }
            </select>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Metric;
