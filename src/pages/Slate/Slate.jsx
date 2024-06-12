import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getMatchupData, getWeatherData } from "../../api";
import Apploader from "../../component/Apploader";
import DirectionImage from "../../component/DirectionImage";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slate = () => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [weather, setWeather] = useState(true);
  const [tabselect, setTabselect] = useState(0);
  console.log("tabselect", tabselect);
  console.log("🚀 ~ Slate ~ weather:", weather);
  const autoScrollInterval = 5000;

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

  const getmatchup = () => {
    setLoader(true);
    getMatchupData()
      .then((res) => {
        setLoader(false);
        console.log("res", res);
        setData(res);
        // setWeather(res);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  const navigate = useNavigate();

  const getWeather = (timeZone) => {
    setLoader(true);
    getWeatherData({timezone : timeZone})
      .then((res) => {
        setLoader(false);
        console.log("res weather", res);
        setWeather(res);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    // getmatchup();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    getWeather(timeZone);
    console.log("timeZonetimeZone",timeZone);
  }, []);

  const handleDamPage = (i) => {
    const body = [
      {
        stat_type: "pitcher",
        metric_type_input: "Ks",
        player_id: 669373,
        player_name: "Skubal, Tarik",
        opp_team: "AZ",
        home_away: "away",
      },
      {
        stat_type: "pitcher",
        metric_type_input: "Ks",
        player_id: 669373,
        player_name: "Abreu, Albert",
        opp_team: "CHC",
        home_away: "home",
      },
      {
        index: i,
        date_key: weather?.date_key,
        game_pk: weather?.data?.game_pk?.[i],
      },
    ];

    navigate("/game-page", { state: body });
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleNext = () => {
    setTabIndex((prevIndex) => (prevIndex + 1) % 4); // Assuming there are 4 tabs
  };

  const handlePrev = () => {
    if (tabIndex > 0) {
      setTabIndex((prevIndex) => (prevIndex - 1 + 4) % 4); // Assuming there are 4 tabs
    } else {
      setTabIndex(0); // Assuming there are 4 tabs
    }
    // Assuming there are 4 tabs
  };

  if (loader) {
    return (
      <div className="w-full  h-[100vh] flex items-center justify-center">
        <Apploader size={80} />
      </div>
    );
  }

  return (
    <>
      <div className="flex mobile-dam flex-col pt-20 items-center w-[100%] bg-lightblack  px-4 min-w-full">
        <div className="text-center">
          <h2 className="text-white page-title text-4xl font-bold mb-4">
            daily aggregate matchup
          </h2>
        </div>
        <div className="bg-white  m-auto flex flex-col main-section py-10 text-xl min-w-full">
          <div className="text-center">
            <h1 className="font-bold text-5xl">The Slate</h1>
            <h1 className="font-medium text-3xl my-2">{weather?.date_key}</h1>
          </div>

          <div className="my-10 tab-section">
            {/* <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              {weather?.data?.hr?.length > 0 ? (
                weather?.data?.date?.map((item, i) => (
                  <TabPanel key={i}>
                    <div
                      onClick={() => {
                        handleDamPage(i);
                      }}
                      className="cursor-pointer border-4 my-3 px-20 slate-box py-5 rounded-[60px] text-center border-black h-auto"
                    >
                      <div className="my-3">
                        <h1 className="font-extrabold text-4xl upper-text my-2">
                          {weather?.data?.teams_away_team_name?.[i]}
                        </h1>
                      </div>
                      <div className="my-3">
                        <h1 className="font-medium text-4xl my-2">{`@`}</h1>
                      </div>
                      <div className="my-3">
                        <h1 className="font-extrabold text-4xl upper-text my-2">
                          {weather?.data?.teams_home_team_name?.[i]}
                        </h1>
                      </div>
                      <div className="my-3">
                        <h1 className="font-medium upper-text text-4xl my-2">{`Game ${weather?.data.series_game_number[i]} of ${weather?.data.games_in_series[i]} in Series`}</h1>
                      </div>
                      <div className="my-3">
                        <h1 className="font-medium upper-text text-4xl my-2">{`issa ${weather?.data.day_night[i]} game`}</h1>
                      </div>
                      <div className="my-3">
                        <h1 className="font-medium upper-text text-4xl my-2">{`Park: ${weather?.data.venue_name[i]}`}</h1>
                      </div>

                      <div className="grid md:grid-cols-2 bottom-boxes sm:grid-cols-1 gap-12 md:gap-4 sm:gap-4">
                        <div className="">
                          <div>
                            <div className="rounded-[40px] card-sec h-[200px] main-box bg-[#40ecd9] py-2 my-5">
                              <div className="text-left px-10 green-box mb-2">
                                {
                                  weather?.data?.Game_Wind_Direction?.[i] !== "DOMS" ?
                                  <div className="flex">
                                  <div className="flex justify-center first-section items-center w-[20%]">
                                    <h1 className="font-medium game-temp text-center xl:text-3xl 2xl:text-5xl lg:3xl md:3xl 2xl:mt-12 xl:mt-12 lg:mt-5 md:mt-10 sm:mt-5 mb-2">
                                      {weather?.data?.Game_Temp?.[i]
                                        ? `${weather?.data?.Game_Temp?.[i]}°`
                                        : ""}
                                    </h1>
                                  </div>
                                  <div className="w-[60%] medium-sec">
                                    <h1 className="font-medium text-center underline xl:text-3xl 2xl:text-5xl lg:3xl md:3xl  my-2">
                                      Weather
                                    </h1>

                                    <h1 className="font-medium text-center xl:text-3xl 2xl:text-5xl lg:3xl md:3xl  mt-8 mb-2">
                                      {weather?.data?.Game_Temp?.[i]
                                        ? `${weather?.data?.Game_Precip?.[i]}% `
                                        : ""}
                                    </h1>
                                    {weather?.data?.Game_Temp?.[i] ? (
                                      <h1 className="font-medium text-center chance-precip whitespace-nowrap wind-mdh text-2xl md:mt-[-10px]  my-2">
                                        Chance of
                                        <span className="chance-texts">
                                          precip
                                        </span>
                                      </h1>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="text-center first-section w-[20%] mt-6 md:mt-2 direction">
                                    {weather?.data?.Game_Temp?.[i] ? (
                                      <DirectionImage
                                        classname={"matchup"}
                                        windDir={
                                          weather?.data
                                            ?.Game_Wind_Dir_SVG_Rotate?.[i]
                                        }
                                        windDirection={wind_direction}
                                        name={
                                          weather?.data?.Game_Wind_Direction?.[
                                            i
                                          ]
                                        }
                                      />
                                    ) : (
                                      ""
                                    )}
                                    <h1 className="font-medium wind-mdh text-2xl  my-2">
                                      {weather?.data?.Game_Wind_MPH?.[i]
                                        ? `${weather?.data?.Game_Wind_MPH?.[i]}MPH`
                                        : ""}
                                    </h1>
                                  </div>
                                </div>
                                :
                                <>
                                <h1 className="font-medium text-center underline xl:text-3xl 2xl:text-5xl lg:3xl md:3xl  my-2">
                                      Weather
                                    </h1>
                                 <h1 className="font-medium  no-data-text text-center whitespace-nowrap  text-xl mt-10  my-2">
                                    This game is played in a dome
                                  </h1>
                                </>
                                }
                                {weather?.data?.Game_Wind_Direction?.[i] ? (
                                  ""
                                ) : (
                                  <h1 className="font-medium no-data-text text-center whitespace-nowrap  text-xl mt-[10px]  my-2">
                                    No weather data available at this time
                                  </h1>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div className="rounded-[40px] card-sec h-[200px] main-box  bg-[#ac82e5] py-2 my-5">
                              <h1 className="font-medium park-heading xl:text-3xl 2xl:text-5xl lg:3xl md:3xl my-2">
                                Park Factors
                              </h1>
                              <div className="flex justify-evenly  2xl:h-[120px] lg:h-[100px] md:h-[110px] second-box mb-2 items-center">
                                <h1 className="font-medium leading-4 xl:text-4xl 2xl:text-4xl lg:3xl md:3xl my-2">
                                  3yr:
                                  <span className="mt-2 block park_value">
                                    {weather?.data?.[`3yr`][i]}
                                  </span>
                                </h1>
                                <h1 className="font-medium leading-4 xl:text-4xl 2xl:text-4xl lg:3xl md:3xl my-2">
                                  1yr:
                                  <span className="mt-2 block park_value">
                                    {weather?.data?.[`1yr`][i]}
                                  </span>
                                </h1>
                                <h1 className="font-medium leading-4 xl:text-4xl 2xl:text-4xl lg:3xl md:3xl my-2">
                                  HR:
                                  <span className="mt-2 block park_value">
                                    {weather?.data?.hr[i]}
                                  </span>
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                ))
              ) : (
                <div className="flex justify-center items-center">
                  <h1 className="font-medium">No Matchups Currently Found.</h1>
                </div>
              )}

             

              <TabList className="flex flex-wrap mt-3   text-center justify-center">
                
                {weather?.data?.date?.map((item, i) => (
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
                ))}

              </TabList>
            </Tabs> */}
{weather?.data?.hr?.length > 0 ?
            <div className="mx-auto px-4 carousel-tab">
              <Carousel
                showArrows={true}
                showThumbs={false}
                // autoPlay
                interval={autoScrollInterval}
                infiniteLoop
                className="w-full"
              >
                {
                  weather?.data?.date?.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        handleDamPage(i);
                      }}
                      className="cursor-pointer border-4 my-3 px-4 sm:px-6 md:px-8 lg:px-0 xl:px-20 slate-box py-5 rounded-[60px] text-center border-black h-auto mx-auto"
                    >
                      <div className="my-3">
                        <h1 className="font-extrabold text-4xl upper-text  my-2">
                          {weather?.data?.teams_away_team_name?.[i]}
                        </h1>
                      </div>
                      <div className="my-3">
                        <h1 className="font-medium text-4xl my-2">{`@`}</h1>
                      </div>
                      <div className="my-3">
                        <h1 className="font-extrabold text-4xl upper-text my-2">
                          {weather?.data?.teams_home_team_name?.[i]}
                        </h1>
                      </div>
                      <div className="my-3">
                        <h1 className="font-medium upper-text text-4xl my-2">{`Game ${weather?.data.series_game_number[i]} of ${weather?.data.games_in_series[i]} in Series`}</h1>
                      </div>
                      <div className="my-3">
                        <h1 className="font-medium upper-text text-4xl my-2">{`issa ${weather?.data.day_night[i]} game`}</h1>
                      </div>
                      <div className="my-3">
                        <h1 className="font-medium upper-text text-4xl my-2">{`Park: ${weather?.data.venue_name[i]}`}</h1>
                      </div>

                      <div className="grid md:grid-cols-2 bottom-boxes sm:grid-cols-1 gap-12 md:gap-4 sm:gap-4">
                        <div className="">
                          <div>
                            <div className="rounded-[40px] card-sec h-[240px] main-box bg-[#40ecd9] py-2 my-5">
                              <div className="text-left px-4 md:px-10 green-box mb-2">
                              <h1 className="font-medium text-center weather-title underline xl:text-3xl 2xl:text-5xl lg:text-3xl md:text-3xl mb-2">
                                        Weather
                                      </h1>
                                {weather?.data?.Game_Wind_Direction?.[i] !==
                                "DOMS" ? (
                                  <div className="grid grid-cols-3 mt-[22px]">
                                    <div className=" first-section">
                                      <h1 className="font-medium text-center xl:text-3xl 2xl:text-5xl lg:text-3xl md:text-3xl mb-2">
                                        {weather?.data?.Game_Wind_Direction?.[i]
                                          ? `${weather?.data?.Game_Temp?.[i]}°`
                                          : ""}
                                      </h1>
                                      {weather?.data?.Game_Temp?.[i] && (
                                        <h1 className="font-medium text-center chance-precip whitespace-nowrap wind-mdh text-2xl md:mt-[-10px] my-2">
                                          Temp
                                        </h1>
                                      )}
                                    </div>
                                    <div className="medium-sec">
                                      
                                      <h1 className="font-medium text-center xl:text-3xl 2xl:text-5xl lg:text-3xl md:text-3xl mb-2">
                                        {weather?.data?.Game_Wind_Direction?.[i]
                                          ? `${weather?.data?.Game_Precip?.[i]}% `
                                          : ""}
                                      </h1>
                                      {weather?.data?.Game_Temp?.[i] && (
                                        <h1 className="font-medium text-center leading-none chance-precip whitespace-nowrap wind-mdh text-2xl md:mt-[-10px] my-2">
                                          Chance of  
                                          <span className="block"> 
                                             {` precip`}
                                          </span>
                                        </h1>
                                      )}
                                    </div>
                                    <div className="text-center flex first-section justify-center direction">
                                      {weather?.data?.Game_Temp?.[i] && (
                                        <DirectionImage
                                          wind_mph={weather?.data?.Game_Wind_MPH?.[i]}
                                          classname={"matchup"}
                                          windDir={
                                            weather?.data?.Game_Wind_Dir_SVG_Rotate?.[i]
                                          }
                                          name={
                                            weather?.data
                                              ?.Game_Wind_Direction?.[i]
                                          }
                                        />
                                      )}
                                      
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    {/* <h1 className="font-medium text-center underline xl:text-3xl 2xl:text-5xl lg:text-3xl md:text-3xl my-2">
                                      Weather
                                    </h1> */}
                                    <h1 className="font-medium no-data-text text-center text-xl mt-10 my-2">
                                      This game is played in a dome
                                    </h1>
                                  </>
                                )}
                                {!weather?.data?.Game_Wind_Direction?.[i] && (
                                  <h1 className="font-medium no-data-text text-center text-xl mt-[10px] my-2">
                                    No weather data available at this time
                                  </h1>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div className="rounded-[40px] card-sec h-[240px] main-box bg-[#ac82e5] py-2 my-5">
                              <h1 className="font-medium park-heading xl:text-3xl 2xl:text-5xl lg:text-3xl md:text-3xl my-2">
                                Park Factors
                              </h1>
                              <div className="flex justify-evenly 2xl:h-[120px] lg:h-[100px] md:h-[110px] second-box mb-2 items-center">
                                <h1 className="font-medium leading-4 xl:text-4xl 2xl:text-4xl lg:text-3xl md:text-3xl my-2">
                                  3yr:
                                  <span className="mt-2 block park_value">
                                    {weather?.data?.[`3yr`][i]}
                                  </span>
                                </h1>
                                <h1 className="font-medium leading-4 xl:text-4xl 2xl:text-4xl lg:text-3xl md:text-3xl my-2">
                                  1yr:
                                  <span className="mt-2 block park_value">
                                    {weather?.data?.[`1yr`][i]}
                                  </span>
                                </h1>
                                <h1 className="font-medium leading-4 xl:text-4xl 2xl:text-4xl lg:text-3xl md:text-3xl my-2">
                                  HR:
                                  <span className="mt-2 block park_value">
                                    {weather?.data?.hr[i]}
                                  </span>
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  
                }
              </Carousel>
            </div>
            :
            <div className="flex justify-center items-center">
            <h1 className="font-medium">
              No Matchups Currently Found.
            </h1>
          </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slate;
