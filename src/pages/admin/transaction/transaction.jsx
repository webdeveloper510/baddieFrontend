import React, { useEffect, useState } from 'react'
import { getTransactions  } from '../../../api';
import Apploader from '../../../component/Apploader';
import { capitalizeAllWords } from '../../../utitls/helperFuntions';
import DataTable from "react-data-table-component";

const TransactionList = () => {
   
    const [transaction, setTransaction] = useState([])
    const [loader, setLoader] = useState(false);

    const onLoad = async () => {
        try {
            setLoader(true);
            const { data } = await getTransactions();
            console.log("🚀 ~ onLoad ~ data:", data)
            setTransaction(data)
            console.log("🚀 ~ onLoad ~ data.latest_transactions:", data)
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
            style:{
                maxWidth:"10px"
            }
        },
        {
            "name": "User Name",
            "sortable": true,
            selector: row => {
              return row.user.firstname + " " + row.user.lastname
            },
            "minWidth": "150px"
        },
        {
            "name": "User Email",
            "sortable": true,
            selector: row => {
              return row.user.email
            },
            "minWidth": "150px"
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
        <div className='min-h-screen bg-[#e5ebfae5] p-5'>

            <div className=' p-4 flex flex-col items-center'>
                <div className="w-full my-4 zaddie-text bg-lightgray [letter-spacing:5px] sm:text-lg  p-4 text-center rounded-xl md:text-4xl font-bold">
                    Transactions List
                </div>
                <DataTable
                    className=""
                    style={{
                        overflow: "visible !important"
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
    )
}

export default TransactionList