import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import * as Yup from "yup";
import { GetPlayerApi, GetTeamApi, getEda, getEvalCal } from "../../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Apploader from "../../component/Apploader";
import BarGraph from "./Graph";

const Neweda = () => {
  const [edaData, setEdaData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [body, setBody] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState("KDASH");
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  // console.log("graph data", graphData);

  function handleInputChange(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }
  const [initialValues, setInitialValues] = useState({
    playerType: "",
    handedness: "",
    playerName: "",
    opposingTeam: "",
    type: "",
    time_frame: "TY + LY",
    // player_type: "r",
  });
  const validationSchema = Yup.object().shape({
    // playerType: Yup.string()
    //   .required('Player type is required'),
    // handedness: Yup.string()
    //   .required('Metric is required'),
    // playerName: Yup.string()
    //   .required('Player name is required'),
    // opposingTeam: Yup.string()
    //   .required('Opposing team is required'),
    //   type:  Yup.string()
    //   .required('Time frame is required'),
  });
  const [playerType, setPlayerType] = useState("");
  const [team, setTeam] = useState([]);
  const [pitcher, setPitcher] = useState({
    player_name: ["player"],
    pitcher: ["pitcher"],
  });
  const handleSubmit = async (values, action) => {
    // console.log("🚀 ~ handleSubmit ~ values:", values);
    // Handle form submission
    try {
      setInitialValues(values);
      setLoader(true);
      let stat_type = "";
      if (playerType === "pitcher") {
        stat_type = "pitching";
      }
      if (playerType === "batter") {
        stat_type = "batting";
      }
      const body = {
        stat_type,
        plyr_tm_id:
          playerType === "pitcher"
            ? pitcher.pitcher[parseInt(values.playerName)]
            : batter.batter[parseInt(values.playerName)],
        plyr_tm_name: values.opposingTeam,
        player_name:
          playerType === "pitcher"
            ? pitcher.player_name[parseInt(values.playerName)]
            : batter.player_name[parseInt(values.playerName)],
        // metric_val: range.toString(),
        // prob_type: equality,
        // time_frame: values.time_frame,
        player_or_team: values.type,
        handedness: values.handedness,
        // player_type: values.player_type,
      };
      setBody(body);
      // console.log("🚀 ~ handleSubmit ~ body:", body);
      // console.log("🚀 ~ handleSubmit ~ body:", body)
      const newEvalData = await getEda(body);

      // console.log("newEvalData =========>", newEvalData);
      // setEvalData(["","","",""]);
      setEdaData(newEvalData.data);
      setGraphData(newEvalData.data);
      setLoader(false);
    } catch (error) {
      alert("There is some error");
      setEdaData(null);

      setLoader(false);
    }
  };
  const [batter, setBatter] = useState(null);
  const onLoad = async () => {
    try {
      //   setLoader(true);
      const [teams, pitcherData, batterData] = await Promise.all([
        GetTeamApi(),
        GetPlayerApi("pitcher"),
        GetPlayerApi("batter"),
      ]);

      setTeam(teams?.data?.team || []);
      setPitcher(pitcherData.data);
      setBatter(batterData.data);
      setLoader(false);
    } catch (error) {
      alert("There is some error");
      console.log(error);
      setLoader(false);
    }
  };
  useEffect(() => {
    onLoad();
  }, []);
  const formikRef = useRef(null);
  const dropdownRef = useRef(null);
  const [subTitle, setSubTitle] = useState("K");
  useEffect(() => {
    if (body?.stat_type === "pitching") {
      if (tab === "KDASH") {
        setSubTitle("K");
      }
      if (tab === "HITS") {
        setSubTitle("hits allowed");
      }
    }
    if (body?.stat_type === "batting") {
      if (tab === "KDASH") {
        setSubTitle("main");
      }
      if (tab === "HITS") {
        setSubTitle("hits");
      }
    }
  }, [tab, body]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!dropdownRef?.current?.contains(e?.target)) {
        setIsOpen(false);
      }
    });
  });

  if (loader) {
    return (
      <div className="w-full  h-[100vh] flex items-center justify-center">
        <Apploader size={80} />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-[100%] bg-lightblack  px-4 min-w-full top_space">
      <div className="text-center">
        <h4 className="text-white page-title font-bold mb-4">
          player & team exploratory data analysis
        </h4>
        <p className="text-white page-desc mb-4">
          centralized data displays, key metrics & more - say less
        </p>
      </div>
      <div className="bg-white  m-auto flex flex-col px-20 main-section py-20 text-xl min-w-full">
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div
                className={`grid grid-cols-5 gap-4 player-flex text-[#2a3f5f]`}
              >
                <div className="text-center col-span-2 player-select">
                  <Field
                    as="select"
                    className="py-3  bg-lightGray my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="type"
                  >
                    <option disabled value="">
                      player or team
                    </option>
                    <option value="player">player</option>
                    <option value="team">team</option>
                  </Field>
                  <Field
                    as="select"
                    className="py-3 bg-lightGray my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="handedness"
                    onChange={(e) => {
                      setFieldValue("handedness", e.target.value);
                    }}
                  >
                    <option disabled value="">
                      by handedness?
                    </option>
                    {["yes", "no"].map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                    {/* {values.type =="player" && <option  value="yes">yes</option>}
                    <option value="no">no</option> */}
                  </Field>
                </div>
                <div className="text-center col-span-2 player-select">
                  <Field
                    as="select"
                    className="py-3 bg-lightGray  my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="playerType"
                    onChange={(e) => {
                      let newPlayerType = e.target.value;
                      // Reset the player name when player type changes
                      setFieldValue("playerName", "");
                      setFieldValue("playerType", newPlayerType);
                      setFieldValue();

                      // Update the player type state
                      setPlayerType(newPlayerType);
                    }}
                  >
                    <option disabled value="">
                      pitching or batting
                    </option>
                    <option value="pitcher">pitching</option>
                    <option value="batter">batting</option>
                  </Field>
                  {values.type == "player" && (
                    <>
                      <div className="flex items-center justify-center pt-5 pb-5">
                        <div
                          className="relative group w-full" style={{zIndex:"99999"}}
                          ref={dropdownRef}
                        >
                          <button
                            type="button"
                            onClick={toggleDropdown}
                            className=" py-3 bg-lightGray  player-list buttonPlayer  text-center focus:outline-none appearance-none inline-flex justify-center w-full px-4  text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm "
                          >
                            {values.playerName === "" ? (
                              "player name"
                            ) : (
                              <span className="mr-2">
                                {playerType === "pitcher"
                                  ? pitcher.player_name[
                                      parseInt(values.playerName)
                                    ]
                                  : batter.player_name[
                                      parseInt(values.playerName)
                                    ]}
                              </span>
                            )}
                          </button>
                          {values.playerType != "" && (
                            <div
                              className={`absolute right-0 mt-2 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${
                                isOpen ? "" : "hidden"
                              } max-h-60  w-full bg-white`}
                            >
                              <input
                                onChange={handleInputChange}
                                className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                                type="text"
                                placeholder="Search Player Name"
                                autoComplete="off"
                              />
                              <div className="overflow-y-auto max-h-40 bg-white">
                                {playerType === "pitcher" &&
                                  pitcher &&
                                  pitcher.player_name.map(
                                    (item, i) =>
                                      item
                                        .toLowerCase()
                                        .includes(searchTerm) && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            // console.log(
                                            //   "value set playername",
                                            //   item,
                                            //   i
                                            // );
                                            setFieldValue("playerName", `${i}`);
                                            toggleDropdown();
                                          }}
                                          key={i}
                                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                                        >
                                          {item}
                                        </button>
                                      )
                                  )}
                                {playerType === "batter" &&
                                  batter &&
                                  batter.player_name.map(
                                    (item, i) =>
                                      item
                                        .toLowerCase()
                                        .includes(searchTerm) && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            // console.log(
                                            //   "value set playername",
                                            //   item,
                                            //   i,
                                            //   batter.player_name[parseInt(i)]
                                            // );
                                            setFieldValue("playerName", i);
                                            toggleDropdown();
                                          }}
                                          key={i}
                                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                                        >
                                          {item}
                                        </button>
                                      )
                                  )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>{" "}
                    </>
                  )}
                  {values.type == "team" && (
                    <Field
                      as="select"
                      className="py-3 bg-lightGray my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                      name="opposingTeam"
                    >
                      <option disabled value="">
                        team
                      </option>
                      {team.map((item, i) => {
                        return (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Field>
                  )}
                </div>
                {/* {edaData && values.handedness === "yes" && (
                  <div className="text-center self-center col-span-1 player-select">
                    <Field
                      as="select"
                      className="py-3 bg-lightGray my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                      name="player_type"
                    >
                      <option disabled value="">
                        R or L
                      </option>
                      <option value="r">R</option>
                      <option value="l">L</option>
                    </Field>
                  </div>
                )} */}
                <div className="col-span-1 flex">
                  <button
                    type="submit"
                    className="bg-black mx-auto self-center text-white px-5 py-2 rounded"
                    disabled={isSubmitting}
                  >
                    run
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        {edaData && (
          <>
            {body.handedness === "no" ? (
              <div className="mt-5">
                <div>
                  {body.stat_type === "pitching" &&
                    body.handedness === "no" && (
                      <div className="w-full border-4 my-3 px-2 py-5 rounded-[60px] border-black h-auto">
                        <div className="flex graph-display">
                          <div className="image-1">
                            {edaData?.ERA_graph ? (
                              <BarGraph
                                data={JSON.parse(graphData?.ERA_graph)}
                                config={{ responsive: true }}
                              />
                            ) : (
                              // <img
                              //   className="my-2"
                              //   src={edaData?.ERA_graph + `?new=${new Date()}`}
                              // />
                              <></>
                            )}
                          </div>
                          <div className="image-1">
                            {edaData?.WHIP_graph ? (
                              <BarGraph
                                data={JSON.parse(graphData?.WHIP_graph)}
                                config={{ responsive: true }}
                              />
                            ) : (
                              // <img
                              //   className="my-2"
                              //   src={edaData?.WHIP_graph + `?new=${new Date()}`}
                              // />
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                {body.handedness === "no" && (
                  <div className="text-center my-3">
                    <h1 className="font-bold text-5xl">
                      {body.stat_type === "pitching" ? "Length &" : ""}{" "}
                      Efficiency
                    </h1>
                    <div className="w-full border-4 my-3 px-2 py-5 rounded-[60px] border-black h-auto">
                      <div className="flex graph-display">
                        <div className="image-1">
                          {body?.stat_type === "pitching" ? (
                            <>
                              <BarGraph
                                data={
                                  body?.stat_type === "pitching"
                                    ? JSON.parse(graphData?.outs_PG_graph)
                                    : JSON.parse(graphData?.AB_PG_graph)
                                }
                                config={{ responsive: true }}
                              />
                              {/* <img
                                className="my-2"
                                src={
                                  body.stat_type === "pitching"
                                    ? edaData?.outs_PG_graph
                                    : edaData?.AB_PG_graph +
                                      `?new=${new Date()}`
                                }
                              /> */}
                              {body.handedness == "yes" && (
                                <>
                                  <BarGraph
                                    data={JSON.parse(graphData?.bb_9_graph)}
                                    config={{ responsive: true }}
                                  />
                                  {/* <img
                                    className="my-2"
                                    src={
                                      edaData?.bb_9_graph + `?new=${new Date()}`
                                    }
                                  /> */}
                                  <BarGraph
                                    data={JSON.parse(graphData?.hr_9_graph)}
                                    config={{ responsive: true }}
                                  />
                                  {/* <img
                                  
                                    className="my-2"
                                    src={
                                      edaData?.hr_9_graph + `?new=${new Date()}`
                                    }
                                  /> */}
                                  <BarGraph
                                    data={JSON.parse(
                                      graphData?.balls_inplay_9_graph
                                    )}
                                    config={{ responsive: true }}
                                  />
                                  {/* <img
                                    className="my-2"
                                    src={
                                      edaData?.balls_inplay_9_graph +
                                      `?new=${new Date()}`
                                    }
                                  /> */}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {edaData?.AB_PG_graph && (
                                <BarGraph
                                  data={JSON.parse(graphData?.AB_PG_graph)}
                                  config={{ responsive: true }}
                                />
                                // <img
                                //   className="my-2"
                                //   src={
                                //     edaData?.AB_PG_graph + `?new=${new Date()}`
                                //   }
                                // />
                              )}
                            </>
                          )}
                        </div>
                        <div className="image-1">
                          {(edaData?.batters_faced_PG_graph ||
                            edaData?.TB_PG_graph) && (
                            <BarGraph
                              data={
                                body.stat_type === "pitching"
                                  ? JSON.parse(
                                      graphData?.batters_faced_PG_graph
                                    )
                                  : JSON.parse(graphData?.TB_PG_graph)
                              }
                              config={{ responsive: true }}
                            />
                            // <img
                            //   className="my-2"
                            //   src={
                            //     body.stat_type === "pitching"
                            //       ? edaData?.batters_faced_PG_graph
                            //       : edaData?.TB_PG_graph + `?new=${new Date()}`
                            //   }
                            // />
                          )}
                        </div>
                      </div>

                      {edaData?.pitches_PG_graph &&
                      edaData?.pitch_per_PA_graph ? (
                        <div className="flex graph-display">
                          <div className="image-1">
                            {edaData?.pitches_PG_graph && (
                              <BarGraph
                                data={JSON.parse(graphData?.pitches_PG_graph)}
                                config={{ responsive: true }}
                              />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.pitches_PG_graph +
                              //     `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                          <div className="image-1">
                            {graphData?.pitch_per_PA_graph && (
                              <BarGraph
                                data={JSON.parse(graphData?.pitch_per_PA_graph)}
                                config={{ responsive: true }}
                              />
                            )}

                            {/* <img
                              className="my-2"
                              src={
                                edaData?.pitch_per_PA_graph +
                                `?new=${new Date()}`
                              }
                            /> */}
                          </div>
                        </div>
                      ) : (
                        <div className="flex graph-display justify-center">
                          {graphData?.pitch_per_PA_graph && (
                            <BarGraph
                              data={JSON.parse(graphData?.pitch_per_PA_graph)}
                              config={{ responsive: true }}
                            />
                          )}

                          {/* <img
                            className="my-2 w-[100%]"
                            src={
                              edaData?.pitch_per_PA_graph + `?new=${new Date()}`
                            }
                          /> */}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {body.handedness === "yes" && (
                  <div className="text-center my-3">
                    <h1 className="font-bold text-5xl">The Topline Stats</h1>
                    <div className="w-full border-4 my-3 px-2 py-5 rounded-[60px] border-black h-auto">
                      <div className="flex graph-display">
                        <div className="image-1">
                          <BarGraph
                            data={JSON.parse(graphData?.hnd_topstats_graph)}
                            config={{ responsive: true }}
                          />
                          {/* <img
                            className="my-2"
                            src={
                              edaData?.hnd_topstats_graph + `?new=${new Date()}`
                            }
                          /> */}
                        </div>
                        <div className="image-1">
                          {(edaData?.batters_faced_PG_graph ||
                            edaData?.TB_PG_graph) && (
                            <BarGraph
                              data={
                                body.stat_type === "pitching"
                                  ? JSON.parse(
                                      graphData?.batters_faced_PG_graph
                                    )
                                  : JSON.parse(graphData?.TB_PG_graph)
                              }
                              config={{ responsive: true }}
                            />
                            // <img
                            //   className="my-2"
                            //   src={
                            //     body.stat_type === "pitching"
                            //       ? edaData?.batters_faced_PG_graph
                            //       : edaData?.TB_PG_graph + `?new=${new Date()}`
                            //   }
                            // />
                          )}
                        </div>
                      </div>
                      <div className="flex graph-display">
                        <div className="image-1">
                          {edaData?.pitches_PG_graph && (
                            <BarGraph
                              data={JSON.parse(graphData?.pitches_PG_graph)}
                              config={{ responsive: true }}
                            />
                            // <img
                            //   className="my-2"
                            //   src={
                            //     edaData?.pitches_PG_graph + `?new=${new Date()}`
                            //   }
                            // />
                          )}
                        </div>
                        <div className="image-1">
                          <BarGraph
                            data={JSON.parse(graphData?.pitch_per_PA_graph)}
                            config={{ responsive: true }}
                          />
                          {/* <img
                            className="my-2"
                            src={
                              edaData?.pitch_per_PA_graph + `?new=${new Date()}`
                            }
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="text-center my-5">
                  <h1 className="font-bold  text-5xl">At The Plate</h1>
                  <div className="w-full border-4 my-3 p-5 rounded-[60px] border-black h-auto">
                    {body.stat_type === "pitching" && (
                      <h2 className="text-center text-5xl font-bold">
                        strikeout stuff
                      </h2>
                    )}

                    {edaData?.k_PG_graph && edaData?.k_9_graph ? (
                      <div className="flex graph-display">
                        <div className="image-1">
                          {edaData?.k_PG_graph ? (
                            <BarGraph
                              data={JSON.parse(graphData?.k_PG_graph)}
                              config={{ responsive: true }}
                            />
                          ) : (
                            // <img
                            //   className="my-2"
                            //   src={edaData?.k_PG_graph + `?new=${new Date()}`}
                            // />
                            <></>
                          )}
                        </div>
                        <div className="image-1">
                          <BarGraph
                            data={JSON.parse(graphData?.k_9_graph)}
                            config={{ responsive: true }}
                          />
                          {/* <img
                            className="my-2"
                            src={edaData?.k_9_graph + `?new=${new Date()}`}
                          /> */}
                        </div>
                      </div>
                    ) : (
                      <div className="flex graph-display justify-center">
                        <BarGraph
                          data={JSON.parse(graphData?.k_PG_graph)}
                          config={{ responsive: true }}
                        />
                        {/* <img
                          className="my-2 w-[100%]"
                          src={edaData?.k_PG_graph + `?new=${new Date()}`}
                        /> */}
                      </div>
                    )}

                    <div className="flex graph-display">
                      <div className="image-1">
                        <BarGraph
                          data={JSON.parse(graphData?.k_rate_graph)}
                          config={{ responsive: true }}
                        />
                        {/* <img
                          className="my-2"
                          src={edaData?.k_rate_graph + `?new=${new Date()}`}
                        /> */}
                      </div>
                      <div className="image-1">
                        <BarGraph
                          data={
                            body.stat_type === "pitching"
                              ? JSON.parse(graphData?.callswgstr_graph)
                              : JSON.parse(graphData?.swgstr_graph)
                          }
                          config={{ responsive: true }}
                        />
                        {/* <img
                          className="my-2"
                          src={
                            body.stat_type === "pitching"
                              ? edaData?.callswgstr_graph
                              : edaData?.swgstr_graph + `?new=${new Date()}`
                          }
                        /> */}
                      </div>
                    </div>

                    {body.stat_type !== "pitching" && (
                      <div className="flex graph-display">
                        <div className="image-1">
                          {edaData?.strike_rate_graph && (
                            <BarGraph
                              data={JSON.parse(graphData?.strike_rate_graph)}
                              config={{ responsive: true }}
                            />
                            // <img
                            //   className="my-2"
                            //   src={
                            //     edaData?.strike_rate_graph +
                            //     `?new=${new Date()}`
                            //   }
                            // />
                          )}
                        </div>
                        <div className="image-1">
                          {edaData?.k_bb_graph && (
                            <BarGraph
                              data={JSON.parse(graphData?.k_bb_graph)}
                              config={{ responsive: true }}
                            />
                            // <img
                            //   className="my-2"
                            //   src={edaData?.k_bb_graph + `?new=${new Date()}`}
                            // />
                          )}
                        </div>
                      </div>
                    )}

                    {body.stat_type === "pitching" && (
                      <>
                        <h2 className="text-center text-5xl  font-semibold my-5">
                          command
                        </h2>
                        <div className="flex graph-display">
                          <div className="image-1">
                            <BarGraph
                              data={JSON.parse(graphData?.k_bb_graph)}
                              config={{ responsive: true }}
                            />
                            {/* <img
                              className="my-2"
                              src={edaData?.k_bb_graph + `?new=${new Date()}`}
                            /> */}
                          </div>
                          <div className="image-1">
                            <BarGraph
                              data={JSON.parse(graphData?.strike_rate_graph)}
                              config={{ responsive: true }}
                            />
                            {/* <img
                              className="my-2"
                              src={
                                edaData?.strike_rate_graph +
                                `?new=${new Date()}`
                              }
                            /> */}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-center my-5">
                  <h1 className="font-bold  text-5xl">In The Field</h1>
                  <div className="w-full border-4 my-3 p-5 rounded-[60px] border-black h-auto">
                    <div className="grid md:grid-cols-4 my-5 sm:grid-cols-1 ">
                      <div className=" flex border-black border-4 my-2 mx-5 rounded-2xl flex-col h-36 justify-evenly items-center">
                        <span className="text-2xl  font-bold field-text">
                          Batting Average
                        </span>
                        <span className="text-2xl  ">
                          {edaData["Batting Average"]}
                        </span>
                      </div>
                      <div className=" flex border-black border-4 my-2 mx-5 rounded-2xl flex-col h-36 justify-evenly items-center">
                        <span className="text-2xl  font-bold field-text">
                          On Base Pct
                        </span>
                        <span className="text-2xl  ">
                          {edaData["On Base Pct"]}
                        </span>
                      </div>
                      <div className=" flex border-black border-4 my-2 mx-5 rounded-2xl flex-col h-36 justify-evenly items-center">
                        <span className="text-2xl  font-bold field-text">
                          Slugging Pct
                        </span>
                        <span className="text-2xl  ">
                          {edaData["Slugging"]}
                        </span>
                      </div>
                      <div className=" flex border-black border-4 my-2 mx-5 rounded-2xl flex-col h-36 justify-evenly items-center">
                        <span className="text-2xl  font-bold field-text">
                          On Base + Slugging
                        </span>
                        <span className="text-2xl  ">
                          {edaData["On Base + Slugging"]}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-center font-bold text-5xl">contact</h2>
                    <div className=" flex  flex-col h-36 my-2   justify-center items-center">
                      <div className="border-black  flex  flex-col py-5 px-20  rounded-2xl border-4">
                        <span className="text-3xl  font-semibold">
                          Contact Pct
                        </span>
                        <span className="text-3xl  ">
                          {edaData["Contact Pct"]}
                        </span>
                      </div>
                    </div>
                    <div className="flex graph-display">
                      {edaData?.hits_PG_graph && (
                        <div className="image-1">
                          <BarGraph
                            data={JSON.parse(graphData?.hits_PG_graph)}
                            config={{ responsive: true }}
                          />
                          {/* <img
                            className="my-2"
                            src={edaData?.hits_PG_graph + `?new=${new Date()}`}
                          /> */}
                        </div>
                      )}
                      {(edaData?.hits_9_graph || edaData?.gbfb_ratio_graph) && (
                        <div className="image-1">
                          <BarGraph
                            data={
                              body.stat_type === "pitching"
                                ? JSON.parse(graphData?.hits_9_graph)
                                : JSON.parse(graphData?.gbfb_ratio_graph)
                            }
                            config={{ responsive: true }}
                          />
                          {/* <img
                            className="my-2"
                            src={
                              body.stat_type === "pitching"
                                ? edaData?.hits_9_graph
                                : edaData?.gbfb_ratio_graph +
                                  `?new=${new Date()}`
                            }
                          /> */}
                        </div>
                      )}
                    </div>
                    <div className="flex graph-display">
                      <div className="image-1">
                        {edaData?.balls_inplay_PG_graph && (
                          <BarGraph
                            data={JSON.parse(graphData?.balls_inplay_PG_graph)}
                            config={{ responsive: true }}
                          />
                          // <img
                          //   className="my-2"
                          //   src={
                          //     edaData?.balls_inplay_PG_graph +
                          //     `?new=${new Date()}`
                          //   }
                          // />
                        )}
                      </div>
                      <div className="image-1">
                        <BarGraph
                          data={JSON.parse(graphData?.babip_graph)}
                          config={{ responsive: true }}
                        />
                        {/* <img
                          className="my-2"
                          src={edaData?.babip_graph + `?new=${new Date()}`}
                        /> */}
                      </div>
                    </div>
                    <h2 className="text-center font-bold text-5xl">power</h2>
                    <div className=" flex  flex-col h-36 my-2   justify-center items-center">
                      <div className="border-black  flex  flex-col py-5 px-10  rounded-2xl border-4">
                        <span className="text-3xl font-semibold">
                          Isolated Power
                        </span>
                        <span className="text-3xl">{edaData["ISO"]}</span>
                      </div>
                    </div>
                    <div className="flex graph-display">
                      <div className="image-1">
                      <BarGraph
                          data={JSON.parse(graphData?.xbh_pct_graph)}
                          config={{ responsive: true }}
                        />
                        {/* <img
                          className="my-2"
                          src={edaData?.xbh_pct_graph + `?new=${new Date()}`}
                        /> */}
                      </div>

                      <div className="image-1">
                      <BarGraph
                            data={
                              body.stat_type === "pitching"
                                ? JSON.parse(graphData?.hr_pct_graph)
                                : JSON.parse(graphData?.hardhit_pct_graph)
                            }
                            config={{ responsive: true }}
                          />
                        {/* <img
                          className="my-2"
                          src={
                            body.stat_type === "pitching"
                              ? edaData?.hr_pct_graph
                              : edaData?.hardhit_pct_graph +
                                `?new=${new Date()}`
                          }
                        /> */}
                      </div>
                    </div>

                    {body.stat_type !== "pitching" && (
                      <div className="flex graph-display justify-center">
                        {edaData?.hr_pct_graph && (
                           <BarGraph
                           data={JSON.parse(graphData?.hr_pct_graph)}
                           config={{ responsive: true }}
                         />
                          // <img
                          //   className="my-2 w-[100%]"
                          //   src={edaData?.hr_pct_graph + `?new=${new Date()}`}
                          // />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5">
                <div className="text-center my-3">
                  <h1 className="font-bold text-5xl">The Topline Stats</h1>
                  <div className="w-full border-4 my-3 px-2 py-5 rounded-[60px] border-black h-auto">
                    <div className="flex graph-display w-full">
                      <BarGraph
                        data={JSON.parse(graphData?.hnd_topstats_graph)}
                        config={{ responsive: true }}
                      />
                      {/* <img
                        className="my-2 w-full"
                        src={edaData?.hnd_topstats_graph + `?new=${new Date()}`}
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="text-center my-5">
                  <h1 className="font-bold  text-5xl">At The Plate</h1>
                  <div className="w-full border-4 my-3 p-5 rounded-[60px] border-black h-auto">
                    {body.stat_type === "pitching" ? (
                      <>
                        <h2 className="text-center text-5xl font-bold">
                          strikeout stuff
                        </h2>
                        <div className="flex graph-display justify-center">
                        <BarGraph
                        data={JSON.parse(graphData?.hnd_k_9_graph)}
                        config={{ responsive: true }}
                      />
                          {/* <img
                            className="my-2 w-[100%]"
                            src={edaData?.hnd_k_9_graph + `?new=${new Date()}`}
                          /> */}
                        </div>
                        <div className="flex graph-display">
                          <div className="image-1">
                            {edaData?.hnd_k_rate_graph && (
                              <BarGraph
                                data={JSON.parse(graphData?.hnd_k_rate_graph)}
                                config={{ responsive: true }}
                              />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.hnd_k_rate_graph +
                              //     `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                          <div className="image-1">
                            {edaData?.hnd_callswgstr_graph && (
                               <BarGraph
                               data={JSON.parse(graphData?.hnd_callswgstr_graph)}
                               config={{ responsive: true }}
                             />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.hnd_callswgstr_graph +
                              //     `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                        </div>
                        <h2 className="text-center text-5xl  font-semibold my-5">
                          command
                        </h2>
                        <div className="flex graph-display">
                          <div className="image-1">
                            {edaData?.hnd_bb_9_graph && (
                               <BarGraph
                               data={JSON.parse(graphData?.hnd_bb_9_graph)}
                               config={{ responsive: true }}
                             />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.hnd_bb_9_graph + `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                          <div className="image-1">
                            {edaData?.hnd_k_bb_graph && (
                              <BarGraph
                                data={JSON.parse(graphData?.hnd_k_bb_graph)}
                                config={{ responsive: true }}
                              />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.hnd_k_bb_graph + `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                        </div>
                        <div className="flex graph-display">
                          <div className="image-1">
                            {edaData?.hnd_strike_rate_graph && (
                              <BarGraph
                                data={JSON.parse(
                                  graphData?.hnd_strike_rate_graph
                                )}
                                config={{ responsive: true }}
                              />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.hnd_strike_rate_graph +
                              //     `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                          <div className="image-1">
                            {edaData?.hnd_pitch_perPA_graph && (
                              <BarGraph
                                data={JSON.parse(
                                  graphData?.hnd_pitch_perPA_graph
                                )}
                                config={{ responsive: true }}
                              />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.hnd_pitch_perPA_graph +
                              //     `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex graph-display">
                          <div className="image-1">
                            {edaData?.hnd_k_rate_graph && (
                              <BarGraph
                                data={JSON.parse(graphData?.hnd_k_rate_graph)}
                                config={{ responsive: true }}
                              />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.hnd_k_rate_graph +
                              //     `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                          <div className="image-1">
                            {edaData?.hnd_k_bb_graph && (
                              <BarGraph
                                data={JSON.parse(graphData?.hnd_k_bb_graph)}
                                config={{ responsive: true }}
                              />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.hnd_k_bb_graph + `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                        </div>

                        <div className="flex graph-display">
                          <div className="image-1">
                            {edaData?.hnd_pitch_perPA_graph && (
                              <BarGraph
                                data={JSON.parse(
                                  graphData?.hnd_pitch_perPA_graph
                                )}
                                config={{ responsive: true }}
                              />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.hnd_pitch_perPA_graph +
                              //     `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                          <div className="image-1">
                            {edaData?.hnd_strike_rate_graph && (
                              <BarGraph
                                data={JSON.parse(
                                  graphData?.hnd_strike_rate_graph
                                )}
                                config={{ responsive: true }}
                              />
                              // <img
                              //   className="my-2"
                              //   src={
                              //     edaData?.hnd_strike_rate_graph +
                              //     `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                        </div>
                        <div className="flex graph-display justify-center w-full m-auto">
                          <div className="w-full">
                            {edaData?.hnd_swstrk_rate_graph && (
                              <BarGraph
                                data={JSON.parse(
                                  graphData?.hnd_swstrk_rate_graph
                                )}
                                config={{ responsive: true }}
                              />
                              // <img
                              //   className="my-2 w-[100%]"
                              //   src={
                              //     edaData?.hnd_swstrk_rate_graph +
                              //     `?new=${new Date()}`
                              //   }
                              // />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-center my-5">
                  <h1 className="font-bold  text-5xl">In The Field</h1>
                  <div className="w-full border-4 my-3 p-5 rounded-[60px] border-black h-auto">
                    <h2 className="text-center font-bold text-5xl">contact</h2>

                    {body.stat_type === "pitching" && (
                      <div className="flex graph-display justify-center w-full">
                        {edaData?.hnd_hits_9_graph && (
                           <BarGraph
                           data={JSON.parse(graphData?.hnd_hits_9_graph)}
                           config={{ responsive: true }}
                         />
                          // <img
                          //   className="my-2 w-[100%]"
                          //   src={
                          //     edaData?.hnd_hits_9_graph + `?new=${new Date()}`
                          //   }
                          // />
                        )}
                      </div>
                    )}
                    <div className="flex graph-display">
                      {edaData?.hnd_bip_9_graph && (
                        <div className="image-1">
                          <BarGraph
                           data={JSON.parse(graphData?.hnd_bip_9_graph)}
                           config={{ responsive: true }}
                         />
                          {/* <img
                            className="my-2"
                            src={
                              edaData?.hnd_bip_9_graph + `?new=${new Date()}`
                            }
                          /> */}
                        </div>
                      )}

                      {edaData?.hnd_BABIP_graph && (
                        <div className="image-1">
                          <BarGraph
                            data={JSON.parse(graphData?.hnd_BABIP_graph)}
                            config={{ responsive: true }}
                          />
                          {/* <img
                            className="my-2"
                            src={
                              edaData?.hnd_BABIP_graph + `?new=${new Date()}`
                            }
                          /> */}
                        </div>
                      )}

                      {edaData?.hnd_gbfb_ratio_graph && (
                        <div className="image-1">
                          {" "}
                          <BarGraph
                            data={JSON.parse(graphData?.hnd_gbfb_ratio_graph)}
                            config={{ responsive: true }}
                          />
                          {/* <img
                            className="my-2"
                            src={
                              edaData?.hnd_gbfb_ratio_graph +
                              `?new=${new Date()}`
                            }
                          /> */}
                        </div>
                      )}
                    </div>
                    <h2 className="text-center font-bold text-5xl">power</h2>

                    {body.stat_type === "pitching" ? (
                      <>
                        <div className="flex graph-display">
                          <div className="image-1">
                            <BarGraph
                              data={JSON.parse(graphData?.hnd_iso_graph)}
                              config={{ responsive: true }}
                            />
                            {/* <img
                              className="my-2"
                              src={
                                edaData?.hnd_iso_graph + `?new=${new Date()}`
                              }
                            /> */}
                          </div>

                          <div className="image-1">
                            <BarGraph
                              data={JSON.parse(graphData?.hnd_xbh_pct_graph)}
                              config={{ responsive: true }}
                            />
                            {/* <img
                              className="my-2"
                              src={
                                edaData?.hnd_xbh_pct_graph +
                                `?new=${new Date()}`
                              }
                            /> */}
                          </div>
                        </div>
                        <div className="flex graph-display">
                          <div className="image-1">
                            <BarGraph
                              data={JSON.parse(graphData?.hnd_hr_pct_graph)}
                              config={{ responsive: true }}
                            />
                            {/* <img
                              className="my-2"
                              src={
                                edaData?.hnd_hr_pct_graph + `?new=${new Date()}`
                              }
                            /> */}
                          </div>

                          <div className="image-1">
                          <BarGraph
                            data={JSON.parse(graphData?.hnd_hr_9_graph)}
                            config={{ responsive: true }}
                          />
                            {/* <img
                              className="my-2"
                              src={
                                edaData?.hnd_hr_9_graph + `?new=${new Date()}`
                              }
                            /> */}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex graph-display">
                          <div className="image-1">
                            <BarGraph
                              data={JSON.parse(graphData?.hnd_iso_graph)}
                              config={{ responsive: true }}
                            />
                            {/* <img
                              className="my-2"
                              src={
                                edaData?.hnd_iso_graph + `?new=${new Date()}`
                              }
                            /> */}
                          </div>

                          <div className="image-1">
                            <BarGraph
                              data={JSON.parse(
                                graphData?.hnd_hardhit_pct_graph
                              )}
                              config={{ responsive: true }}
                            />
                            {/* <img
                              className="my-2"
                              src={
                                edaData?.hnd_hardhit_pct_graph +
                                `?new=${new Date()}`
                              }
                            /> */}
                          </div>
                        </div>
                        <div className="flex graph-display">
                          <div className="image-1">
                            <BarGraph
                              data={JSON.parse(graphData?.hnd_xbh_pct_graph)}
                              config={{ responsive: true }}
                            />
                            {/* <img
                              className="my-2"
                              src={
                                edaData?.hnd_xbh_pct_graph +
                                `?new=${new Date()}`
                              }
                            /> */}
                          </div>

                          <div className="image-1">
                            <BarGraph
                              data={JSON.parse(graphData?.hnd_hr_pct_graph)}
                              config={{ responsive: true }}
                            />
                            {/* <img
                              className="my-2"
                              src={
                                edaData?.hnd_hr_pct_graph + `?new=${new Date()}`
                              }
                            /> */}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Neweda;
