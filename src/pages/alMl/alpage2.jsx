import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useParams } from "react-router";
import { getDesiredPlot, getLookupData, getSegmentData } from "../../api";
import Apploader from "../../component/Apploader";
import DataTable from "react-data-table-component";
import { colors } from "../../utitls/constent";
import BarGraph from "../eda/Graph"


const Alpage2 = () => {
  const { type } = useParams();
  const [graphData, setGraphData] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [segmentFilterValue, setSegmentFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [segmentData, setSegmentData] = useState([]);
  const [lookupData, setLookupData] = useState([]);
  const [plotGraphData, setPlotData] = useState(["", ""]);
  const [loader, setLoader] = useState(false);
  const [names, setNames] = useState([]);
  const [columns1, setColumns1] = useState([]);
  const [columns2, setColumns2] = useState([]);

  // console.log("graphDatagraphData", graphData)
  const onLoad = async () => {
    try {
      setLoader(true);
      const [{ data }, { data: lData }, { data: plotData }] = await Promise.all(
        [
          getSegmentData({ segment_type: type }),
          getLookupData({
            segment_type: type,
          }),
          getDesiredPlot({
            player_type: type,
          }),
        ]
      );
      // console.log("🚀 ~ onLoad ~ plotData:", data);

      const newData = [];

      // Assuming data.segment is the array containing segment data
      for (let i = 0; i < data.segment.length; i++) {
        let obj = {};

        // Iterate over each key in the data object
        for (const key in data) {
          if (data.hasOwnProperty(key) && Array.isArray(data[key])) {
            // If the property is an array, assign the value at index i to the corresponding key
            obj[key] = data[key][i];
          }
        }

        // Push the constructed object to the newData array
        newData.push(obj);
      }
      // console.log("🚀 ~ onLoad ~ newData:", newData);

      setSegmentData(newData);
      const columns1Data = Object.keys(newData[0]).map((key, i) => {
        if (key == "segment") {
          return {
            name: "Segment",
            // selector: (row) => row?.segment,
            selector: (row) => {
              return row[key];
            },
            sortable: true,
            minWidth: "15px",
            // maxWidth: "none",
          };
        }
        return {
          name: key.replace(/_/g, " "), // Replace underscores with spaces for better readability
          selector: (row) => {
            if (!isNaN(parseFloat(row[key]))) {
              return parseFloat(row[key]).toFixed(3);
            }
            return row[key];
          }, // Dynamically select the value based on the current key
          sortable: true,
          minWidth: "150px",

          // maxWidth: "none",
        };
      });
      setColumns1(columns1Data);

      const dataArray = [];
      for (let i = 0; i < lData.segment.length; i++) {
        let obj = {};

        // Iterate over each key in the lData object
        for (const key in lData) {
          if (lData.hasOwnProperty(key) && Array.isArray(lData[key])) {
            // If the property is an array, assign the value at index i to the corresponding key
            obj[key] = lData[key][i];
          }
        }

        // Push the constructed object to the newData array
        dataArray.push(obj);
      }
      // console.log("🚀 ~ onLoad ~ dataArray:", dataArray);

      setLookupData(dataArray);
      setFilteredData(dataArray);
      const columns2Data = Object.keys(dataArray[0]).map((key, i) => {
        if (key == "segment") {
          return {
            name: "Segment",
            // selector: (row) => row?.segment,
            cell: (row) => {
              const value = row.segment;
              let bg_color = "";
              let index = parseInt(value) - 1; // Convert value to integer and adjust for zero-based indexing

              // Check if index is within bounds of the array
              if (index >= 0 && index < colors.length) {
                bg_color = colors[index];
              }

              return (
                <div
                  className={`${bg_color} w-full h-full text-black font-bold text-center p-2`}
                >
                  {value}
                </div>
              );
            },
            selector: (row) => {
              return row[key];
            },
            minWidth: "15px",
            sortable: true,
            // maxWidth: "none",
          };
        }
        return {
          name: key.replace(/_/g, " "), // Replace underscores with spaces for better readability
          selector: (row) => {
            if (!isNaN(parseFloat(row[key]))) {
              return parseFloat(row[key]).toFixed(3);
            }
            return row[key];
          }, // Dynamically select the value based on the current key
          sortable: true,
          minWidth: "150px",
          // maxWidth: "none",
        };
      });
      // console.log("🚀 ~ columns2Data ~ columns2Data:", plotData);

      setColumns2(columns2Data);
      setPlotData(plotData);
      setGraphData(plotData)
      // setGraphData(plotData)
      setLoader(false);
    } catch (error) {
      alert("There is some error");
      setLoader(false);
    }
  };
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
  };

  const desiredPlot = () => {
    if(type){
      getDesiredPlot({
        player_type: type,
      }).then((res)=>{
        // console.log("plot response", res)
        setGraphData(res)
      }).catch((error)=>{
        console.log(error)
      })
    }   
  }

  const handleSegmentFilterChange = (event) => {
    const value = event.target.value;
    setSegmentFilterValue(value);
  };
  const handleFilter = () => {
    // console.log("filter ==============>>>>>", filterValue, segmentFilterValue);
    const filtered = lookupData.filter(
      (item) =>
        item["Player Name"].toLowerCase().includes(filterValue.toLowerCase()) &&
        item.segment
          .toString()
          .toLowerCase()
          .includes(segmentFilterValue.toLowerCase())
    );
    setFilteredData(filtered);
  };
  useEffect(handleFilter, [filterValue, segmentFilterValue]);

  useEffect(() => {
    onLoad();
    desiredPlot()
  }, []);

  if (loader) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Apploader size={80} />
      </div>
    );
  }
  return (
    <div className="flex flex-col px-4">
      <div className="text-center">
        <h4 className="text-white page-title text-center font-bold mb-4">
          {type.charAt(0).toUpperCase() + type.slice(1)} segmentation Model
        </h4>
        <p className="text-white page-desc text-center  mb-4">
          {type == "pitcher"
            ? "uncover pitcher groups that share similar characteristics & examine performance"
            : "take a look at batter clusters to unearth hidden insights & trends"}
        </p>
      </div>
      <div className="bg-white w-full flex flex-col segment-outer px-[33px] py-10  text-xl">
        <Tabs>
          <TabList className="flex justify-around">
            <Tab className="bg-lightgray text-center lowercase  [letter-spacing:5px] segment-info md:px-20 py-2 focus:outline-none focus:border focus:border-orange-600  cursor-pointer">
              Segment Info
            </Tab>
            <Tab className="bg-lightgray text-center lowercase [letter-spacing:5px] segment-info md:px-20 py-2 focus:outline-none focus:border focus:border-orange-600  cursor-pointer">
              Player Lookup
            </Tab>
          </TabList>

          <TabPanel>
            <div>
              <div className="w-full difference lowercase [letter-spacing:5px] bg-gray p-4 mt-20 mb-5 text-center rounded-xl text-2xl ">
                Segment differences
              </div>

              <div className="max-h-[80vh] overflow-auto">
                <DataTable
                  className="table1"
                  style={{
                    overflow: "visible !important",
                  }}
                  columns={columns1}
                  data={segmentData}
                  highlightOnHover
                  // pagination
                  // paginationPerPage={25}
                  // paginationComponentOptions={paginationOptions}
                  // paginationRowsPerPageOptions={[10, 20, 50, 100]}
                />
              </div>
              <span className="w-full difference lowercase  test-gray mt-16 text-sm">
                current YTD stats show {new Date().getFullYear() - 1} season
                stats; current season stats will show once models are updated
                for {new Date().getFullYear()}{" "}
              </span>
              <div className="mt-5 text-center ">
                <div>
                  {graphData?.data?.bar1 && (
                    <div className="grid md:grid-cols-2 sm:grid-cols-1">
                  
                       <BarGraph
                        data={JSON.parse(graphData?.data?.bar1)}
                        config={{ responsive: true }}
                      />
                      <BarGraph
                        data={JSON.parse(graphData?.data?.bar2)}
                        config={{ responsive: true }}
                      /> 
                      {/* <img className="md:w-[47%] sm:w-full"  src={plotGraphData[0] + `?new=${new Date()}`} alt="" /> */}
                      {/* <img className="md:w-[47%] sm:w-full" src={plotGraphData[1] + `?new=${new Date()}`} alt="" /> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="my-6 flex ">
              <input
                type="text"
                placeholder="Filter by name"
                value={filterValue}
                onChange={handleFilterChange}
                className="w-1/3  px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 mr-2"
              />
              <input
                type="text"
                placeholder="Filter by segment"
                value={segmentFilterValue}
                onChange={handleSegmentFilterChange}
                className="w-1/3  px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-20 max-h-[80vh] overflow-scroll">
              <DataTable
                className="table"
                style={{
                  overflow: "visible !important",
                }}
                columns={columns2}
                data={filteredData}
                highlightOnHover
                striped={false}
                // pagination
                // paginationPerPage={25}
                // paginationComponentOptions={paginationOptions}
                // paginationRowsPerPageOptions={[10, 20, 50, 100]}
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Alpage2;
