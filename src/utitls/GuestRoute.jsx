
import React, { useContext, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { userContext } from '../App';


function Guest({children}) {
    const {user, setUser, appLoad} = useContext(userContext);
    // useEffect(()=>{})
    console.log("🚀 ~ Guest ~ user:", user)
    return user ? <Navigate to="/" replace = {true} ></Navigate> : children;

}

export default Guest