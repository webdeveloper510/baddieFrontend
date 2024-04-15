import React, { useEffect, useState } from "react";
import { getAdminDashboard, getUserList, userStatusChange } from "../../../api";
import Apploader from "../../../component/Apploader";
import { capitalizeAllWords } from "../../../utitls/helperFuntions";
import DataTable from "react-data-table-component";

const UserLsit = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [mode, setMode] = useState("test");
  const [isOpen, setIsOpen] = useState(false);

  const handleMode = (mode) => {
    setMode(mode);
    setIsOpen(false);
  };
  const handelStatus = async (id, status) => {
    console.log(id, status);
    try {
      const { data } = await userStatusChange({ id, status });
      console.log("🚀 ~ handelStatus ~ data:", data);
      const latestData = [...users].map((item) => {
        if (item.id == id) {
          item.is_active = !status;
        }
        console.log("🚀 ~ latestData ~ item:", item);
        return item;
      });
      console.log("🚀 ~ latestData ~ latestData:", latestData);
      setUsers(latestData);
    } catch (error) {
      alert("There is some error");
    }
  };
  const onLoad = async () => {
    try {
      setLoader(true);
      const { data } = await getUserList({ mode: mode });
      console.log("🚀 ~ onLoad ~ data:", data);
      setUsers(data);
      console.log("🚀 ~ onLoad ~ data.latest_transactions:", data);
      setLoader(false);
    } catch (error) {
      alert("There is some error");
      setLoader(false);
    }
  };
  useEffect(() => {
    onLoad();
  }, [mode]);
  const column = [
    {
      name: "Id",
      sortable: true,
      selector: (row) => {
        return row["id"];
      },
      minWidth: "50px",
    },
    // {
    //     "name": "User Id",
    //     "sortable": true,
    //     selector: row => {
    //       return row[key]
    //     },
    //     "minWidth": "150px"
    // },
    // {
    //     "name": "Subscription Id",
    //     "sortable": true,
    //     selector: row => {
    //       return row["subscription_id"]
    //     },
    //     "minWidth": "150px"
    // },
    {
      name: "Email",
      sortable: true,
      selector: (row) => {
        return row["email"];
      },
      minWidth: "100px",
    },
    {
      name: "First Name",
      sortable: true,
      selector: (row) => {
        return row["firstname"];
      },
      minWidth: "150px",
    },
    {
      name: "lastname",
      sortable: true,
      selector: (row) => {
        return row["lastname"];
      },
      minWidth: "150px",
    },
    {
      name: "State",
      sortable: true,
      selector: (row) => {
        return row["state"];
      },
      minWidth: "150px",
    },
    {
      name: "Subscription",
      sortable: true,
      selector: (row) => {
        return capitalizeAllWords(row?.subscription?.subscription_type);
      },
      minWidth: "150px",
    },
    {
      name: "Is Active",
      sortable: true,
      selector: (row) => {
        if (row["is_active"] == true) {
          return (
            <>
              <button
                onClick={() => {
                  handelStatus(row.id, true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="26"
                  fill="currentColor"
                  className="bi bi-toggle2-on text-green-600"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 5H3a3 3 0 0 0 0 6h4a5 5 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416q.235-.537.584-1" />
                  <path d="M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0" />
                </svg>
              </button>
            </>
          );
        } else {
          return (
            <>
              <button
                onClick={() => {
                  handelStatus(row.id, false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="26"
                  fill="currentColor"
                  className="bi bi-toggle2-off text-red-600"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 11c.628-.836 1-1.874 1-3a4.98 4.98 0 0 0-1-3h4a3 3 0 1 1 0 6z" />
                  <path d="M5 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8m0 1A5 5 0 1 0 5 3a5 5 0 0 0 0 10" />
                </svg>
              </button>
            </>
          );
        }
      },
      minWidth: "150px",
    },

    // {
    //     "name": "Created At",
    //     "sortable": true,
    //     selector: row => {
    //       return row[key]
    //     },
    //     "minWidth": "150px"
    // },
    // {
    //     "name": "Updated At",
    //     "sortable": true,
    //     selector: row => {
    //       return row[key]
    //     },
    //     "minWidth": "150px"
    // }
  ];
  if (loader) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Apploader size={80} />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#e5ebfae5] p-5">
      <div className=" p-4 flex flex-col items-center">
        <div className="w-full my-4 zaddie-text bg-lightgray [letter-spacing:5px] sm:text-lg  p-4 text-center rounded-xl md:text-4xl font-bold">
          User List
        </div>
        <div className="inline-block !text-end ml-auto mb-3">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-greyLight focus:ring-offset-2 focus:ring-offset-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {mode == "live" ? "Live" : "Test"}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 8.293a1 1 0 011.414 0L10 9.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-2 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 text-left">
                <button
                  onClick={() => handleMode("live")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Live
                </button>
                <button
                  onClick={() => handleMode("test")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Test
                </button>
              </div>
            </div>
          )}
        </div>
        <DataTable
          className=""
          style={{
            overflow: "visible !important",
          }}
          columns={column}
          data={users}
          highlightOnHover
          pagination
          paginationPerPage={25}
          // paginationComponentOptions={paginationOptions}
          // paginationRowsPerPageOptions={[10, 20, 50, 100]}
        />
      </div>
    </div>
  );
};

export default UserLsit;
