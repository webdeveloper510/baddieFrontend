import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DataTable from "react-data-table-component";
import {
  getDamnEvcal,
  getSingleMatchup,
  getWeatherData,
  getTeamDefense,
  postDamnMetric,
  postStatsWorkload,
} from "../../api";
import Apploader from "../../component/Apploader";
import DirectionImage from "../../component/DirectionImage";
// import graphImage from "/graph-image.png"

const GamePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [team, setTeam] = useState(null);
  console.log("🚀 ~ GamePage ~ team:", team);
  const [player, setPlayer] = useState(null);
  const [weather, setWeather] = useState(true);
  const [loader, setLoader] = useState(false);
  const [metricType, setMetricType] = useState("Ks");
  const [loader2, setLoader2] = useState(false);
  const [range, setRange] = useState(5);
  const [rangeMax, setRangeMax] = useState(10);
  const [rangeDefault, setRangeDefault] = useState(5);
  const [equality, setEquality] = useState("less than or equal to");
  console.log("🚀 ~ GamePage ~ data:", data);
  const [damnMetric, setDamnMetric] = useState(null);
  const [statsworkload, setStatsworkload] = useState(null);
  const [columns1, setColumns1] = useState([]);
  const [homeheading, setHomeheading] = useState([]);
  const [statsLoader, setStatsLoader] = useState(false);
  const [segmentData, setSegmentData] = useState([]);
  const [homeWorkload, setHomeWorkload] = useState([]);

  const { state } = useLocation();
  const index = state?.[2]?.index;
  console.log("🚀 ~ GamePage ~ index:", index);
  console.log("🚀 ~ GamePage ~ state:", state);
  const wind_direction = [
    {
      name: "SE",
      degree: "270deg",
      scale: 1.14,
    },
    {
      name: "WNW",
      degree: "0deg",
      scale: 1.14,
    },
    {
      name: "SSW",
      degree: "0deg",
      scale: 1.14,
    },
    {
      name: "WSW",
      degree: "292.5deg",
      scale: 1.13,
    },
    {
      name: "SSE",
      degree: "315deg",
      scale: 1.13,
    },
    {
      name: "W",
      degree: "90deg",
      scale: 1.11,
    },
    {
      name: "ENE",
      degree: "248.5deg",
      scale: 1.09,
    },
  ];

  const bullpendata = [
    "Caleb Thielbar" , "Steven Okert" , "Josh Staumount" , "Griffin Jax" , "Diego Castillo", "Jorge Alcala", "Jhoan Duran" ,"Cole Sands"
  ]

  const bgColor = [
    {
      name: "Under Edge",
      color: "#22c55e",
    },
    {
      name: "Over Edge",
      color: "#22c55e",
    },
    {
      name: "Under Edge - Potential Outlier",
      color: "#ff7800",
    },
    {
      name: "Over Edge - Potential Outlier",
      color: "#ff7800",
    },
    {
      name: "Fair Value",
      color: "transparent",
    },
    {
      name: "No Edge - No Value",
      color: "#f93e3e",
    },
  ];

  useEffect(() => {
    switch (metricType) {
      case "Ks": {
        setRangeMax(10);
        setRangeDefault(5);
        setRange(5);
        break;
      }
      case "Hits Allowed": {
        setRangeMax(10);
        setRangeDefault(5);
        setRange(5);
        break;
      }
      case "Walks": {
        setRangeMax(5);
        setRangeDefault(2);
        setRange(1);
        break;
      }
      case "Outs": {
        setRangeMax(27);
        setRangeDefault(15);
        setRange(15);
        break;
      }
      case "Earned Runs": {
        setRangeMax(5);
        setRangeDefault(15);
        setRange(2);
        break;
      }
    }
  }, [metricType]);

  const getWeather = () => {
    setStatsLoader(true)
    getWeatherData()
      .then((res) => {
        // setLoader(false);
        console.log("res weather data", res);
        setWeather(res);
        getTeamDefense({
          away_team_name: res?.data?.teams_away_team_name?.[index],
          home_team_name: res?.data?.teams_home_team_name?.[index],
        })
          .then((response) => {
            setTeam(response);
          })
          .catch((error) => {
            console.log(error);
          });
         
        postStatsWorkload({
          away_team_id: res?.data?.teams_away_team_id?.[index],
          home_team_id: res?.data?.teams_home_team_id?.[index],
          date_key: state?.[2]?.date_key,
        })
          .then((resStat) => {
            console.log("resssss stats", resStat);
            setStatsLoader(false)
            setStatsworkload(resStat);
            const data = resStat?.away_workload;
            const keys = Object.keys(data);
            setColumns1(keys);
            const result = data[keys[0]].map((item, index) => {
              let newObject = {};
              keys.forEach((k) => {
                newObject[k] = data[k][index];
              });
              return newObject;
            });
            
            setSegmentData(result)

            const datahome = resStat?.home_workload;
            const keyshome = Object.keys(datahome);
            setHomeheading(keyshome);
            const resulthome = datahome[keyshome[0]].map((item, index) => {
              let newObject = {};
              keys.forEach((k) => {
                newObject[k] = datahome[k][index];
              });
              return newObject;
            });

            setHomeWorkload(resulthome);
          })
          .catch((error) => {
            console.log(error);
            setStatsLoader(false)
          });
      })
      .catch((error) => {
        // setLoader(false);
        console.log(error);
      });
  };

  // const getAwayData = () => {
  //   setLoader(true);
  //   getDamnEvcal({
  //     game_pk: state?.[2].game_pk,
  //     date_key: state?.[2]?.date_key,
  //   })
  //     .then((res) => {
  //       setLoader(false);
  //       console.log("damn evcal data", res);
  //       setData(res);
  //     })
  //     .catch((error) => {
  //       setLoader(false);
  //       console.log(error);
  //     });
  // };

  const getMatchupData = () => {
    // setLoader(true);
    getSingleMatchup({
      game_pk: state?.[2].game_pk,
      date_key: state?.[2]?.date_key,
    })
      .then((res) => {
        // setLoader(false);
        console.log("getSingleMatchup", res);
        setPlayer(res);

        const awayData = {
          stat_type: "pitcher",
          player_id: res?.data?.player_id_away
            ? res?.data?.player_id_away
            : res?.data?.player_id_home,
          opp_team_id: res?.data?.player_id_away
            ? res?.data?.opp_team_id_home
            : res?.data?.opp_team_id_away,
          home_away: res?.data?.player_id_away ? "away" : "home",
          metric_type: "Ks",
          prob_type: equality,
          metric_val: range,
        };

        //  if(res?.data?.player_id_away && res?.data?.opp_team_id_away){
        setLoader2(true);
        postDamnMetric(awayData)
          .then((res) => {
            setLoader2(false);
            console.log("res val", res);
            setDamnMetric(res);
          })
          .catch((error) => {
            console.log(error);
            setLoader2(false);
          });
        // }
      })
      .catch((error) => {
        // setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    // getAwayData();
    getMatchupData();
    getWeather();
  }, []);

  const handeSubmit = (value) => {
    setLoader2(true);
    console.log("valueeeeeeeeeeee", value);
    const awayData = {
      stat_type: "pitcher",
      player_id: player?.data?.player_id_away,
      opp_team_id: player?.data?.opp_team_id_home,
      home_away: "away",
      metric_type: metricType,
      prob_type: equality,
      metric_val: range,
    };

    const homeData = {
      stat_type: "pitcher",
      player_id: player?.data?.player_id_home,
      opp_team_id: player?.data?.opp_team_id_away,
      home_away: "home",
      metric_type: metricType,
      prob_type: equality,
      metric_val: range,
    };

    const newData = value === "away" ? awayData : homeData;

    postDamnMetric(newData)
      .then((res) => {
        setLoader2(false);
        console.log("res val", res);
        setDamnMetric(res);
      })
      .catch((error) => {
        console.log(error);
        setLoader2(false);
      });
  };

  if (loader) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Apploader size={80} />
      </div>
    );
  }

  const callColor = (value) => {
    const matchObj = bgColor.find((item) => item?.name === value);
    return (
      <td
        className={`border-b-2 border-b-gray`}
        style={{ background: matchObj?.color }}
      >
        {value}
      </td>
    );
  };

  const handleStatsWorkload = (value) => {
    setStatsLoader(true);
    postStatsWorkload({ team_id: value, date_key: state?.[2]?.date_key })
      .then((resStat) => {
        console.log("resssss stats", resStat);
        setStatsLoader(false);
        setStatsworkload(resStat);
        const data = resStat?.workload;
            const keys = Object.keys(data);
            setColumns1(keys);
            const result = data[keys[0]].map((item, index) => {
              let newObject = {};
              keys.forEach((k) => {
                newObject[k] = data[k][index];
              });
              return newObject;
            });

            setSegmentData(result);
      })
      .catch((error) => {
        console.log(error);
        setStatsLoader(false);
      });
  };

  return (
    <>
      <div className="flex flex-col pt-16 items-center w-[100%] bg-lightblack  px-4 min-w-full">
        <div className="bg-white  m-auto flex flex-col px-20 h-auto main-section py-10 text-xl min-w-full">
          <div className="text-center">
            <h1 className="font-bold text-7xl main-heading">
              daily aggregate matchup
            </h1>
          </div>
          <div className="flex mt-16 game-upper-section">
            <div className="w-[60%] game-section">
              <div className="w-full border-4 my-3 px-10  slate-box game-box py-5 rounded-[60px] text-center border-black h-auto">
                <div className="flex_section">
                  <div className="my-1">
                    <h1 className="font-extrabold text-3xl game-text">
                      {weather?.data?.teams_away_team_name?.[index]}
                    </h1>
                  </div>
                  <div className="my-1">
                    <h1 className="font-medium text-3xl game-text">{`@`}</h1>
                  </div>
                  <div className="my-1">
                    <h1 className="font-extrabold text-3xl game-text">
                      {weather?.data?.teams_home_team_name?.[index]}
                    </h1>
                  </div>
                </div>
                <div className="inner_section">
                  <div className="game-inner-text">
                    <div className="my-1">
                      <h1 className="font-medium text-3xl game-text">{`Game ${weather?.data?.series_game_number[index]} of ${weather?.data?.games_in_series[index]} in Series`}</h1>
                    </div>
                    <div className="my-1">
                      <h1 className="font-medium text-3xl game-text">{`issa ${weather?.data?.day_night[index]} game`}</h1>
                    </div>
                    <div className="my-1">
                      <h1 className="font-medium text-3xl game-text">{`Park: ${weather?.data?.venue_name[index]}`}</h1>
                    </div>
                  </div>

                  <div>
                    <div className="rounded-[40px] purple-card  bg-[#ac82e5] py-2 my-5">
                      <h1 className="font-medium text-3xl my-2">
                        SC Park Factors
                      </h1>
                      <div className="grid md:grid-cols-3 sm:grid-cols-1  mb-2">
                        <h1 className="font-medium text-3xl my-2">
                          3yr: {weather?.data?.[`3yr`][index]}
                        </h1>
                        <h1 className="font-medium text-3xl my-2">
                          1yr: {weather?.data?.[`1yr`][index]}
                        </h1>
                        <h1 className="font-medium text-3xl my-2">
                          HR: {weather?.data?.hr[index]}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div>
                  <div className="rounded-[40px] bg-[#0d9957] py-2 my-5">
                    <h1 className="font-medium text-3xl game-text my-2">
                      Fangraphs Park Factors
                    </h1>
                    <div className="grid grid-cols-3 mb-2">
                      <h1 className="font-medium text-3xl game-text my-2">
                        3yr: {state?.[2]?.year3}
                      </h1>
                      <h1 className="font-medium text-3xl game-text my-2">
                        1yr: {state?.[2]?.year1}
                      </h1>
                      <h1 className="font-medium text-3xl game-text my-2">
                        HR: {state?.[2]?.hr}
                      </h1>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="w-[40%] game-section flex justify-center items-center">
              <div className="text-center desktop">
                <h1 className="text-5xl font-bold leading-normal team-text">
                  {player?.data?.player_name_away
                    ? player?.data?.player_name_away
                    : "TBD"}
                </h1>
                <p className="text-5xl">Vs. </p>
                <h1 className="text-5xl font-bold leading-normal team-text">
                  {player?.data?.player_name_home
                    ? player?.data?.player_name_home
                    : "TBD"}
                </h1>
              </div>
              <div className="text-center mobile mt-5">
                <h1 className="font-bold leading-normal text-2xl flex-nowrap">
                  {player?.data?.player_name_away}
                  <span className="font-normal"> Vs. </span>
                  {player?.data?.player_name_home}
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h1 className="text-5xl font-bold text-center underline game-titles">
              Starting Pitcher EV Calculator
            </h1>
          </div>

          {player?.data?.player_name_away == "" &&
          player?.data?.player_name_home == "" ? (
            ""
          ) : (
            <div className="mt-20">
              <Tabs>
                <TabList className="!flex justify-between tab-lists">
                  {player?.data?.player_name_away == "" ? (
                    ""
                  ) : (
                    <Tab
                      onClick={() => handeSubmit("away")}
                      className="bg-gray border-2 border-black p-3 text-2xl carlos-tab w-[45%] text-center"
                    >
                      {player?.data?.player_name_away
                        ? player?.data?.player_name_away
                        : "TBD"}
                    </Tab>
                  )}
                  <Tab
                    onClick={() => handeSubmit("home")}
                    className="bg-gray border-2 border-black p-3 text-2xl carlos-tab w-[45%] text-center"
                  >
                    {player?.data?.player_name_home
                      ? player?.data?.player_name_home
                      : "TBD"}
                  </Tab>
                </TabList>

                {player?.data?.player_name_away == "" ? (
                  ""
                ) : (
                  <TabPanel>
                    <div className="w-full border-4 mt-20 my-3 px-10  slate-box game-box py-5 rounded-[30px] text-center border-black h-auto">
                      {loader2 ? (
                        <div className="flex justify-center">
                          <Apploader size={80} />
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between metric-sections">
                            <div>
                              <select
                                onChange={(e) => setMetricType(e.target.value)}
                                className="py-3 bg-[#e6e6e6] !border-0 px-9 my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                              >
                                <option value="">{metricType}</option>
                                {[
                                  "Ks",
                                  "Hits Allowed",
                                  "Walks",
                                  "Outs",
                                  "Earned Runs",
                                ].map((item, i) => (
                                  <option key={i} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="text-center w-96 text-[#2a3f5f]  player-select">
                              <select
                                className=" player-list selector-mobile w-full  greater py-3 bg-[#e6e6e6] !border-0 px-9 rounded mt-6"
                                value={equality}
                                onChange={(e) => setEquality(e.target.value)}
                              >
                                <option value="less than or equal to">
                                  less than or equal to
                                </option>
                                <option value="equal to">equal to</option>
                                <option value="greater than">
                                  greater than
                                </option>
                              </select>
                            </div>
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handeSubmit("away")}
                                className="bg-black w-40 text-white px-5 my-4 py-2 rounded"
                              >
                                run
                              </button>
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="text-center">
                              <span className="text-2xl font-bold">
                                {range}
                              </span>
                            </div>
                            <div className="w-[50%] m-auto progress-bars my-5">
                              <input
                                id="steps-range"
                                type="range"
                                min="0"
                                max={rangeMax}
                                value={range}
                                step="1"
                                className="w-full h-2 bg-red-600 rounded-lg appearance-none cursor-pointer"
                                onChange={(e) => {
                                  setRange(e.target.value);
                                }}
                              ></input>
                              <div className="flex justify-between">
                                <h4>0</h4>
                                <h4>{rangeMax}</h4>
                              </div>
                            </div>
                          </div>
                          <div className="flex mt-5 justify-evenly">
                            <div>
                              <h3 className="text-lg font-medium">
                                Expected Probability
                              </h3>
                              <h2 className="text-4xl mt-3 font-semibold metric-data">
                                {damnMetric?.probability
                                  ? damnMetric?.probability
                                  : "0"}
                              </h2>
                            </div>
                            <div>
                              <h3 className="text-lg font-medium">
                                Fair Value Estimate (US Odds)
                              </h3>
                              <h2 className="text-4xl mt-3 font-semibold metric-data">
                                {damnMetric?.fairvalue
                                  ? `${damnMetric?.fairvalue} or better`
                                  : "0"}
                              </h2>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabPanel>
                )}
                <TabPanel>
                  <div className="w-full border-4 mt-20 my-3 px-10  slate-box game-box py-5 rounded-[30px] text-center border-black h-auto">
                    {loader2 ? (
                      <div className="flex justify-center">
                        <Apploader size={80} />
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between metric-sections">
                          <div>
                            <select
                              onChange={(e) => setMetricType(e.target.value)}
                              className="py-3 bg-[#e6e6e6] !border-0 px-9 my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                            >
                              <option value={metricType}>{metricType}</option>
                              {[
                                "Ks",
                                "Hits Allowed",
                                "Walks",
                                "Outs",
                                "Earned Runs",
                              ].map((item, i) => (
                                <option key={i} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="text-center w-96 text-[#2a3f5f]  player-select">
                            <select
                              className=" player-list selector-mobile w-full  greater py-3 bg-[#e6e6e6] !border-0 px-9 rounded mt-6"
                              value={equality}
                              onChange={(e) => setEquality(e.target.value)}
                            >
                              <option value="less than or equal to">
                                less than or equal to
                              </option>
                              <option value="equal to">equal to</option>
                              <option value="greater than">greater than</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handeSubmit("home")}
                              className="bg-black w-40 text-white px-5 my-4 py-2 rounded"
                            >
                              run
                            </button>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="text-center">
                            <span className="text-2xl font-bold">{range}</span>
                          </div>
                          <div className="w-[50%] m-auto progress-bars my-5">
                            <input
                              id="steps-range"
                              type="range"
                              min="0"
                              max={rangeMax}
                              value={range}
                              step="1"
                              className="w-full h-2 bg-red-600 rounded-lg appearance-none cursor-pointer"
                              onChange={(e) => {
                                setRange(e.target.value);
                              }}
                            ></input>
                            <div className="flex justify-between">
                              <h4>0</h4>
                              <h4>{rangeMax}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="flex mt-5 justify-evenly">
                          <div>
                            <h3 className="text-lg font-medium">
                              Expected Probability
                            </h3>
                            <h2 className="text-4xl mt-3 font-semibold metric-data">
                              {damnMetric?.probability
                                ? damnMetric?.probability
                                : " 0"}
                            </h2>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">
                              Fair Value Estimate (US Odds)
                            </h3>
                            <h2 className="text-4xl mt-3 font-semibold metric-data">
                              {damnMetric?.fairvalue
                                ? `${damnMetric?.fairvalue} or better`
                                : "0"}
                            </h2>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          )}

          <div className="mt-20">
            <h1 className="text-5xl font-bold text-center underline game-titles">
              Game Info
            </h1>
            <div>
              <div className="rounded-[50px]  px-20 bg-[#40ecd9] py-5 my-5 mobile_padding">
                <div className="text-left px-5 mb-2">
                <h1 className="font-medium text-center text-5xl underline mb-10">
                          Weather
                        </h1>
                  {weather?.data?.Game_Temp?.[index] ? (
                    <div className="grid grid-cols-3 weather-text">
                      <div className="flex justify-center weather-text1 items-center">
                        <h1 className="font-medium text-5xl game-data my-2">
                          {`${weather?.data?.Game_Temp?.[index]}°`}
                        </h1>
                      </div>
                      <div className="text-center weather-text2">
                        
                        <h1 className="font-medium text-4xl mt-4 my-2">
                          {`${weather?.data?.Game_Precip?.[index]}% `}
                        </h1>
                        <h1 className="font-medium text-center leading-none chance-text text-4xl my-2">
                          Chance of <br/> precip
                        </h1>
                      </div>
                      <div className="text-center weather-text3">
                        <DirectionImage
                          newclass="newclass"
                          windDir={weather?.data?.Game_Wind_Dir_SVG_Rotate?.[index]}
                          windDirection={wind_direction}
                          name={weather?.data?.Game_Wind_Direction?.[index]}
                        />
                        <h1 className="font-medium text-center text-4xl my-2">
                          {`${weather?.data?.Game_Wind_MPH?.[index]}MPH`}
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="font-medium text-red-600 text-center text-3xl  mb-10">
                        No weather data available at this time
                      </h1>
                    </>
                  )}
                </div>

                <div className="mt-5 mb-5 p-2 lg:w-[98%] md:max-w-[70vw] m-auto table-outer-section overflow-x-auto">
                  <table className="w-full">
                    <thead className="table-header">
                      <tr>
                        <th className="text-center px-5"></th>
                        <th className="text-center px-5">Temp (F)</th>
                        <th className="text-center px-5">Chance of Precip</th>
                        <th className="text-center px-5">Humidity</th>
                        <th className="text-center px-5">Dewpoint</th>
                        <th colSpan="2" className="text-center px-5">
                          Wind
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      <tr>
                        <th className="text-left px-5">
                          {weather?.data?.GH_N2_Time?.[index]
                            ? weather?.data?.GH_N2_Time?.[index]
                            : "-"}
                        </th>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N2_Temp?.[index]
                            ? weather?.data?.GH_N2_Temp?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N2_Temp?.[index]
                            ? `${weather?.data?.GH_N2_Precip?.[index]}%`
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N2_Humidity?.[index]
                            ? weather?.data?.GH_N2_Humidity?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N2_Dewpoint?.[index]
                            ? weather?.data?.GH_N2_Dewpoint?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N2_Wind_Dir?.[index]
                            ? weather?.data?.GH_N2_Wind_Dir?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5 whitespace-nowrap">
                          {weather?.data?.GH_N2_Wind_MPH?.[index]
                            ? `${weather?.data?.GH_N2_Wind_MPH?.[index]} MPH`
                            : "-"}
                        </td>
                      </tr>
                      <tr className="border-b-2">
                        <th className="text-left  px-5">
                          {weather?.data?.GH_N1_Time?.[index]
                            ? weather?.data?.GH_N1_Time?.[index]
                            : "-"}
                        </th>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N1_Temp?.[index]
                            ? weather?.data?.GH_N1_Temp?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N1_Temp?.[index]
                            ? `${weather?.data?.GH_N1_Precip?.[index]}%`
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N1_Humidity?.[index]
                            ? weather?.data?.GH_N1_Humidity?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N1_Dewpoint?.[index]
                            ? weather?.data?.GH_N1_Dewpoint?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N1_Wind_Dir?.[index]
                            ? weather?.data?.GH_N1_Wind_Dir?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_N1_Wind_MPH?.[index]
                            ? `${weather?.data?.GH_N1_Wind_MPH?.[index]} MPH`
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left px-5">
                          {weather?.data?.GH_1_Time?.[index]
                            ? weather?.data?.GH_1_Time?.[index]
                            : "-"}
                        </th>
                        <td className="text-center px-5">
                          {weather?.data?.GH_1_Temp?.[index]
                            ? weather?.data?.GH_1_Temp?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_1_Temp?.[index]
                            ? `${weather?.data?.GH_1_Precip?.[index]}%`
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_1_Humidity?.[index]
                            ? weather?.data?.GH_1_Humidity?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_1_Dewpoint?.[index]
                            ? weather?.data?.GH_1_Dewpoint?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_1_Wind_Dir?.[index]
                            ? weather?.data?.GH_1_Wind_Dir?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_1_Wind_MPH?.[index]
                            ? `${weather?.data?.GH_1_Wind_MPH?.[index]} MPH`
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left px-5">
                          {weather?.data?.GH_2_Time?.[index]
                            ? weather?.data?.GH_2_Time?.[index]
                            : "-"}
                        </th>
                        <td className="text-center px-5">
                          {weather?.data?.GH_2_Temp?.[index]
                            ? weather?.data?.GH_2_Temp?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_2_Temp?.[index]
                            ? `${weather?.data?.GH_2_Precip?.[index]}%`
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_2_Humidity?.[index]
                            ? weather?.data?.GH_2_Humidity?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_2_Dewpoint?.[index]
                            ? weather?.data?.GH_2_Dewpoint?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_2_Wind_Dir?.[index]
                            ? weather?.data?.GH_2_Wind_Dir?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_2_Wind_MPH?.[index]
                            ? `${weather?.data?.GH_2_Wind_MPH?.[index]} MPH`
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left px-5">
                          {weather?.data?.GH_3_Time?.[index]
                            ? weather?.data?.GH_3_Time?.[index]
                            : "-"}
                        </th>
                        <td className="text-center px-5">
                          {weather?.data?.GH_3_Temp?.[index]
                            ? weather?.data?.GH_3_Temp?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_3_Temp?.[index]
                            ? `${weather?.data?.GH_3_Precip?.[index]}%`
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_3_Humidity?.[index]
                            ? weather?.data?.GH_3_Humidity?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_3_Dewpoint?.[index]
                            ? weather?.data?.GH_3_Dewpoint?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_3_Wind_Dir?.[index]
                            ? weather?.data?.GH_3_Wind_Dir?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_3_Wind_MPH?.[index]
                            ? `${weather?.data?.GH_3_Wind_MPH?.[index]} MPH`
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left px-5">
                          {weather?.data?.GH_4_Time?.[index]
                            ? weather?.data?.GH_4_Time?.[index]
                            : "-"}
                        </th>
                        <td className="text-center px-5">
                          {weather?.data?.GH_4_Temp?.[index]
                            ? weather?.data?.GH_4_Temp?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_4_Temp?.[index]
                            ? `${weather?.data?.GH_4_Precip?.[index]}%`
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_4_Humidity?.[index]
                            ? weather?.data?.GH_4_Humidity?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_4_Dewpoint?.[index]
                            ? weather?.data?.GH_4_Dewpoint?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_4_Wind_Dir?.[index]
                            ? weather?.data?.GH_4_Wind_Dir?.[index]
                            : "-"}
                        </td>
                        <td className="text-center px-5">
                          {weather?.data?.GH_4_Wind_MPH?.[index]
                            ? `${weather?.data?.GH_4_Wind_MPH?.[index]} MPH`
                            : "-"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
          <h1 className="text-5xl font-bold text-center mb-10 mt-5 underline game-titles">
              Team Info
            </h1>
             {
              statsLoader ?  <div className="flex justify-center">
              <Apploader size={80} />
            </div>
              :
              <Tabs>
              <TabList className="!flex justify-between tab-lists">
                <Tab
                 
                  className="bg-gray border-2 border-black p-3 text-2xl carlos-tab w-[45%] text-center"
                >
                  {weather?.data?.teams_away_team_name?.[index]}
                </Tab>
                <Tab
                  
                  className="bg-gray border-2 border-black p-3 text-2xl carlos-tab w-[45%] text-center"
                >
                  {weather?.data?.teams_home_team_name?.[index]}
                </Tab>
              </TabList>

              <TabPanel>
              <div className="outer-section">
                    <div className="rounded-3xl w-full py-5 mt-10 px-10 bg-[#ca202c] ">
                      <h1 className="text-5xl text-white font-semibold underline game-titles text-center my-3">
                        Bullpen Stats
                      </h1>

                      <div className="grid grid-cols-2 mt-5">
                        <div className="px-5">
                          <h1 className=" text-center italic mb-5 text-white bullpen-title text-5xl">
                            Year To Date
                          </h1>
                          <div className="text-center mt-5">
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              ERA: {statsworkload?.away_stats?.[0]?.L30_ERA}
                            </h3>
                            <h3 className="text-white bullpen-data  text-4xl my-2">
                              WHIP: {statsworkload?.away_stats?.[0]?.L30_WHIP}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              Ks/Game:
                              {statsworkload?.away_stats?.[0]?.L30_K_PerGame}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              Walks/Game:
                              {statsworkload?.away_stats?.[0]?.L30_Walks_PerGame}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              HRs/Game:
                              {statsworkload?.away_stats?.[0]?.L30_HRs_PerGame}
                            </h3>
                          </div>
                        </div>
                        <div className="px-5 border-l-8 border-white">
                          <h1 className="text-center bullpen-title mb-5 italic text-white text-5xl">
                            Last 30 Days
                          </h1>
                          <div className="text-center mt-5">
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              ERA: {statsworkload?.away_stats?.[0]?.YTD_ERA}
                            </h3>
                            <h3 className="text-white bullpen-data  text-4xl my-2">
                              WHIP: {statsworkload?.away_stats?.[0]?.YTD_WHIP}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              Ks/Game:
                              {statsworkload?.away_stats?.[0]?.YTD_K_PerGame}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              Walks/Game:
                              {statsworkload?.away_stats?.[0]?.YTD_Walks_PerGame}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              HRs/Game:
                              {statsworkload?.away_stats?.[0]?.YTD_HRs_PerGame}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl w-full py-5 mt-10 px-10 bg-[#fdcf2b] ">
                      <h1 className="text-5xl text-black font-semibold underline game-titles text-center my-3">
                        Bullpen Workload
                        <span className="mt-5 chance-texts">Last 5 Days</span>
                      </h1>
                      <div className="mt-20 mb-5 p-2 lg:w-[98%] md:max-w-[70vw] m-auto table-outer-section overflow-x-auto">
                    
                        <table className="w-full bg-white">
                          <thead className="table-header">
                            <tr>
                              <th colSpan="6">Pitch Count</th>
                            </tr>
                            <tr className="border-b-2 py-4">
                              {
                                columns1?.length > 0 ?
                                columns1?.map((item)=>{
                                  return(
                                    <th className="text-center px-5">{item?.replace("_"," ")}</th>
                                  )
                                })
                                :""
                              }
                             
                            </tr>
                          </thead>
                          <tbody className="table-body">
                            {
                              segmentData?.length > 0 ?
                              segmentData?.map((item,i)=>{
                                return(
                                  <tr className="border-b-2 py-3">
                                  <td className={`text-center px-5`}>{item?.[`${columns1?.[0]}`]}</td>
                                  <td className={`text-center ${item?.[`${columns1?.[1]}`] == 0 ? "" : "font-semibold"} text-[#6a6969] px-5`}>{item?.[`${columns1?.[1]}`]}</td>
                                  <td className={`text-center ${item?.[`${columns1?.[2]}`] == 0 ? "" : "font-semibold"} px-5`}>{item?.[`${columns1?.[2]}`]}</td>
                                  <td className={`text-center ${item?.[`${columns1?.[3]}`] == 0 ? "" : "font-semibold"} text-[#6a6969] px-5`}>{item?.[`${columns1?.[3]}`]}</td>
                                  <td className={`text-center ${item?.[`${columns1?.[4]}`] == 0 ? "" : "font-semibold"} px-5`}>{item?.[`${columns1?.[4]}`]}</td> 
                                  <td className={`text-center ${item?.[`${columns1?.[5]}`] == 0 ? "" : "font-semibold"} text-[#6a6969] px-5`}>{item?.[`${columns1?.[5]}`]}</td> 
                                 </tr>
                                )
                              }):
                              ""
                            }
                          
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="rounded-3xl w-full py-5 mt-10 px-10 bg-[#0ca75e] team-defense-section">
                      <h1 className="text-5xl font-semibold underline team-defence text-center my-3">
                        Team Defense
                      </h1>
                      {/* <div>
                <h1 className="text-3xl font-bold game-titles text-center  my-10">{weather?.data?.teams_away_team_name?.[index]}</h1>
              </div> */}
                      <div className="grid md:grid-cols-3 desktop-team-defense">
                        <div className="px-5">
                          <h1 className="font-bold text-center mb-5 text-4xl">
                            C
                          </h1>
                          <div className="text-end">
                            <h3 className="font-bold text-3xl">
                              DRS : {team?.away_team_response?.Catcher?.DRS}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              SB : {team?.away_team_response?.Catcher?.SB}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              CS : {team?.away_team_response?.Catcher?.CS}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              SB Win % : {team?.away_team_response?.Catcher?.J}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              Errors :
                              {team?.away_team_response?.Catcher?.Errors}
                            </h3>
                          </div>
                        </div>
                        <div className="px-5 border-r-8 border-l-8 border-black">
                          <h1 className="font-bold text-center mb-5 text-4xl">
                            INF
                          </h1>
                          <div className="text-end">
                            <h3 className="font-bold text-3xl">
                              OAA : {team?.away_team_response?.Infield?.OAA}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              DRS : {team?.away_team_response?.Infield?.DP}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              UZR_150 :
                              {team?.away_team_response?.Infield?.UZR_150}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              Errors :
                              {team?.away_team_response?.Infield?.Errors}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              DPs : {team?.away_team_response?.Infield?.DRS}
                            </h3>
                          </div>
                        </div>
                        <div className="px-5">
                          <h1 className="font-bold text-center mb-5 text-4xl">
                            OF
                          </h1>
                          <div className="text-end">
                            <h3 className="font-bold text-3xl">
                              OAA : {team?.away_team_response?.Outfield?.OAA}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              DRS : {team?.away_team_response?.Outfield?.DRS}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              UZR_150 :
                              {team?.away_team_response?.Outfield?.UZR_150}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              Errors :
                              {team?.away_team_response?.Outfield?.Errors}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 mobile-team-defense">
                        <div className="">
                          <h1 className="font-bold text-center mb-5 text-4xl">
                            C
                          </h1>
                          <div className="text-center">
                            <h3 className="font-medium text-2xl">
                              Defensive Runs Saved:
                              {team?.away_team_response?.Catcher?.DRS}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Stolen Bases :
                              {team?.away_team_response?.Catcher?.SB}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Caught Stealing :
                              {team?.away_team_response?.Catcher?.CS}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Stolen Base Success Rate :
                              {team?.away_team_response?.Catcher?.J}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Errors :
                              {team?.away_team_response?.Catcher?.Errors}
                            </h3>
                          </div>
                        </div>
                        <div className=" border-t-8 border-b-8 my-10 border-black">
                          <h1 className="font-bold text-center mt-10 mb-5 text-4xl">
                            INF
                          </h1>
                          <div className="text-center">
                            <h3 className="font-medium text-2xl">
                              Outs Above Average :
                              {team?.away_team_response?.Infield?.OAA}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Defensive Run Saved :
                              {team?.away_team_response?.Infield?.DP}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Ult.Zone Rate/150 Games :
                              {team?.away_team_response?.Infield?.UZR_150}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Errors :
                              {team?.away_team_response?.Infield?.Errors}
                            </h3>
                            <h3 className="font-medium text-2xl mb-10">
                              Double Plays :
                              {team?.away_team_response?.Infield?.DRS}
                            </h3>
                          </div>
                        </div>
                        <div className="">
                          <h1 className="font-bold text-center mb-5 text-4xl">
                            OF
                          </h1>
                          <div className="text-center">
                            <h3 className="font-medium text-2xl">
                              Outs Above Average :
                              {team?.away_team_response?.Outfield?.OAA}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Defensive Run Saved :
                              {team?.away_team_response?.Outfield?.DRS}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Ult.Zone Rate/150 Games :
                              {team?.away_team_response?.Outfield?.UZR_150}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Errors :
                              {team?.away_team_response?.Outfield?.Errors}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </TabPanel>
              <TabPanel>
              <div className="outer-section">
                    <div className="rounded-3xl w-full py-5 mt-10 px-10 bg-[#ca202c] ">
                      <h1 className="text-5xl text-white font-semibold underline game-titles text-center my-3">
                        Bullpen Stats
                      </h1>

                      <div className="grid grid-cols-2 mt-5">
                        <div className="px-5">
                          <h1 className=" text-center italic mb-5 text-white bullpen-title text-5xl">
                            Year To Date
                          </h1>
                          <div className="text-center mt-5">
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              ERA: {statsworkload?.home_stats?.[0]?.L30_ERA}
                            </h3>
                            <h3 className="text-white bullpen-data  text-4xl my-2">
                              WHIP: {statsworkload?.home_stats?.[0]?.L30_WHIP}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              Ks/Game:
                              {statsworkload?.home_stats?.[0]?.L30_K_PerGame}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              Walks/Game:
                              {statsworkload?.home_stats?.[0]?.L30_Walks_PerGame}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              HRs/Game:
                              {statsworkload?.home_stats?.[0]?.L30_HRs_PerGame}
                            </h3>
                          </div>
                        </div>
                        <div className="px-5 border-l-8 border-white">
                          <h1 className="text-center bullpen-title mb-5 italic text-white text-5xl">
                            Last 30 Days
                          </h1>
                          <div className="text-center mt-5">
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              ERA: {statsworkload?.home_stats?.[0]?.YTD_ERA}
                            </h3>
                            <h3 className="text-white bullpen-data  text-4xl my-2">
                              WHIP: {statsworkload?.home_stats?.[0]?.YTD_WHIP}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              Ks/Game:
                              {statsworkload?.home_stats?.[0]?.YTD_K_PerGame}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              Walks/Game:
                              {statsworkload?.home_stats?.[0]?.YTD_Walks_PerGame}
                            </h3>
                            <h3 className="text-white bullpen-data text-4xl my-2">
                              HRs/Game:
                              {statsworkload?.home_stats?.[0]?.YTD_HRs_PerGame}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl w-full py-5 mt-10 px-10 bg-[#fdcf2b] ">
                      <h1 className="text-5xl text-black font-semibold underline game-titles text-center my-3">
                        Bullpen Workload
                        <span className="mt-5 chance-texts">Last 5 Days</span>
                      </h1>
                      <div className="mt-20 mb-5 p-2 lg:w-[98%] md:max-w-[70vw] m-auto table-outer-section overflow-x-auto">
                    
                        <table className="w-full bg-white">
                          <thead className="table-header">
                            <tr>
                              <th colSpan="6">Pitch Count</th>
                            </tr>
                            <tr className="border-b-2 py-4">
                              {
                                homeheading?.length > 0 ?
                                homeheading?.map((item)=>{
                                  return(
                                    <th className="text-center px-5">{item?.replace("_"," ")}</th>
                                  )
                                })
                                :""
                              }
                             
                            </tr>
                          </thead>
                          <tbody className="table-body">
                            {
                              homeWorkload?.length > 0 ?
                              homeWorkload?.map((item,i)=>{
                                return(
                                  <tr className="border-b-2 py-3">
                                  <td className={`text-center px-5`}>{item?.[`${homeheading?.[0]}`]}</td>
                                  <td className={`text-center ${item?.[`${homeheading?.[1]}`] == "0" ? "" : "font-semibold"} text-[#6a6969] px-5`}>{item?.[`${homeheading?.[1]}`]}</td>
                                  <td className={`text-center ${item?.[`${homeheading?.[2]}`] == "0" ? "" : "font-semibold"} px-5`}>{item?.[`${homeheading?.[2]}`]}</td>
                                  <td className={`text-center ${item?.[`${homeheading?.[3]}`] == "0" ? "" : "font-semibold"} text-[#6a6969] px-5`}>{item?.[`${homeheading?.[3]}`]}</td>
                                  <td className={`text-center ${item?.[`${homeheading?.[4]}`] == "0" ? "" : "font-semibold"} px-5`}>{item?.[`${homeheading?.[4]}`]}</td>                                  
                                  <td className={`text-center ${item?.[`${homeheading?.[5]}`] == "0" ? "" : "font-semibold"} text-[#6a6969] px-5`}>{item?.[`${homeheading?.[5]}`]}</td>                                  
                                 </tr>
                                )
                              }):
                              ""
                            }
                           
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="rounded-3xl w-full py-5 mt-10 px-10 bg-[#0ca75e] team-defense-section">
                      <h1 className="text-5xl font-semibold underline team-defence text-center my-3">
                        Team Defense
                      </h1>
                      {/* <div>
                <h1 className="text-3xl font-bold game-titles text-center  my-10">{weather?.data?.teams_away_team_name?.[index]}</h1>
              </div> */}
                      <div className="grid md:grid-cols-3 mt-5 desktop-team-defense">
                        <div className="px-5">
                          <h1 className="font-bold text-center mb-5 text-4xl">
                            C
                          </h1>
                          <div className="text-end">
                            <h3 className="font-bold text-3xl">
                              DRS : {team?.home_team_response?.Catcher?.DRS}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              SB : {team?.home_team_response?.Catcher?.SB}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              CS : {team?.home_team_response?.Catcher?.CS}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              SB Win % : {team?.home_team_response?.Catcher?.J}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              Errors :
                              {team?.home_team_response?.Catcher?.Errors}
                            </h3>
                          </div>
                        </div>
                        <div className="px-5 border-r-8 border-l-8 border-black">
                          <h1 className="font-bold text-center mb-5 text-4xl">
                            INF
                          </h1>
                          <div className="text-end">
                            <h3 className="font-bold text-3xl">
                              OAA : {team?.home_team_response?.Infield?.OAA}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              DRS : {team?.home_team_response?.Infield?.DP}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              UZR_150 :
                              {team?.home_team_response?.Infield?.UZR_150}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              Errors :
                              {team?.home_team_response?.Infield?.Errors}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              DPs : {team?.home_team_response?.Infield?.DRS}
                            </h3>
                          </div>
                        </div>
                        <div className="px-5">
                          <h1 className="font-bold text-center mb-5 text-4xl">
                            OF
                          </h1>
                          <div className="text-end">
                            <h3 className="font-bold text-3xl">
                              OAA : {team?.home_team_response?.Outfield?.OAA}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              DRS : {team?.home_team_response?.Outfield?.DRS}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              UZR_150 :
                              {team?.home_team_response?.Outfield?.UZR_150}
                            </h3>
                            <h3 className="font-bold text-3xl">
                              Errors :
                              {team?.home_team_response?.Outfield?.Errors}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 mobile-team-defense">
                        <div className="">
                          <h1 className="font-bold text-center mb-5 text-4xl">
                            C
                          </h1>
                          <div className="text-center">
                            <h3 className="font-medium text-2xl">
                              Defensive Runs Saved :
                              {team?.home_team_response?.Catcher?.DRS}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Stolen Bases :
                              {team?.home_team_response?.Catcher?.SB}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Caught Stealing :
                              {team?.home_team_response?.Catcher?.CS}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Stolen Bases Success Rate :
                              {team?.home_team_response?.Catcher?.J}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Errors :
                              {team?.home_team_response?.Catcher?.Errors}
                            </h3>
                          </div>
                        </div>
                        <div className=" border-t-8 border-b-8 my-10 border-black">
                          <h1 className="font-bold text-center mt-10 mb-5 text-4xl">
                            INF
                          </h1>
                          <div className="text-center">
                            <h3 className="font-medium text-2xl">
                              Outs Above Average :
                              {team?.home_team_response?.Infield?.OAA}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Defensive Runs Saved :
                              {team?.home_team_response?.Infield?.DP}
                            </h3>
                            <h3 className="font-medium text-2xl">
                            Ult.Zone Rate/150 Game :
                              {team?.home_team_response?.Infield?.UZR_150}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Errors :
                              {team?.home_team_response?.Infield?.Errors}
                            </h3>
                            <h3 className="font-medium text-2xl mb-10">
                              Double Plays :
                              {team?.home_team_response?.Infield?.DRS} 
                            </h3>
                          </div>
                        </div>
                        <div className="">
                          <h1 className="font-bold text-center mb-5 text-4xl">
                            OF
                          </h1>
                          <div className="text-center">
                            <h3 className="font-medium text-2xl">
                              Outs Above Average :
                              {team?.home_team_response?.Outfield?.OAA}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Defensive Runs Saved :
                              {team?.home_team_response?.Outfield?.DRS}
                            </h3>
                            <h3 className="font-medium text-2xl">
                            Ult.Zone Rate/150 Game :
                              {team?.home_team_response?.Outfield?.UZR_150}
                            </h3>
                            <h3 className="font-medium text-2xl">
                              Errors :
                              {team?.home_team_response?.Outfield?.Errors}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </TabPanel>
            </Tabs>
             }
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
