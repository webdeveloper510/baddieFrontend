import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getDamnEvcal, getSingleMatchup, getWeatherData, getTeamDefense } from "../../api";
import Apploader from "../../component/Apploader";
import DirectionImage from "../../component/DirectionImage";
// import graphImage from "/graph-image.png"

const GamePage = () => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [team, setTeam] = useState(null);
  console.log("🚀 ~ GamePage ~ team:", team)
  const [player, setPlayer] = useState(null);
  const [weather, setWeather] = useState(true);
  const [loader, setLoader] = useState(false);
  console.log("🚀 ~ GamePage ~ data:", data);

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

  const bgColor = [
    {
      name : "Under Edge",
      color : "#22c55e",
    },
    {
      name : "Over Edge",
      color : "#22c55e",
    },
    {
      name : "Under Edge - Potential Outlier",
      color : "#ff7800",
    },
    {
      name : "Over Edge - Potential Outlier",
      color : "#ff7800",
    },
    {
      name : "Fair Value",
      color : "transparent",
    },
    {
      name : "No Edge - No Value",
      color : "#f93e3e",
    },
  ]

  const getWeather = () => {
    // setLoader(true);
    getWeatherData()
      .then((res) => {
        // setLoader(false);
        console.log("res weather data", res);
        setWeather(res);
      })
      .catch((error) => {
        // setLoader(false);
        console.log(error);
      });
  };

  const getAwayData = () => {
    setLoader(true);
    getDamnEvcal({ game_pk: state?.[2].game_pk , date_key: state?.[2]?.date_key})
      .then((res) => {
        setLoader(false);
        console.log("damn evcal data", res);
        setData(res);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  const getTeamdata = () => {
    getTeamDefense({ game_pk: state?.[2].game_pk })
      .then((res) => {
        setTeam(res)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMatchupData = () => {
    // setLoader(true);
    getSingleMatchup({ game_pk: state?.[2].game_pk , date_key: state?.[2]?.date_key})
      .then((res) => {
        // setLoader(false);
        console.log("getSingleMatchup", res);
        setPlayer(res);
      })
      .catch((error) => {
        // setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {    
    getAwayData();
    getMatchupData();
    getWeather();
    getTeamdata()
  }, []);

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
      <td className={`border-b-2 border-b-gray`} style={{background : matchObj?.color}}>
       {value}
    </td>
    )
  }

  return (
    <>
      <div className="flex flex-col pt-16 items-center w-[100%] bg-lightblack  px-4 min-w-full">
        
        <div className="bg-white  m-auto flex flex-col px-20 h-auto main-section py-10 text-xl min-w-full">
          <div className="text-center">
            <h1 className="font-bold text-7xl">Daily aggregate matchup</h1>
          </div>
          <div className="flex mt-16 game-upper-section">
            <div className="w-[60%] game-section">
              <div className="w-full border-4 my-3 px-10  slate-box game-box py-5 rounded-[60px] text-center border-black h-auto">
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
                <div className="my-1">
                  <h1 className="font-medium text-3xl game-text">{`Game ${weather?.data?.series_game_number[index]} of ${weather?.data?.games_in_series[index]} in Series`}</h1>
                </div>
                <div className="my-1">
                  <h1 className="font-medium text-3xl game-text">{`issa ${weather?.data?.day_night[index]} game`}</h1>
                </div>
                <div className="my-1">
                  <h1 className="font-medium text-3xl game-text">{`Park: ${weather?.data?.venue_name[index]}`}</h1>
                </div>

                <div>
                  <div className="rounded-[40px]  bg-[#ac82e5] py-2 my-5">
                    <h1 className="font-medium text-3xl my-2">
                      SC Park Factors
                    </h1>
                    <div className="grid grid-cols-3  mb-2">
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
                  {player?.data?.player_name_away}
                </h1>
                <p className="text-5xl">Vs. </p>
                <h1 className="text-5xl font-bold leading-normal team-text">
                  {player?.data?.player_name_home}
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
              Starting Pitcher Player Props Markets
            </h1>

          <div>
          {
            data?.response1?.odds_hits_over  ?  "" : <p className="text-2xl font-medium text-[#ff0000] text-center mt-5 game-titles">No Props Available At This Time</p>
           }
          </div>

            <div className="mt-10 desktop">
              <table className="w-[100%]">
                <thead className="game-table-head">
                  <tr>
                    <th className="w-20"></th>
                    <th className="w-10 border-b-2 border-black"></th>
                    <th className="w-10 border-b-2 border-black">Under Odds</th>
                    <th className="w-10 border-b-2 border-black">
                      Under EV Calc Estimate
                    </th>
                    <th className="w-10 border-b-2 border-black">Line</th>
                    <th className="w-10 border-b-2 border-black">Over Odds</th>
                    <th className="w-10 border-b-2 border-black">
                      Over EV Calc Estimate
                    </th>
                    <th className="w-20">Call</th>
                  </tr>
                </thead>
                <tbody className="game-table-body">
                  <tr className="text-center">
                    <td className="border-b-2 border-black" rowSpan={3}>
                      {player?.data?.player_name_away}
                    </td>
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Ks
                    </td>
                    <td className="border-2 border-[#b1aeae]">{data?.response1?.["under_odds_Over/Under (Strikeouts)"] ? data?.response1?.["under_odds_Over/Under (Strikeouts)"] : "-"}</td>
                    <td className="border-2 border-[#b1aeae]">
                      {data?.response1?.odds_k_under ? data?.response1?.odds_k_under : "-"}
                    </td>
                    <td className="border-2 border-[#b1aeae]">{data?.response1?.["line_Over/Under (Strikeouts)"] ? data?.response1?.["line_Over/Under (Strikeouts)"] : "-"}</td>
                    <td className="border-2 border-[#b1aeae]">{data?.response1?.["over_odds_Over/Under (Strikeouts)"] ? data?.response1?.["over_odds_Over/Under (Strikeouts)"] : "-"}</td>
                    <td className="border-r-2 border-r-black border-2 border-[#b1aeae]">
                      {data?.response1?.odds_k_over ? data?.response1?.odds_k_over : "-"}
                    </td>
                     { callColor(data?.response3?.k_line_call ? data?.response3?.k_line_call : "-")}
                    {/* <td className="bg-[#ffff00] border-b-2 border-b-[#2bf92b]">
                      {data?.response3?.k_line_call}
                    </td> */}
                  </tr>
                  <tr className="text-center">
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Hits Allowed
                    </td>
                    <td className="border-2 border-[#b1aeae]">{data?.response1?.["under_odds_Over/Under (Hits Allowed)"] ? data?.response1?.["under_odds_Over/Under (Hits Allowed)"] : "-"}</td>
                    <td className="border-2 border-[#b1aeae]">
                      {data?.response1?.odds_hits_under ? data?.response1?.odds_hits_under : "-"}
                    </td>
                    <td className="border-2 border-[#b1aeae]">{data?.response1?.["line_Over/Under (Hits Allowed)"] ? data?.response1?.["line_Over/Under (Hits Allowed)"] : "-"}</td>
                    <td className="border-2 border-[#b1aeae]">{data?.response1?.["over_odds_Over/Under (Hits Allowed)"] ? data?.response1?.["over_odds_Over/Under (Hits Allowed)"] : "-"}</td>
                    <td className="border-r-2">
                      {data?.response1?.odds_hits_over ? data?.response1?.odds_hits_over : "-"}
                    </td>
                    { callColor(data?.response3?.hits_line_call ? data?.response3?.hits_line_call : "-")}
                    {/* <td className="bg-[#66ff66] border-b-2 border-b-[#2bf92b] border-r-2 border-r-[#2bf92b]">
                      {data?.response3?.hits_line_call}
                    </td> */}
                  </tr>
                  {/* <tr className="text-center">
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Outs
                    </td>
                    <td className="border-2 border-[#b1aeae]">-110</td>
                    <td className="border-2 border-[#b1aeae]">
                      {data?.response1?.odds_outs_under  ? data?.response1?.odds_outs_under : "-"}
                    </td>
                    <td className="border-2 border-[#b1aeae]">4.5</td>
                    <td className="border-2 border-[#b1aeae]">-120</td>
                    <td className="border-r-2 border-r-black border-[#b1aeae] border-2">
                      {data?.response1?.odds_outs_over  ? data?.response1?.odds_outs_over : "-"}
                    </td>
                    { callColor(data?.response3?.outs_line_call  ? data?.response3?.outs_line_call : "-")}
                   
                  </tr> */}
                  <tr className="text-center">
                    <td className="border-b-2 border-l-2 border-2 border-r-[#b1aeae] border-t-[#b1aeae] border-black">
                      Earned Runs
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                    {data?.response1?.["under_odds_Over/Under (Earned Runs)"] ? data?.response1?.["under_odds_Over/Under (Earned Runs)"] : "-"}
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                      {data?.response1?.odds_er_under  ? data?.response1?.odds_er_under : "-"}
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                    {data?.response1?.["line_Over/Under (Earned Runs)"] ? data?.response1?.["line_Over/Under (Earned Runs)"] : "-"}
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                    {data?.response1?.["over_odds_Over/Under (Earned Runs)"] ? data?.response1?.["over_odds_Over/Under (Earned Runs)"] : "-"}
                    </td>
                    <td className="border-b-2 border-r-2 border-t-[#b1aeae] border-t-2 border-black">
                      {data?.response1?.odds_er_over   ? data?.response1?.odds_er_over : "-"}
                    </td>
                    { callColor(data?.response3?.er_line_call   ? data?.response3?.er_line_call : "-")}
                    {/* <td className="bg-[#f7c7ac]">
                      {data?.response3?.er_line_call}
                    </td> */}
                  </tr>
                  <tr className="text-center">
                    <td className="" rowSpan={3}>
                      {player?.data?.player_name_home}
                    </td>
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Ks
                    </td>
                    <td className="border-2 border-[#b1aeae]">{data?.response4?.["under_odds_Over/Under (Strikeouts)"] ? data?.response4?.["under_odds_Over/Under (Strikeouts)"] : "-"}</td>
                    <td className="border-2 border-[#b1aeae]">
                      {data?.response4?.odds_k_under   ? data?.response4?.odds_k_under : "-"}
                    </td>
                    <td className="border-2 border-[#b1aeae]">{data?.response4?.["line_Over/Under (Strikeouts)"] ? data?.response4?.["line_Over/Under (Strikeouts)"] : "-"}</td>
                    <td className="border-2 border-[#b1aeae]">{data?.response4?.["over_odds_Over/Under (Strikeouts)"] ? data?.response4?.["over_odds_Over/Under (Strikeouts)"] : "-"}</td>
                    <td className="border-r-2 border-r-black border-2 border-[#b1aeae]">
                      {data?.response4?.odds_k_over    ? data?.response4?.odds_k_over : "-"}
                    </td>
                    { callColor(data?.reponse6?.k_line_call    ? data?.reponse6?.k_line_call : "-")}
                    {/* <td className="bg-[#ffff00] border-b-2 border-b-[#2bf92b]">
                      {data?.reponse6?.k_line_call}
                    </td> */}
                  </tr>
                  <tr className="text-center">
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Hits Allowed
                    </td>
                    <td className="border-2 border-[#b1aeae]">{data?.response4?.["under_odds_Over/Under (Hits Allowed)"] ? data?.response4?.["under_odds_Over/Under (Hits Allowed)"] : "-"}</td>
                    <td className="border-2 border-[#b1aeae]">
                      {data?.response4?.odds_hits_under    ? data?.response4?.odds_hits_under : "-"}
                    </td>
                    <td className="border-2 border-[#b1aeae]">{data?.response4?.["line_Over/Under (Hits Allowed)"] ? data?.response4?.["line_Over/Under (Hits Allowed)"] : "-"}</td>
                    <td className="border-2 border-[#b1aeae]">{data?.response4?.["over_odds_Over/Under (Hits Allowed)"] ? data?.response4?.["over_odds_Over/Under (Hits Allowed)"] : "-"}</td>
                    <td className="border-r-2">
                      {data?.response4?.odds_hits_over     ? data?.response4?.odds_hits_over : "-"}
                    </td>
                    { callColor(data?.reponse6?.hits_line_call      ? data?.reponse6?.hits_line_call : "-")}
                    {/* <td className="bg-[#66ff66] border-b-2 border-b-[#2bf92b] border-r-2 border-r-[#2bf92b]">
                      {data?.reponse6?.hits_line_call}
                    </td> */}
                  </tr>
                  {/* <tr className="text-center">
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Outs
                    </td>
                    <td className="border-2 border-[#b1aeae]">-110</td>
                    <td className="border-2 border-[#b1aeae]">
                      {data?.response4?.odds_outs_under     ? data?.response4?.odds_outs_under : "-"}
                    </td>
                    <td className="border-2 border-[#b1aeae]">4.5</td>
                    <td className="border-2 border-[#b1aeae]">-120</td>
                    <td className="border-r-2 border-r-black border-[#b1aeae] border-2">
                      {data?.response4?.odds_outs_over       ? data?.response4?.odds_outs_over : "-"}
                    </td>
                    { callColor(data?.reponse6?.outs_line_call      ? data?.reponse6?.outs_line_call : "-")}
                   
                  </tr> */}
                  <tr className="text-center">
                    <td className="border-b-2 border-l-2 border-2 border-r-[#b1aeae] border-t-[#b1aeae] border-black">
                      Earned Runs
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                    {data?.response4?.["under_odds_Over/Under (Earned Runs)"] ? data?.response4?.["under_odds_Over/Under (Earned Runs)"] : "-"}
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                      {data?.response4?.odds_er_under ? data?.response4?.odds_er_under : "-"}
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                    {data?.response4?.["line_Over/Under (Earned Runs)"] ? data?.response4?.["line_Over/Under (Earned Runs)"] : "-"}
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                    {data?.response4?.["over_odds_Over/Under (Earned Runs)"] ? data?.response4?.["over_odds_Over/Under (Earned Runs)"] : "-"}
                    </td>
                    <td className="border-b-2 border-r-2 border-t-[#b1aeae] border-t-2 border-black">
                      {data?.response4?.odds_er_over ? data?.response4?.odds_er_over : "-"}
                    </td>
                    { callColor(data?.reponse6?.er_line_call  ? data?.reponse6?.er_line_call : "-")}
                    {/* <td className="bg-[#ffff00]">
                      {data?.reponse6?.er_line_call}
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10 mobile">
              <h1 className="text-xl font-bold text-center">{player?.data?.player_name_away}</h1>
              <table className="w-[100%] mt-5">
                <thead className="mobile-head">
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none"></th>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-b-2 border-b-black ">
                      Ks
                    </th>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-b-2 border-b-black ">
                      Hits Allowed
                    </th>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-b-2 border-b-black">
                      Outs
                    </th>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-b-2 border-b-black">
                      Earned Runs
                    </th>
                  </tr>
                </thead>

                <tbody className="mobile-body">
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">
                      Under Odds
                    </th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">
                      -110
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">
                      Under EV calc Estimate
                    </th>
                    <td className="border-2 border-[#c1bfbf]">
                      {data?.response1?.odds_k_under  ? data?.response1?.odds_k_under : "-"}
                    </td>
                    <td className="border-2 border-[#c1bfbf]">
                      {data?.response1?.odds_hits_under  ? data?.response1?.odds_hits_under : "-"}
                    </td>
                    <td className="border-2 border-[#c1bfbf]">
                      {data?.response1?.odds_outs_under   ? data?.response1?.odds_outs_under : "-"}
                    </td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">
                      {data?.response1?.odds_er_under   ? data?.response1?.odds_er_under : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">
                      Line
                    </th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">
                      -110
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">
                      Ever Odds
                    </th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">
                      -110
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">
                      Over EV calc Estimate
                    </th>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">
                      {data?.response1?.odds_k_over   ? data?.response1?.odds_k_over : "-"}
                    </td>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">
                      {data?.response1?.odds_hits_over ? data?.response1?.odds_hits_over : "-"}
                    </td>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">
                      {data?.response1?.odds_outs_over  ? data?.response1?.odds_outs_over : "-"}
                    </td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black border-b-2 border-b-black">
                     {data?.response1?.odds_er_over   ? data?.response1?.odds_er_over : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none ">
                      Call
                    </th>
                    <td className="bg-[#ffff00] border-b-2 border-b-[#2bf92b]">
                      {data?.response3?.k_line_call ? data?.response3?.k_line_call : "-"}
                    </td>
                    <td className="bg-[#66ff66] border-2 border-[#2bf92b]">
                      {data?.response3?.hits_line_call  ? data?.response3?.hits_line_call : "-"}
                    </td>
                    <td className="bg-[#66ff66] border-2 border-[#2bf92b]">
                      {data?.response3?.outs_line_call   ? data?.response3?.outs_line_call : "-"}
                    </td>
                    <td className="bg-[#f7c7ac] ">
                      {data?.response3?.er_line_call  ? data?.response3?.er_line_call : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10 mobile">
              <h1 className="text-xl font-bold text-center">
                {player?.data?.player_name_home}
              </h1>
              <table className="w-[100%] mt-5">
                <thead className="mobile-head">
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none"></th>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-b-2 border-b-black ">
                      Ks
                    </th>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-b-2 border-b-black ">
                      Hits Allowed
                    </th>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-b-2 border-b-black">
                      Outs
                    </th>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-b-2 border-b-black">
                      Earned Runs
                    </th>
                  </tr>
                </thead>

                <tbody className="mobile-body">
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">
                      Under Odds
                    </th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">
                      -110
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">
                      Under EV calc Estimate
                    </th>
                    <td className="border-2 border-[#c1bfbf]">{data?.response4?.odds_k_under ? data?.response4?.odds_k_under : "-"}</td>
                    <td className="border-2 border-[#c1bfbf]">{data?.response4?.odds_hits_under  ? data?.response4?.odds_hits_under : "-"}</td>
                    <td className="border-2 border-[#c1bfbf]">{data?.response4?.odds_outs_under   ? data?.response4?.odds_outs_under : "-"}</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">
                    {data?.response4?.odds_er_under  ? data?.response4?.odds_er_under : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">
                      Line
                    </th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">
                      -110
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">
                      Ever Odds
                    </th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">
                      -110
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">
                      Over EV calc Estimate
                    </th>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">
                    {data?.response4?.odds_k_under  ? data?.response4?.odds_k_under : "-"}
                    </td>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">
                    {data?.response4?.odds_hits_under   ? data?.response4?.odds_hits_under : "-"}
                    </td>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">
                    {data?.response4?.odds_outs_under ? data?.response4?.odds_outs_under : "-"}
                    </td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black border-b-2 border-b-black">
                    {data?.response4?.odds_er_under  ? data?.response4?.odds_er_under : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none ">
                      Call
                    </th>
                    <td className="bg-[#ffff00] border-b-2 border-b-[#2bf92b]">
                    {data?.response3?.k_line_call   ? data?.response3?.k_line_call : "-"}
                    </td>
                    <td className="bg-[#66ff66] border-2 border-[#2bf92b]">
                    {data?.response3?.hits_line_call   ? data?.response3?.hits_line_call : "-"}
                    </td>
                    <td className="bg-[#66ff66] border-2 border-[#2bf92b]">
                    {data?.response3?.outs_line_call  ? data?.response3?.outs_line_call : "-"}
                    </td>
                    <td className="bg-[#ffff00]">{data?.response3?.er_line_call  ? data?.response3?.er_line_call : "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* <div className="mt-20">
            <Tabs>
              <TabList className="!flex justify-between tab-lists">
                <Tab className="bg-gray border-2 border-black p-3 text-2xl carlos-tab w-[45%] text-center">
                  Carlos Carrasco
                </Tab>
                <Tab className="bg-gray border-2 border-black p-3 text-2xl carlos-tab w-[45%] text-center">
                  {player?.data?.player_name_home} 
                </Tab>
              </TabList>

              <div className="flex justify-between mt-10">
                <div className="bg-gray border-2 border-black p-3 text-2xl carlos-tab mobile-tab w-[15%] text-center">
                  Ks
                </div>
                <div className="bg-gray border-2 border-black p-3 text-2xl carlos-tab mobile-tab w-[15%] text-center">
                  Outs
                </div>
                <div className="bg-gray border-2 border-black p-3 text-2xl carlos-tab mobile-tab w-[15%] text-center">
                  Hits
                </div>
                <div className="bg-gray border-2 border-black p-3 text-2xl carlos-tab mobile-tab w-[15%] text-center">
                  ERs
                </div>
              </div>

              <TabPanel>
                <div className="mt-10">
                  <h1 className="text-center font-bold text-3xl my-2">
                    At The Plate
                  </h1>
                  <div className="border-black h-auto border-2 w-full">
                    <h1 className="text-center font-bold text-3xl my-2">
                      strikeout stuff
                    </h1>

                    <div className="grid md:grid-cols-2 sm:grid-cols-1">
                      <img src="/graph-image.png" alt="graph" />
                      <img src="/graph-image.png" alt="graph" />
                      <img src="/graph-image.png" alt="graph" />
                      <img src="/graph-image.png" alt="graph" />
                    </div>
                    <h1 className="text-center font-bold text-3xl my-4">
                      Command
                    </h1>
                    <div className="grid md:grid-cols-2 sm:grid-cols-1">
                      <img src="/graph-image.png" alt="graph" />
                      <img src="/graph-image.png" alt="graph" />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="mt-10">
                  <h1 className="text-center font-bold text-3xl my-2">
                    At The Plate
                  </h1>
                  <div className="border-black h-auto border-2 w-full">
                    <h1 className="text-center font-bold text-3xl my-2">
                      strikeout stuff
                    </h1>

                    <div className="grid md:grid-cols-2 sm:grid-cols-1">
                      <img src="/graph-image.png" alt="graph" />
                      <img src="/graph-image.png" alt="graph" />
                      <img src="/graph-image.png" alt="graph" />
                      <img src="/graph-image.png" alt="graph" />
                    </div>
                    <h1 className="text-center font-bold text-3xl my-4">
                      Command
                    </h1>
                    <div className="grid md:grid-cols-2 sm:grid-cols-1">
                      <img src="/graph-image.png" alt="graph" />
                      <img src="/graph-image.png" alt="graph" />
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div> */}

          <div className="mt-20">
            <div>
              <div className="rounded-[50px]  px-20 bg-[#40ecd9] py-5 my-5">
                
                <div className="text-left px-5 mb-2">
                  <div className="grid grid-cols-3 ">
                    <div className="flex justify-center items-center">
                      <h1 className="font-medium text-5xl mt-20 my-2">
                        {`${weather?.data?.Game_Temp?.[index]}°`}
                      </h1>
                     
                    </div>
                    <div className="text-center">
                    <h1 className="font-medium text-center text-5xl underline mb-10">
                    Weather
                </h1>
                    <h1 className="font-medium text-4xl mt-4 my-2">
                        {`${weather?.data?.Game_Precip?.[index]}% `}
                      </h1>
                      <h1 className="font-medium text-4xl my-2">
                        Chance of precip
                      </h1>
                    </div>
                    <div className="text-center mt-4">
                    <DirectionImage
                        windDirection={wind_direction}
                        name={weather?.data?.Game_Wind_Direction?.[index]}
                      />
                      <h1 className="font-medium text-center text-4xl my-2">
                        {`${weather?.data?.Game_Wind_MPH?.[index]}MPH`}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="border-2 mt-20 mb-5 p-2 w-[100%] border-white bg-[#00ffff] overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left px-5"></th>
                        <th className="text-left px-5">Temp (F)</th>
                        <th className="text-left px-5">Chance of Precip</th>
                        <th className="text-left px-5">Humidity</th>
                        <th className="text-left px-5">Dewpoint</th>
                        <th colSpan="2" className="text-center px-5">
                          Wind
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="text-left px-5">GH_N2_Time</th>
                        <td className="text-center px-5">{weather?.data?.GH_N2_Temp[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_N2_Precip[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_N2_Humidity[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_N2_Dewpoint[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_N2_Wind_Dir[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_N2_Wind_MPH[index]} MPH</td>
                      </tr>
                      <tr>
                        <th className="text-left px-5">GH_N1_Time</th>
                        <td className="text-center px-5">{weather?.data?.GH_N1_Temp[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_N1_Precip[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_N1_Humidity[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_N1_Dewpoint[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_N1_Wind_Dir[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_N1_Wind_MPH[index]} MPH</td>
                      </tr>
                      <tr>
                        <th className="text-left px-5">GH_1_Time</th>
                        <td className="text-center px-5">{weather?.data?.GH_1_Temp[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_1_Precip[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_1_Humidity[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_1_Dewpoint[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_1_Wind_Dir[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_1_Wind_MPH[index]} MPH</td>
                      </tr>
                      <tr>
                        <th className="text-left px-5">GH_2_Time</th>
                        <td className="text-center px-5">{weather?.data?.GH_2_Temp[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_2_Precip[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_2_Humidity[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_2_Dewpoint[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_2_Wind_Dir[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_2_Wind_MPH[index]} MPH</td>
                      </tr>
                      <tr>
                        <th className="text-left px-5">GH_3_Time</th>
                        <td className="text-center px-5">{weather?.data?.GH_3_Temp[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_3_Precip[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_3_Humidity[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_3_Dewpoint[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_3_Wind_Dir[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_3_Wind_MPH[index]} MPH</td>
                      </tr>
                      <tr>
                        <th className="text-left px-5">GH_4_Time</th>
                        <td className="text-center px-5">{weather?.data?.GH_4_Temp[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_4_Precip[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_4_Humidity[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_4_Dewpoint[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_4_Wind_Dir[index]}</td>
                        <td className="text-center px-5">{weather?.data?.GH_4_Wind_MPH[index]} MPH</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
          <Tabs>
          <TabList className="!flex justify-between tab-lists">
            <Tab className="bg-gray border-2 border-black p-3 text-2xl carlos-tab w-[45%] text-center">
            {weather?.data?.teams_away_team_name?.[index]}
            </Tab>
            <Tab className="bg-gray border-2 border-black p-3 text-2xl carlos-tab w-[45%] text-center">
            {weather?.data?.teams_home_team_name?.[index]}
            </Tab>
          </TabList>

          <TabPanel>
          <div className="rounded-3xl w-full py-5 mt-10 px-10 bg-[#0ca75e] ">
            <h1 className="text-5xl font-bold game-titles text-center my-3">
              Team Defense
            </h1>
              {/* <div>
                <h1 className="text-3xl font-bold game-titles text-center  my-10">{weather?.data?.teams_away_team_name?.[index]}</h1>
              </div> */}
             <div className="grid md:grid-cols-3">
             <div className="px-5">
             <h1 className="font-bold text-center mb-5 text-4xl">C</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">DRS : {team?.away_team_response?.Catcher?.DRS}</h3>
                  <h3 className="font-bold text-3xl">SB : {team?.away_team_response?.Catcher?.SB}</h3>
                  <h3 className="font-bold text-3xl">CS : {team?.away_team_response?.Catcher?.CS}</h3>
                  <h3 className="font-bold text-3xl">SB Win % : {team?.away_team_response?.Catcher?.J}</h3>
                  <h3 className="font-bold text-3xl">Errors : {team?.away_team_response?.Catcher?.Errors}</h3>
                
                </div>
              </div>
              <div className="px-5 border-r-8 border-l-8 border-black">
              <h1 className="font-bold text-center mb-5 text-4xl">INF</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">OAA : {team?.away_team_response?.Infield?.OAA}</h3>
                  <h3 className="font-bold text-3xl">DRS : {team?.away_team_response?.Infield?.DP}</h3>
                  <h3 className="font-bold text-3xl">UZR_150 : {team?.away_team_response?.Infield?.UZR_150}</h3>
                  <h3 className="font-bold text-3xl">Errors : {team?.away_team_response?.Infield?.Errors}</h3>
                  <h3 className="font-bold text-3xl">DPs : {team?.away_team_response?.Infield?.DRS}</h3>               
                </div>
              </div>
              <div className="px-5">
              <h1 className="font-bold text-center mb-5 text-4xl">OF</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">OAA : {team?.away_team_response?.Outfield?.OAA}</h3>
                  <h3 className="font-bold text-3xl">DRS : {team?.away_team_response?.Outfield?.DRS}</h3>
                  <h3 className="font-bold text-3xl">UZR_150 : {team?.away_team_response?.Outfield?.UZR_150}</h3>
                  <h3 className="font-bold text-3xl">Errors : {team?.away_team_response?.Outfield?.Errors}</h3>
                </div>
              </div>
             </div>
            </div>
          </TabPanel>
          <TabPanel>
          <div className="rounded-3xl w-full py-5 mt-10 px-10 bg-[#0ca75e] ">
            <h1 className="text-5xl font-bold game-titles text-center my-3">
              Team Defense
            </h1>
             {/* <div>
                <h1 className="text-3xl font-bold game-titles text-center  my-10">{weather?.team?.teams_home_team_name?.[index]}</h1>
              </div> */}
             <div className="grid md:grid-cols-3">
             <div className="px-5">
             <h1 className="font-bold text-center mb-5 text-4xl">C</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">DRS : {team?.home_team_response?.Catcher?.DRS}</h3>
                  <h3 className="font-bold text-3xl">SB : {team?.home_team_response?.Catcher?.SB}</h3>
                  <h3 className="font-bold text-3xl">CS : {team?.home_team_response?.Catcher?.CS}</h3>
                  <h3 className="font-bold text-3xl">SB Win % : {team?.home_team_response?.Catcher?.J}</h3>
                  <h3 className="font-bold text-3xl">Errors : {team?.home_team_response?.Catcher?.Errors}</h3>
                
                </div>
              </div>
              <div className="px-5 border-r-8 border-l-8 border-black">
              <h1 className="font-bold text-center mb-5 text-4xl">INF</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">OAA : {team?.home_team_response?.Infield?.OAA}</h3>
                  <h3 className="font-bold text-3xl">DRS : {team?.home_team_response?.Infield?.DP}</h3>
                  <h3 className="font-bold text-3xl">UZR_150 : {team?.home_team_response?.Infield?.UZR_150}</h3>
                  <h3 className="font-bold text-3xl">Errors : {team?.home_team_response?.Infield?.Errors}</h3>
                  <h3 className="font-bold text-3xl">DPs : {team?.home_team_response?.Infield?.DRS}</h3>               
                </div>
              </div>
              <div className="px-5">
              <h1 className="font-bold text-center mb-5 text-4xl">OF</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">OAA : {team?.home_team_response?.Outfield?.OAA}</h3>
                  <h3 className="font-bold text-3xl">DRS : {team?.home_team_response?.Outfield?.DRS}</h3>
                  <h3 className="font-bold text-3xl">UZR_150 : {team?.home_team_response?.Outfield?.UZR_150}</h3>
                  <h3 className="font-bold text-3xl">Errors : {team?.home_team_response?.Outfield?.Errors}</h3>
                </div>
              </div>
             </div>
            </div>
          
          </TabPanel>
        </Tabs>

            {/* <div className="rounded-3xl w-full py-5 mt-10 px-10 bg-[#0ca75e] ">
            <h1 className="text-5xl font-bold game-titles text-center my-3">
              Team Defense
            </h1>
              <div>
                <h1 className="text-3xl font-bold game-titles text-center  my-10">{weather?.data?.teams_away_team_name?.[index]}</h1>
              </div>
             <div className="grid md:grid-cols-3">
             <div className="px-5">
             <h1 className="font-bold text-center mb-5 text-4xl">C</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">DRS : {data?.away_response_dict?.Catcher?.DRS}</h3>
                  <h3 className="font-bold text-3xl">SB : {data?.away_response_dict?.Catcher?.SB}</h3>
                  <h3 className="font-bold text-3xl">CS : {data?.away_response_dict?.Catcher?.CS}</h3>
                  <h3 className="font-bold text-3xl">SB Win % : {data?.away_response_dict?.Catcher?.J}</h3>
                  <h3 className="font-bold text-3xl">Errors : {data?.away_response_dict?.Catcher?.Errors}</h3>
                
                </div>
              </div>
              <div className="px-5 border-r-8 border-l-8 border-black">
              <h1 className="font-bold text-center mb-5 text-4xl">INF</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">OAA : {data?.away_response_dict?.Infield?.OAA}</h3>
                  <h3 className="font-bold text-3xl">DRS : {data?.away_response_dict?.Infield?.DP}</h3>
                  <h3 className="font-bold text-3xl">UZR_150 : {data?.away_response_dict?.Infield?.UZR_150}</h3>
                  <h3 className="font-bold text-3xl">Errors : {data?.away_response_dict?.Infield?.Errors}</h3>
                  <h3 className="font-bold text-3xl">DPs : {data?.away_response_dict?.Infield?.DRS}</h3>               
                </div>
              </div>
              <div className="px-5">
              <h1 className="font-bold text-center mb-5 text-4xl">OF</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">OAA : {data?.away_response_dict?.Outfield?.OAA}</h3>
                  <h3 className="font-bold text-3xl">DRS : {data?.away_response_dict?.Outfield?.DRS}</h3>
                  <h3 className="font-bold text-3xl">UZR_150 : {data?.away_response_dict?.Outfield?.UZR_150}</h3>
                  <h3 className="font-bold text-3xl">Errors : {data?.away_response_dict?.Outfield?.Errors}</h3>
                </div>
              </div>
             </div>

             <div>
                <h1 className="text-3xl font-bold game-titles text-center  my-10">{weather?.data?.teams_home_team_name?.[index]}</h1>
              </div>
             <div className="grid md:grid-cols-3">
             <div className="px-5">
             <h1 className="font-bold text-center mb-5 text-4xl">C</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">DRS : {data?.home_response_dict?.Catcher?.DRS}</h3>
                  <h3 className="font-bold text-3xl">SB : {data?.home_response_dict?.Catcher?.SB}</h3>
                  <h3 className="font-bold text-3xl">CS : {data?.home_response_dict?.Catcher?.CS}</h3>
                  <h3 className="font-bold text-3xl">SB Win % : {data?.home_response_dict?.Catcher?.J}</h3>
                  <h3 className="font-bold text-3xl">Errors : {data?.home_response_dict?.Catcher?.Errors}</h3>
                
                </div>
              </div>
              <div className="px-5 border-r-8 border-l-8 border-black">
              <h1 className="font-bold text-center mb-5 text-4xl">INF</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">OAA : {data?.home_response_dict?.Infield?.OAA}</h3>
                  <h3 className="font-bold text-3xl">DRS : {data?.home_response_dict?.Infield?.DP}</h3>
                  <h3 className="font-bold text-3xl">UZR_150 : {data?.home_response_dict?.Infield?.UZR_150}</h3>
                  <h3 className="font-bold text-3xl">Errors : {data?.home_response_dict?.Infield?.Errors}</h3>
                  <h3 className="font-bold text-3xl">DPs : {data?.home_response_dict?.Infield?.DRS}</h3>               
                </div>
              </div>
              <div className="px-5">
              <h1 className="font-bold text-center mb-5 text-4xl">OF</h1>
                <div className="text-end">
                  <h3 className="font-bold text-3xl">OAA : {data?.home_response_dict?.Outfield?.OAA}</h3>
                  <h3 className="font-bold text-3xl">DRS : {data?.home_response_dict?.Outfield?.DRS}</h3>
                  <h3 className="font-bold text-3xl">UZR_150 : {data?.home_response_dict?.Outfield?.UZR_150}</h3>
                  <h3 className="font-bold text-3xl">Errors : {data?.home_response_dict?.Outfield?.Errors}</h3>
                </div>
              </div>
             </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
