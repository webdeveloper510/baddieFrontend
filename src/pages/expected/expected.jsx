import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import * as Yup from "yup";
import { GetPlayerApi, GetTeamApi, getEvalCal } from "../../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Apploader from "../../component/Apploader";

const Expected = () => {
  const [evalData, setEvalData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [range, setRange] = useState(6);
  const [equality, setEquality] = useState("less than or equal to");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [metricType, setMetricType] = useState("");
  const [rangeMax, setRangeMax] = useState(10);
  const [rangeDefault, setRangeDefault] = useState(5);

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
        setRangeMax(6);
        setRangeDefault(2);
        setRange(2);
        break;
      }
      case "Outs": {
        setRangeMax(27);
        setRangeDefault(15);
        setRange(15);
        break;
      }
      case "Earned Runs": {
        setRangeMax(27);
        setRangeDefault(15);
        setRange(2);
        break;
      }
    }
  }, [metricType]);
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleInputChange(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }
  const [initialValues, setInitialValues] = useState({
    playerType: "pitcher",
    metric: "",
    playerName: "",
    opposingTeam: "",
    time_frame: "TY",
    home_away: "home"
  });
  const validationSchema = Yup.object().shape({
    playerType: Yup.string().required("Player type is required"),
    metric: Yup.string().required("Metric is required"),
    playerName: Yup.string().required("Player name is required"),
    opposingTeam: Yup.string().required("Opposing team is required"),
    time_frame: Yup.string().required("Time frame is required"),
    home_away: Yup.string()
  });
  const [playerType, setPlayerType] = useState("pitcher");
  const [team, setTeam] = useState([]);
  const [pitcher, setPitcher] = useState({
    player_name: ["player"],
    pitcher: ["pitcher"],
  });
  const handleSubmit = async (values, action) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    try {
      setInitialValues(values);
      setLoader(true);
      const body = {
        stat_type: playerType,
        player_id:
          playerType === "pitcher"
            ? pitcher.pitcher[parseInt(values.playerName)]
            : batter.batter[parseInt(values.playerName)],
        metric_type: metricType,
        opp_team: values.opposingTeam,
        player_name:
          playerType === "pitcher"
            ? pitcher.player_name[parseInt(values.playerName)]
            : batter.player_name[parseInt(values.playerName)],
        metric_val: range.toString(),
        prob_type: equality,
        time_frame: values.time_frame,
        home_away : values.home_away
      };
      console.log("🚀 ~ handleSubmit ~ body:", body);
      const newEvCalData = await getEvalCal(body);

      console.log("evCalData =========>", newEvCalData);
      // setEvalData(["","","",""]);
      setEvalData(newEvCalData.data);
      setLoader(false);
    } catch (error) {
      alert("There is some error");
      setLoader(false);
    }
  };
  const [batter, setBatter] = useState(null);
  const onLoad = async () => {
    try {
      setLoader(true);
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
      setLoader(false);
    }
  };
  useEffect(() => {
    onLoad();
  }, []);
  const formikRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSubmitOutsideFormik = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!dropdownRef?.current?.contains(e?.target)) {
        setIsOpen(false);
      }
    });
  });

  if (loader) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Apploader size={80} />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-[100%] bg-lightblack  px-4 min-w-full top_space">
      <div className="text-center">
        <h4 className="text-white page-title font-bold mb-4">
          expected value calculator
        </h4>
        <p className="text-white page-desc mb-4">
          evaluate outcomes using advanced probability tools
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
                className={`grid ${
                  !evalData ? "grid-cols-6" : "grid-cols-6"
                } gap-2 player-flex text-[#2a3f5f]`}
              >
                <div className="text-center col-span-2 player-select">
                  <Field
                    as="select"
                    className="py-3 bg-lightGray px-9 my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="playerType"
                    onChange={(e) => {
                      const newPlayerType = e.target.value;
                      // Reset the player name when player type changes
                      setFieldValue("playerName", "");
                      setFieldValue("playerType", newPlayerType);
                      setFieldValue();
                      // Update the player type state
                      setPlayerType(newPlayerType);
                    }}
                  >
                    {/* <option disabled value="">pitcher or batter</option> */}
                    <option value="pitcher">pitcher</option>
                    {/* <option value="batter">batter</option> */}
                  </Field>
                  <Field
                    as="select"
                    className="py-3 bg-lightGray px-9 my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="metric"
                    onChange={(e) => {
                      setMetricType(e.target.value);
                      setFieldValue("metric", e.target.value);
                    }}
                  >
                    <option disabled value="">
                      metric
                    </option>
                    {["Ks", "Hits Allowed", "Walks", "Outs", "Earned Runs"].map(
                      (item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </Field>
                </div>
                <div className="text-center col-span-2 player-select">
                  <div className="flex items-center justify-center pt-5 pb-5">
                    <div className="relative group w-full" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={toggleDropdown}
                        className=" py-3 bg-lightGray player-list buttonPlayer  text-center focus:outline-none appearance-none inline-flex justify-center w-full px-4  text-sm font-medium text-gray-700  border border-gray-300 rounded-md shadow-sm "
                      >
                        {values.playerName === "" ? (
                          "player name"
                        ) : (
                          <span className="mr-2">
                            {playerType === "pitcher"
                              ? pitcher.player_name[parseInt(values.playerName)]
                              : batter.player_name[parseInt(values.playerName)]}
                          </span>
                        )}
                      </button>
                      {values.playerType != "" && (
                        <div
                          className={`absolute right-0 mt-2 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${
                            isOpen ? "" : "hidden"
                          } max-h-60 bg-white w-full`}
                        >
                          <input
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                            type="text"
                            placeholder="Search Player Name"
                            autoComplete="off"
                          />
                          <div className="overflow-y-auto max-h-40">
                            {playerType === "pitcher" &&
                              pitcher &&
                              pitcher.player_name.map(
                                (item, i) =>
                                  item.toLowerCase().includes(searchTerm) && (
                                    <button
                                      type="button"
                                      onClick={() => {
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
                                  item.toLowerCase().includes(searchTerm) && (
                                    <button
                                      type="button"
                                      onClick={() => {
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
                  </div>
                  <Field
                    as="select"
                    className="py-3 bg-lightGray px-9 my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="opposingTeam"
                  >
                    <option disabled value="">
                      opposing team
                    </option>
                    {team.map((item, i) => {
                      return (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                <div className="text-center col-span-1  player-select">
                  <Field
                    as="select"
                    className="py-3 bg-lightGray px-9 my-5 self-center player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="home_away"
                  >
                    <option disabled value="">
                      home/away
                    </option>
                    <option value="home">home</option>
                    <option value="away">away</option>
                  </Field>
                  {evalData && (
                    <Field
                      as="select"
                      className="py-3 bg-lightGray px-9 my-5 self-center player-list rounded w-full text-center focus:outline-none appearance-none"
                      name="time_frame"
                    >
                      <option disabled value="">
                        TY
                      </option>
                      <option value="TY">TY</option>
                      <option value="LY">LY</option>
                      <option value="TY + LY">TY + LY</option>
                    </Field>
                  )}
                </div>

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
        {evalData ? (
          <>
            <div className=" w-full mt-5">
              <div className="w-full flex items-center justify-center">
                {/* <p className="text-lg ev-text text-center my-3">
              Relative frequency Histogram of kelly, Merrill for k per Game
            </p> */}
                {/* {evalData?<Bar options={options} data={data} />: */}

                <img src={evalData[0] + `?new=${new Date()}`}></img>
              </div>
              {/* <div className="graph-section">
              {evalData?.length > 0 && <img src={evalData[1]+`?new=${new Date()}`}></img>}
            </div> */}
            </div>
            <div className="flex player-flex justify-between mt-20">
              <div className="w-96 player-select flex justify-center">
                <div className="w-full">
                  <div className="text-center">
                    <span className="text-2xl font-bold">
                      {metricType} {range}
                    </span>
                  </div>
                  <div className="w-full progress-bars my-5">
                    {/* <RangeSlider
                    className="single-thumb"
                    max={10}
                    type="range"
                    value={range}
                    step={1}
                    onInput={(e) => {
                      setRange(e)

                    }}
                    thumbsDisabled={[true, false]}
                  // rangeSlideDisabled={true}
                  /> */}
                    <input
                      id="steps-range"
                      type="range"
                      min="0"
                      max={rangeMax}
                      value={range}
                      step="1"
                      className="w-full h-2 bg-purple-500 rounded-lg appearance-none cursor-pointer"
                      onChange={(e) => {
                        setRange(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="flex justify-between">
                    <h4>0</h4>

                    <h4>{rangeMax}</h4>
                  </div>
                </div>
              </div>
              <div className="text-center w-96 text-[#2a3f5f]  player-select">
                <select
                  className=" player-list selector-mobile w-full  greater py-3 bg-lightGray px-9 rounded mt-6"
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
                  onClick={handleSubmitOutsideFormik}
                  className="bg-black text-white px-5 my-4 py-2 rounded"
                >
                  run
                </button>
              </div>
            </div>

            <div className="grid  sm:grid-cols-1 md:grid-cols-2 gap-6 md:mt-20 sm:mt-0">
              <div className="flex justify-center items-center w-full">
                <div className="pt-10">
                  <p className="text-6xl	 ev-text text-center my-3 text-[#2a3f5f] ">
                    expected probability of event occurring
                  </p>
                  <div className="flex justify-center">
                    {evalData?.length > 0 && (
                      <img src={evalData[1] + `?new=${new Date()}`}></img>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <p className="text-6xl	 ev-text text-center my-3 text-[#2a3f5f] ">
                  fair value estimate for odds of event occurring
                </p>
                <div className="flex justify-center items-center w-full counter-mobile">
                  <h1 className="text-5xl font-extrabold mt-5 md:pt-20  sm:pt-0">
                    {evalData[3] > 0 && "+"}
                    <CountUp end={evalData[2]} />
                    <span className="text-lg font-semibold mx-3">
                      or better
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className=""></div>
        )}
      </div>
    </div>
  );
};

export default Expected;
