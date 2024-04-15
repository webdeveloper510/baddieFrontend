import React, { useEffect, useState } from 'react'
import { getAdminDashboard } from '../../../api';
import Apploader from '../../../component/Apploader';
import { capitalizeAllWords } from '../../../utitls/helperFuntions';
import DataTable from "react-data-table-component";

const Admindashboard = () => {
    const [dashboardData, setDashboardData] = useState(null)
    const [transaction, setTransaction] = useState([])
    const [loader, setLoader] = useState(false);
    const [columns1, setColumns1] = useState([]);
    const onLoad = async () => {
        try {
            setLoader(true);
            const { data } = await getAdminDashboard();
            console.log("🚀 ~ onLoad ~ data:", data)
            setDashboardData(data)
            setTransaction(data.latest_transactions)
            console.log("🚀 ~ onLoad ~ data.latest_transactions:", data.latest_transactions)
         
            setLoader(false);
        } catch (error) {
            alert("There is some error");
            setLoader(false);
        }


    };
    useEffect(() => { onLoad() }, []);
    const column = [
        {
            "name": "Id",
            "sortable": true,
            selector: row => {
                return row["id"]
            },
            "minWidth": "50px"
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
            "name": "Transaction Id",
            "sortable": true,
            selector: row => {
                return row["transaction_id"]
            },
            "minWidth": "100px"
        },
        {
            "name": "Stripe Payment Id",
            "sortable": true,
            selector: row => {
                return row["stripe_payment_id"]
            },
            "minWidth": "150px"
        },
        {
            "name": "Amount",
            "sortable": true,
            selector: row => {
                return `${row["amount"]} ${row["currency"]}`
            },
            "minWidth": "150px"
        },

        {
            "name": "Date",
            "sortable": true,
            selector: row => {
                return row["date"]
            },
            "minWidth": "150px"
        },
        {
            "name": "Status",
            "sortable": true,
            selector: row => {
                return row["status"]
            },
            "minWidth": "150px"
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
    ]
    if (loader) {
        return <div className="w-full h-full flex items-center justify-center"><Apploader size={80} />
        </div>
    }
    return (
        <div className='min-h-screen bg-[#e5ebfae5] p-5 '>
            <div className='mt-12' >
            <div className="w-full my-4 zaddie-text bg-lightgray [letter-spacing:5px] sm:text-lg  p-4 text-center rounded-xl md:text-4xl font-bold">
                    Stats
                </div>
                <div className='grid grid-flow-col my-5 overflow-auto gap-3 earning-card'>
                    {[
                        {
                            key: "Total Users",
                            value: dashboardData?.users,
                            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person mx-5 mt-2 bg-gray rounded-full p-1 font-bold" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>)
                        },
                        {
                            key: "Total Earning",
                            value: dashboardData?.total_earnings,
                            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person mx-5 mt-2 bg-gray rounded-full p-1 font-bold" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>)
                        },
                        {
                            key: "Active Users",
                            value: dashboardData?.active_users,
                            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person mx-5 mt-2 bg-gray rounded-full p-1 font-bold" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>)
                        },
                        {
                            key: "Total Subscribers",
                            value: dashboardData?.subscribed_users,
                            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person mx-5 mt-2 bg-gray rounded-full p-1 font-bold" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>)
                        },
                        {
                            key: "Monthly Subscribers",
                            value: dashboardData?.monthly_users,
                            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person mx-5 mt-2 bg-gray rounded-full p-1 font-bold" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>)
                        },
                        {
                            key: "Seasonally Subscribers",
                            value: dashboardData?.season_users,
                            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person mx-5 mt-2 bg-gray rounded-full p-1 font-bold" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>)
                        },
                       
                    ].map(({ key, value, icon }) => (
                        <div className='mx-3 flex py-1 px-1 w-64 bg-white shadow-xl  rounded-xl h-24 justify-start'>
                            <div className='flex justify-center items-center'>
                                {icon}
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <p className='font-bold'>{key}</p>
                                <h1>{value}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-10  md:mt-20 p-4 flex flex-col items-center'>
                <div className="w-full my-4 zaddie-text bg-lightgray [letter-spacing:5px] sm:text-lg  p-4 text-center rounded-xl md:text-4xl font-bold">
                    Latest Transactions
                </div>
                <DataTable
                    className=""
                    style={{
                        overflow: "visible !important"
                    }}
                    columns={column}
                    data={transaction}
                    highlightOnHover
                // pagination
                // paginationPerPage={25}
                // paginationComponentOptions={paginationOptions}
                // paginationRowsPerPageOptions={[10, 20, 50, 100]}
                />
            </div>
        </div>
    )
}

export default Admindashboard