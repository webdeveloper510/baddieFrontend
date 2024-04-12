
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
                {!user.is_admin ?<>
                   <Link to="/picks-analysis">
                        <button className={`${location.pathname.includes("picks-analysis") ? "bg-white text-black" : "bg-lightblue text-white"} mx-2 whitespace-nowrap py-1 px-4 rounded`}> picks & analysis</button>
                    </Link>
                    <Link to={user?.status == "active" ? "/eda" : "/payment"}>
                        <button className={`${location.pathname.includes("eda") ? "bg-white text-black" : "bg-lightblue text-white"} whitespace-nowrap mx-2 py-1 px-4 rounded`}> player/team EDA</button></Link>
                    <Link to={user?.status == "active" ? "/expected-value" : "/payment"}>
                        <button className={`${location.pathname.includes("expected-value") ? "bg-white text-black" : "bg-lightblue text-white"} whitespace-nowrap mx-2 py-1 px-4 rounded`}> EV calculator</button>
                    </Link>
                    <Link to={user?.status == "active" ? "/al-ml" : "/payment"}>
                        <button className={`${location.pathname.includes("al-ml") ? "bg-white text-black" : "bg-lightblue text-white"} whitespace-nowrap mx-2 py-1 px-4 rounded`} >AI & ML</button></Link>
                        </>:<>
                        <Link to="/picks-analysis">
                        <button className={`${location.pathname.includes("admin-dashboard") ? "bg-white text-black" : "bg-lightblue text-white"} mx-2 whitespace-nowrap py-1 px-4 rounded`}>Dashboard</button>
                    </Link>
                    <Link to="/user-list">
                        <button className={`${location.pathname.includes("user-list") ? "bg-white text-black" : "bg-lightblue text-white"} mx-2 whitespace-nowrap py-1 px-4 rounded`}>Users</button>
                    </Link>
                        </>}
                </div>
                <div className='mobile-inner'>

                </div>
            </div> : <></> 
            }
            <Sidebar className='sidebar-outer' style={{
                borderColor: '#1a1a1a !important',
            }} collapsed={show} backgroundColor="#1a1a1a">
                <Menu >
                    {!show ? <div className='px-3 my-20'>
                       {!user.is_admin ?<>
                        <Link to="/picks-analysis"><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("picks-analysis") ? "bg-white text-black" : "bg-greyLight text-white"} `}>
                            picks & analysis
                        </MenuItem>
                        </Link>
                        <Link to={user?.status == "active" ? "/eda" : "/payment"}><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("eda") ? "bg-white text-black" : "bg-greyLight text-white"} `}> player/team EDA </MenuItem></Link>
                        <Link to={user?.status == "active" ? "/expected-value" : "/payment"}><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("expected-value") ? "bg-white text-black" : "bg-greyLight text-white"} `}>  EV calculator </MenuItem></Link>

                        <Link to={user?.status == "active" ? "/al-ml" : "/payment"} ><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("al-ml") ? "bg-white text-black" : "bg-greyLight text-white"} `}>   AI & ML </MenuItem> </Link>
                        </>
                        :
                        <>
                        <Link to={user?.status == "active" ? "/admin-dashboard" : "/payment"} ><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("admin-dashboard") ? "bg-white text-black" : "bg-greyLight text-white"} `}>Dashboard</MenuItem> </Link>
                        <Link to={user?.status == "active" ? "/user-list" : "/payment"} ><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("user-list") ? "bg-white text-black" : "bg-greyLight text-white"} `}>Users</MenuItem> </Link>
                        </>}
                        
                    </div> : <></>}
                </Menu>
            </Sidebar>
        </>
    );
};

export default Sidebars;
