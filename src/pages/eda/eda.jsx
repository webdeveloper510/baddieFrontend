import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import * as Yup from "yup";
import { GetPlayerApi, GetTeamApi, getEda, getEvalCal } from "../../api";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Apploader from "../../component/Apploader";

const Eda = () => {
  const [edaData, setEdaData] = useState(null)
  const [loader, setLoader] = useState(false);
  const [range, setRange] = useState(6);
 
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [metricType, setMetricType] = useState("");
  const [tab, setTab] = useState("KDASH");
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleInputChange(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }
  const [initialValues, setInitialValues] = useState({
    playerType: '',
    handedness: '',
    playerName: '',
    opposingTeam: '',
    type: "",
    time_frame: "TY + LY"
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
  const [playerType, setPlayerType] = useState("")
  const [team, setTeam] = useState([]);
  const [pitcher, setPitcher] = useState({
    player_name: ["player"],
    pitcher: ["pitcher"]
  });
  const handleSubmit = async (values, action) => {
    console.log("🚀 ~ handleSubmit ~ values:", values)
    // Handle form submission
    try {
      setInitialValues(values)
      setLoader(true);
      let stat_type = ""
      if (playerType === "pitcher") {
        stat_type = "pitching"
      }
      if (playerType === "batter") {
        stat_type = "batting"
      }
      const body = {
        stat_type,
        plyr_tm_id: playerType === "pitcher" ? pitcher.pitcher[parseInt(values.playerName)] : batter.batter[parseInt(values.playerName)],
        plyr_tm_name: values.opposingTeam,
        // player_name: playerType === "pitcher" ? pitcher.player_name[parseInt(values.playerName)] : batter.player_name[parseInt(values.playerName)],
        // metric_val: range.toString(),
        // prob_type: equality,
        // time_frame: values.time_frame,
        player_or_team: values.type,
        handedness: values.handedness,
      }
      console.log("🚀 ~ handleSubmit ~ body:", body)
      // console.log("🚀 ~ handleSubmit ~ body:", body)
      const newEvalData = await getEda(body);

      console.log("newEvalData =========>", newEvalData);
      // setEvalData(["","","",""]);
      setEdaData(newEvalData.data);
      setLoader(false);
    } catch (error) {
      alert("There is some error")
      setLoader(false);
    }
  };
  const [batter, setBatter] = useState(null);
  const onLoad = async () => {
    try {
      setLoader(true);
      const [teams, pitcherData, batterData] = await Promise.all([GetTeamApi(), GetPlayerApi("pitcher"), GetPlayerApi("batter")])

      setTeam(teams?.data?.team || []);
      setPitcher(pitcherData.data);
      setBatter(batterData.data);
      setLoader(false);
    } catch (error) {
      alert("There is some error");
      setLoader(false);
    }

  };
  useEffect(() => { onLoad() }, []);
  const formikRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSubmitOutsideFormik = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (!dropdownRef?.current?.contains(e?.target)) {
        setIsOpen(false)
      }
    })
  })


  if (loader) {
    return <div className="w-full h-full flex items-center justify-center"><Apploader size={80} />
    </div>
  }
  return (
    <div className="flex flex-col items-center w-[100%] bg-lightblack  px-4 min-w-full" >
      <div className="text-center">
        <h4 className="text-white page-title font-bold mb-4">
          player & team exploratory data analysis
        </h4>
        <p className="text-white page-desc mb-4">
          centralized data displays, key metrics & more - say less
        </p>
      </div>
      <div className="bg-white  m-auto flex flex-col px-20 main-section py-20 text-xl min-w-full">
        <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className={`grid grid-cols-5 gap-4 player-flex text-[#2a3f5f]`}>
                <div className="text-center col-span-2 player-select">
                  <Field
                    as="select"
                    className="py-3 my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="type"

                  >
                    <option disabled value="">player or team</option>
                    <option value="player">player</option>
                    <option value="team">team</option>
                  </Field>
                  <Field
                    as="select"
                    className="py-3 my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="handedness"
                    onChange={(e) => {
                      setMetricType(e.target.value);
                      setFieldValue("handedness", e.target.value);
                    }}
                  >
                    <option disabled value="">by handedness?</option>
                    {['yes', 'no'].map((item, i) => (
                      <option key={i} value={item}>{item}</option>
                    ))}
                  </Field>
                </div>
                <div className="text-center col-span-2 player-select">
                  <Field
                    as="select"
                    className="py-3 my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="playerType"
                    onChange={(e) => {
                      let newPlayerType = e.target.value;
                      // Reset the player name when player type changes
                      setFieldValue('playerName', '');
                      setFieldValue('playerType', newPlayerType);
                      setFieldValue()
                     
                      // Update the player type state
                      setPlayerType(newPlayerType);
                    }}
                  >
                    <option disabled value="">pitching or batting</option>
                    <option value="pitcher">pitching</option>
                    <option value="batter">batting</option>
                  </Field>
                  {values.type == 'player' && <>
                    <div className="flex items-center justify-center pt-5 pb-5">
                      <div className="relative group w-full" ref={dropdownRef}>
                        <button type="button" onClick={toggleDropdown} className=" py-3 player-list buttonPlayer  text-center focus:outline-none appearance-none inline-flex justify-center w-full px-4  text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm  ">
                          {values.playerName == "" ? 'player name' : <span className="mr-2">{playerType === "pitcher" ? pitcher.player_name[parseInt(values.playerName)] : batter.player_name[parseInt(values.playerName)]}</span>}

                        </button>
                        {values.playerType != "" && <div className={`absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${isOpen ? '' : 'hidden'} max-h-60  w-full`}>
                          <input onChange={handleInputChange} className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none" type="text"

                            placeholder="Search Player Name" autoComplete="off" />
                          <div className="overflow-y-auto max-h-40">
                            {playerType === "pitcher" && pitcher && (
                              pitcher.player_name.map((item, i) => (
                                item.toLowerCase().includes(searchTerm) && (
                                  <button type="button" onClick={() => {
                                    setFieldValue("playerName", `${i}`);
                                    toggleDropdown()
                                  }} key={i} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                                    {item}
                                  </button>
                                )
                              ))
                            )}
                            {playerType === "batter" && batter && (
                              batter.player_name.map((item, i) => (
                                item.toLowerCase().includes(searchTerm) && (
                                  <button type="button" onClick={() => {
                                    setFieldValue("playerName", i);
                                    toggleDropdown()
                                  }} key={i} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                                    {item}
                                  </button>
                                )
                              ))
                            )}
                          </div>

                        </div>}
                      </div>
                    </div>  </>}
                  {values.type == 'team' && <Field as="select"
                    className="py-3 my-5 player-list rounded w-full text-center focus:outline-none appearance-none"
                    name="opposingTeam">
                    <option disabled value="">opposing team</option>
                    {team.map((item, i) => {

                      return <option key={i} value={item}>{item}</option>
                    })}
                  </Field>}
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
        {edaData ? <>
          <div className="mt-5">
            <div>
              <button className={`${tab == "KDASH"? "bg-orange-600" :"bg-lightgray" } rounded-lg px-4 py-1 border-black border-2`} onClick={()=>{
                setTab("KDASH")
              }}>K Dash</button>
              <button className={`${tab == "HITS"? "bg-orange-600" :"bg-lightgray" } rounded-lg px-4 py-1 border-black border-2`}
               onClick={()=>{
                setTab("HITS")
              }}>Hits Dash</button>
            </div>
            <div>
              <div className="border-dashed border-2 border-greyLight w-full">
               <div className="text-center my-2">
               <h3 className="text-greyLight font-semibold">{`batting main dashboard for {player_name or team}`}</h3>
               </div>
                <div className="border-2 border-black  mb-10 mx-2" >
                  {tab == "KDASH" && 
                  <div className="grid grid-cols-3">
                    {edaData?.KDASH.map((item,i)=>{
                      return <img key={i} src={item +`?new=${new Date()}`}/>
                    })}
                  </div>
                  }
                   {tab == "HITS" && 
                   <>
                  <div className="grid grid-cols-3">
                    {edaData?.HITS_IMAGE[0]?.HITS.map((item,i)=>{
                      return <img key = {i} src={item  +`?new=${new Date()}`}/>
                    })}
                  </div>
                  <div className="grid grid-cols-3">
                  {Object.entries(edaData?.HITS_IMAGE[0]?.float_dict).map(([k,v],i)=>{
                    return <div  key = {i} className=" flex flex-col h-36 justify-evenly items-center">
                      <span className="text-3xl font-bold" >{k}</span>
                      <span className="text-3xl ">{v}</span>
                    </div>
                  })}
                </div>
                </>
                  }
                </div>
                <div className="border-2 border-black h-[400px] my-10 mx-2" ></div>
              </div>
            </div>
          </div>


        </> : <div className="">
        </div>}
      </div>

    </div>
  );
};

export default Eda;
