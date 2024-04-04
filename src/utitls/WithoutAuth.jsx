
import React, { useContext } from 'react'
import { Navigate } from "react-router-dom";
import { userContext } from '../App';
import Header from '../component/header';
import Sidebars from '../component/Sidebar';


function WithoutAuth({children}) {
    const {user} = useContext(userContext);
    return user ? <Navigate to="/" replace = {true} ></Navigate> :  <>
    <Header show={show} setShow={setShow} />
    <div className="flex min-h-screen w-full bg-lightblack">
      <Sidebars show={show} setShow={setShow} />
      <div className="w-[94%] ">

         
                {children}
            
      </div>
    </div>
  </>;

}

export default WithoutAuth