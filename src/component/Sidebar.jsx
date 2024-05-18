
import { useContext } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { userContext } from '../App';

const Sidebars = ({ show, setShow }) => {
    const { user } = useContext(userContext);
    const location = useLocation()
    return (
        <>
            {!show ?
                <div className='sidebar-mobile'>
                    <div className='mobile-inner scrollbar-hide mb-5'>
                        {user && user?.is_admin ?
                            <>
                                <Link to="/picks-analysis">
                                    <button className={`${location.pathname.includes("admin-dashboard") ? "bg-white text-black" : "bg-lightblue text-white"} mx-2 whitespace-nowrap py-1 px-4 rounded`}>Dashboard</button>
                                </Link>
                                <Link to="/user-list">
                                    <button className={`${location.pathname.includes("user-list") ? "bg-white text-black" : "bg-lightblue text-white"} mx-2 whitespace-nowrap py-1 px-4 rounded`}>Users</button>
                                </Link>
                                <Link to="/transaction-list">
                                    <button className={`${location.pathname.includes("transaction-list") ? "bg-white text-black" : "bg-lightblue text-white"} mx-2 whitespace-nowrap py-1 px-4 rounded`}>Transactions</button>
                                </Link>
                            </> : <>
                                <Link to="/picks-analysis">
                                    <button className={`${location.pathname.includes("picks-analysis") ? "bg-white text-black" : "bg-lightblue text-white"} mx-2 whitespace-nowrap py-1 px-4 rounded`}> picks & analysis</button>
                                </Link>
                                <Link to={user?.status == "active" ? "/new-eda" : "/payment"}>
                                    <button className={`${location.pathname.includes("new-eda") ? "bg-white text-black" : "bg-lightblue text-white"} whitespace-nowrap mx-2 py-1 px-4 rounded`}> player/team EDA</button></Link>
                                <Link to={user?.status == "active" ? "/expected-value" : "/payment"}>
                                    <button className={`${location.pathname.includes("expected-value") ? "bg-white text-black" : "bg-lightblue text-white"} whitespace-nowrap mx-2 py-1 px-4 rounded`}> EV calculator</button>
                                </Link>
                                <Link to={user?.status == "active" ? "/al-ml" : "/payment"}>
                                    <button className={`${location.pathname.includes("al-ml") ? "bg-white text-black" : "bg-lightblue text-white"} whitespace-nowrap mx-2 py-1 px-4 rounded`} >AI & ML</button></Link>
                            </>

                        }
                    </div>
                    <div className='mobile-inner'>

                    </div>
                </div> : <></>
            }
            {/* <Sidebar className='sidebar-outer' style={{
                borderColor: '#1a1a1a !important',
            }} collapsed={show} backgroundColor="#1a1a1a">
                <Menu >
                    {!show ? <div className='px-3 my-20'>
                        {user && user?.is_admin ?
                            <>
                                <Link to={"/admin-dashboard"} ><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("admin-dashboard") ? "bg-white text-black" : "bg-greyLight text-white"} `}>Dashboard</MenuItem> </Link>
                                <Link to={"/user-list"} ><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("user-list") ? "bg-white text-black" : "bg-greyLight text-white"} `}>Users</MenuItem> </Link>
                                <Link to={"/transaction-list"} ><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("transaction-list") ? "bg-white text-black" : "bg-greyLight text-white"} `}>Transaction</MenuItem> </Link>
                            </>:
                             <>
                             <Link to="/picks-analysis"><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("picks-analysis") ? "bg-white text-black" : "bg-greyLight text-white"} `}>
                                 picks & analysis
                             </MenuItem>
                             </Link>
                             <Link to={user?.status == "active" ? "/new-eda" : "/payment"}><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("new-eda") ? "bg-white text-black" : "bg-greyLight text-white"} `}> player/team EDA </MenuItem></Link>
                             <Link to={user?.status == "active" ? "/expected-value" : "/payment"}><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("expected-value") ? "bg-white text-black" : "bg-greyLight text-white"} `}>  EV calculator </MenuItem></Link>
 
                             <Link to={user?.status == "active" ? "/al-ml" : "/payment"} ><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("al-ml") ? "bg-white text-black" : "bg-greyLight text-white"} `}>   AI & ML </MenuItem> </Link>
                         </>}

                    </div> : <></>}
                </Menu>
            </Sidebar> */}
        </>
    );
};

export default Sidebars;
