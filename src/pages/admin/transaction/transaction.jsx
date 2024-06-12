import React, { useEffect, useState } from "react";
import { getTransactions } from "../../../api";
import Apploader from "../../../component/Apploader";
import { capitalizeAllWords } from "../../../utitls/helperFuntions";
import DataTable from "react-data-table-component";

const TransactionList = () => {
  const [transaction, setTransaction] = useState([]);
  const [loader, setLoader] = useState(false);
  const [mode, setMode] = useState("test");
  const [isOpen, setIsOpen] = useState(false);

  const handleMode =(mode)=>{
    console.log("modesssssss", mode)
    setMode(mode)
    setIsOpen(false)
  }
  const onLoad = async () => {
    setLoader(true)
    try {
      setLoader(true);
      const { data } = await getTransactions({ mode: mode });
      console.log("🚀 ~ onLoad ~ data:++", data);
      setTransaction(data);
      console.log("🚀 ~ onLoad ~ data.latest_transactions:++", data);
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
      style: {
        maxWidth: "10px",
      },
    },
    {
      name: "User Name",
      sortable: true,
      selector: (row) => {
        return row.user.firstname + " " + row.user.lastname;
      },
      minWidth: "150px",
    },
    {
      name: "User Email",
      sortable: true,
      selector: (row) => {
        return row.user.email;
      },
      minWidth: "150px",
    },
    // {
    //     "name": "Subscription Id",
    //     "sortable": true,
    //     selector: row => {
    //       return row["subscription_id"]
    //     },
    //     "minWidth": "150px"
    // },
    {
      name: "Transaction Id",
      sortable: true,
      selector: (row) => {
        return row["transaction_id"];
      },
      minWidth: "100px",
    },
    {
      name: "Stripe Payment Id",
      sortable: true,
      selector: (row) => {
        return row["stripe_payment_id"];
      },
      minWidth: "150px",
    },
    {
      name: "Amount",
      sortable: true,
      selector: (row) => {
        return `${row["amount"]} ${row["currency"]}`;
      },
      minWidth: "150px",
    },

    {
      name: "Date",
      sortable: true,
      selector: (row) => {
        return row["date"];
      },
      minWidth: "150px",
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => {
        return row["status"];
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
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Apploader size={80} />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#e5ebfae5] p-5">
      <div className=" p-4 flex flex-col items-center">
        <div className="w-full my-4 zaddie-text bg-lightgray [letter-spacing:5px] sm:text-lg  p-4 text-center rounded-xl md:text-4xl font-bold">
          Transactions List
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
                  onClick={()=>handleMode("live")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Live
                </button>
                <button
                  onClick={()=>handleMode("test")}
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
          data={transaction}
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

export default TransactionList;
