
import { useContext } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { userContext } from '../App';

const Sidebars = ({show, setShow}) => {
    const {user} = useContext(userContext);
    const location = useLocation()
    return (
        <>
            <Sidebar style={{
                borderColor: '#1a1a1a !important',
            }} collapsed={show} backgroundColor="#1a1a1a">
                <Menu >
                    {!show ? <div className='px-3 my-20'>
                        <Link to="/picks-analysis"><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("picks-analysis") ? "bg-white text-black" : "bg-greyLight text-white"} `}>
                            picks & analysis
                        </MenuItem>
                        </Link>
                        <Link to={user?.status == "active"?"/eda":"/payment"}><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("player/team EDA") ? "bg-white text-black" : "bg-greyLight text-white"} `}> player/team EDA </MenuItem></Link>
                        <Link to={user?.status == "active"?"/expected-value":"/payment"}><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("expected-value") ? "bg-white text-black" : "bg-greyLight text-white"} `}>  EV calculator </MenuItem></Link>

                        <Link to={user?.status == "active"?"/al-ml":"/payment"} ><MenuItem className={`mt-2 font-semibold text-center hover:text-black hover:white ${location.pathname.includes("al-ml") ? "bg-white text-black" : "bg-greyLight text-white"} `}>   AI & ML </MenuItem> </Link>
                    </div> : <></>}
                </Menu>
            </Sidebar>
        </>
    );
};

export default Sidebars;
