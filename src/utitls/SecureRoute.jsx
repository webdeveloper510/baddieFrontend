
import React, { useContext } from 'react'
import { Navigate } from "react-router-dom";
import { userContext } from '../App';


function SecureRoute({children}) {
    const {user} = useContext(userContext);
    return !user ? <Navigate to="/signin" replace = {true} ></Navigate> : children;

}

export default SecureRoute