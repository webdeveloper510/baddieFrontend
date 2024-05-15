import React from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import graphImage from "/graph-image.png"

const GamePage = () => {
  return (
    <>
      <div className="flex flex-col items-center w-[100%] bg-lightblack  px-4 min-w-full">
        <div className="text-center">
          <h2 className="text-white page-title text-4xl font-bold mb-4">
            daily matchup aggregate
          </h2>
        </div>
        <div className="bg-white  m-auto flex flex-col px-20 h-auto main-section py-10 text-xl min-w-full">
          <div className="text-center">
            <h1 className="font-bold text-7xl">The Matchup</h1>
          </div>
          <div className="flex mt-16 game-upper-section">
            <div className="w-[60%] game-section">
              <div className="w-full border-4 my-3 px-20  slate-box game-box py-5 rounded-[60px] text-center border-black h-auto">
                <div className="my-1">
                  <h1 className="font-extrabold text-3xl game-text">{`cleveland Guardians`}</h1>
                </div>
                <div className="my-1">
                  <h1 className="font-medium text-3xl game-text">{`@`}</h1>
                </div>
                <div className="my-1">
                  <h1 className="font-extrabold text-3xl game-text">{`Houston Astros`}</h1>
                </div>
                <div className="my-1">
                  <h1 className="font-medium text-3xl game-text">{`Game 1 of 3 in Series`}</h1>
                </div>
                <div className="my-1">
                  <h1 className="font-medium text-3xl game-text">{`issa night game`}</h1>
                </div>
                <div className="my-1">
                  <h1 className="font-medium text-3xl game-text">{`Park: minute maid park`}</h1>
                </div>

                <Link to="/game-page">
                  <div className="rounded-[40px] bg-[#0d9957] py-2 my-5">
                    <h1 className="font-medium text-3xl game-text my-2">
                      Fangraphs Park Factors
                    </h1>
                    <div className="grid grid-cols-3 mb-2">
                      <h1 className="font-medium text-3xl game-text my-2">
                        3yr: {`99`}
                      </h1>
                      <h1 className="font-medium text-3xl game-text my-2">
                        1yr: {`98`}
                      </h1>
                      <h1 className="font-medium text-3xl game-text my-2">
                        HR: {`100`}
                      </h1>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="w-[40%] game-section flex justify-center items-center">
              <div className="text-center desktop">
                <h1 className="text-5xl font-bold leading-normal team-text">
                  Carlos Carrasco <br /> {`(ClE)`}
                </h1>
                <p className="text-5xl">Vs. </p>
                <h1 className="text-5xl font-bold leading-normal team-text">
                  Hunter Brown <br /> (HOU)
                </h1>
              </div>
              <div className="text-center mobile mt-5">
                <h1 className="font-bold leading-normal text-2xl flex-nowrap">
                  Carlos Carrasco {`(ClE)`}{" "}
                  <span className="font-normal"> Vs. </span> Hunter Brown (HOU)
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h1 className="text-5xl font-bold text-center underline game-titles">
              Starting Pitcher Player Props Markets
            </h1>

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
                    <td className="border-b-2 border-black" rowSpan={4}>
                      Carlos Carrasco
                    </td>
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Ks
                    </td>
                    <td className="border-2 border-[#b1aeae]">-110</td>
                    <td className="border-2 border-[#b1aeae]">-107</td>
                    <td className="border-2 border-[#b1aeae]">4.5</td>
                    <td className="border-2 border-[#b1aeae]">-120</td>
                    <td className="border-r-2 border-r-black border-2 border-[#b1aeae]">
                      -130
                    </td>
                    <td className="bg-[#ffff00] border-b-2 border-b-[#2bf92b]">
                      Fair Value
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Hits Allowed
                    </td>
                    <td className="border-2 border-[#b1aeae]">-110</td>
                    <td className="border-2 border-[#b1aeae]">-107</td>
                    <td className="border-2 border-[#b1aeae]">4.5</td>
                    <td className="border-2 border-[#b1aeae]">-120</td>
                    <td className="border-r-2">-130</td>
                    <td className="bg-[#66ff66] border-b-2 border-b-[#2bf92b] border-r-2 border-r-[#2bf92b]">
                      Fair Value
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Outs
                    </td>
                    <td className="border-2 border-[#b1aeae]">-110</td>
                    <td className="border-2 border-[#b1aeae]">-107</td>
                    <td className="border-2 border-[#b1aeae]">4.5</td>
                    <td className="border-2 border-[#b1aeae]">-120</td>
                    <td className="border-r-2 border-r-black border-[#b1aeae] border-2">
                      -130
                    </td>
                    <td className="bg-[#66ff66] border-b-2 border-b-[#2bf92b] border-r-2 border-r-[#2bf92b]">
                      Fair Value
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-b-2 border-l-2 border-2 border-r-[#b1aeae] border-t-[#b1aeae] border-black">
                      Earned Runs
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                      -110
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                      -107
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                      4.5
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                      -120
                    </td>
                    <td className="border-b-2 border-r-2 border-t-[#b1aeae] border-t-2 border-black">
                      -130
                    </td>
                    <td className="bg-[#f7c7ac]">Fair Value</td>
                  </tr>
                  <tr className="text-center">
                    <td className="" rowSpan={4}>
                      Hunter Brown
                    </td>
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Ks
                    </td>
                    <td className="border-2 border-[#b1aeae]">-110</td>
                    <td className="border-2 border-[#b1aeae]">-107</td>
                    <td className="border-2 border-[#b1aeae]">4.5</td>
                    <td className="border-2 border-[#b1aeae]">-120</td>
                    <td className="border-r-2 border-r-black border-2 border-[#b1aeae]">
                      -130
                    </td>
                    <td className="bg-[#ffff00] border-b-2 border-b-[#2bf92b]">
                      Fair Value
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Hits Allowed
                    </td>
                    <td className="border-2 border-[#b1aeae]">-110</td>
                    <td className="border-2 border-[#b1aeae]">-107</td>
                    <td className="border-2 border-[#b1aeae]">4.5</td>
                    <td className="border-2 border-[#b1aeae]">-120</td>
                    <td className="border-r-2">-130</td>
                    <td className="bg-[#66ff66] border-b-2 border-b-[#2bf92b] border-r-2 border-r-[#2bf92b]">
                      Fair Value
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-l-2 border-l-black border-2 border-[#b1aeae]">
                      Outs
                    </td>
                    <td className="border-2 border-[#b1aeae]">-110</td>
                    <td className="border-2 border-[#b1aeae]">-107</td>
                    <td className="border-2 border-[#b1aeae]">4.5</td>
                    <td className="border-2 border-[#b1aeae]">-120</td>
                    <td className="border-r-2 border-r-black border-[#b1aeae] border-2">
                      -130
                    </td>
                    <td className="bg-[#66ff66] border-b-2 border-b-[#2bf92b] border-r-2 border-r-[#2bf92b]">
                      Fair Value
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-b-2 border-l-2 border-2 border-r-[#b1aeae] border-t-[#b1aeae] border-black">
                      Earned Runs
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                      -110
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                      -107
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                      4.5
                    </td>
                    <td className="border-b-2 border-black border-r-2 border-r-[#b1aeae]">
                      -120
                    </td>
                    <td className="border-b-2 border-r-2 border-t-[#b1aeae] border-t-2 border-black">
                      -130
                    </td>
                    <td className="bg-[#ffff00]">Fair Value</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10 mobile">
              <h1 className="text-xl font-bold text-center">Carlos</h1>
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
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">Under Odds</th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">-110</td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">Under EV calc Estimate</th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">-110</td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">Line</th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">-110</td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">Ever Odds</th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">-110</td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">Over EV calc Estimate</th>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">-115</td>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black border-b-2 border-b-black">-110</td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none ">Call</th>
                    <td className="bg-[#ffff00] border-b-2 border-b-[#2bf92b]">
                      Fair Value
                    </td>
                    <td className="bg-[#66ff66] border-2 border-[#2bf92b]">
                      Fair Value
                    </td>
                    <td className="bg-[#66ff66] border-2 border-[#2bf92b]">
                      Fair Value
                    </td>
                    <td className="bg-[#f7c7ac] ">
                      Fair Value
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10 mobile">
              <h1 className="text-xl font-bold text-center">Hunter Brown</h1>
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
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">Under Odds</th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">-110</td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">Under EV calc Estimate</th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">-110</td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">Line</th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">-110</td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">Ever Odds</th>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf]">-115</td>
                    <td className="border-2 border-[#c1bfbf]">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black">-110</td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none border-r-2 border-r-black">Over EV calc Estimate</th>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">-115</td>
                    <td className="border-2 border-[#c1bfbf] border-b-2 border-b-black">-110</td>
                    <td className="border-2 border-[#c1bfbf] border-r-2 border-r-black border-b-2 border-b-black">-110</td>
                  </tr>
                  <tr>
                    <th className="w-[20%] m-auto font-medium text-sm flex-nowrap leading-none ">Call</th>
                    <td className="bg-[#ffff00] border-b-2 border-b-[#2bf92b]">
                      Fair Value
                    </td>
                    <td className="bg-[#66ff66] border-2 border-[#2bf92b]">
                      Fair Value
                    </td>
                    <td className="bg-[#66ff66] border-2 border-[#2bf92b]">
                      Fair Value
                    </td>
                    <td className="bg-[#ffff00]">
                      Fair Value
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-20">
            <Tabs>
              <TabList className="!flex justify-between tab-lists">
                <Tab className="bg-gray border-2 border-black p-3 text-2xl carlos-tab w-[45%] text-center">
                  Carlos Carrasco
                </Tab>
                <Tab className="bg-gray border-2 border-black p-3 text-2xl carlos-tab w-[45%] text-center">
                  Hunter Brown
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
          </div>

          <div className="mt-20">
            <h1 className="text-5xl font-bold game-titles text-center">
             Team Defense
            </h1>

            <div className="rounded-3xl w-full py-5 mt-10 px-10 bg-[#0ca75e] grid md:grid-cols-3 sm:grid-cols-1">
                <div className="px-5">
                  <h1 className="font-bold text-4xl">INF</h1>
                  <div className="text-end">
                    <h3 className="font-bold text-3xl">OAA : X</h3>
                    <h3 className="font-bold text-3xl">DRS : Y</h3>
                    <h3 className="font-bold text-3xl">UZR_150 : Z</h3>
                    <h3 className="font-bold text-3xl">Errors : A</h3>
                    <h3 className="font-bold text-3xl">DPs : B</h3>
                  </div>
                </div>
                <div className="px-5 border-r-8 border-l-8 border-black">
                  <h1 className="font-bold text-4xl">OF</h1>
                  <div className="text-end">
                    <h3 className="font-bold text-3xl">OAA : C</h3>
                    <h3 className="font-bold text-3xl">DRS : D</h3>
                    <h3 className="font-bold text-3xl">UZR_150 : E</h3>
                    <h3 className="font-bold text-3xl">Errors : F</h3>
                  </div>
                </div>
                <div className="px-5">
                  <h1 className="font-bold text-4xl">C</h1>
                  <div className="text-end">
                    <h3 className="font-bold text-3xl">DRS : G</h3>
                    <h3 className="font-bold text-3xl">SB : H</h3>
                    <h3 className="font-bold text-3xl">CS : I</h3>
                    <h3 className="font-bold text-3xl">SB Win % : J</h3>
                    <h3 className="font-bold text-3xl">Errors : K</h3>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
