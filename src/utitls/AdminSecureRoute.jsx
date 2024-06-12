
import React, { useContext, useEffect } from 'react'
import {  useNavigate } from "react-router-dom";
import { userContext } from '../App';
import Apploader from '../component/Apploader';


function AdminSecureRoute({children}) {
    const navigate = useNavigate();
    const {user,setUser,appLoad} = useContext(userContext);
    useEffect(()=>{
        if(appLoad){
            console.log("🚀 ~ SecureRoute ~ user:", user)
            if(!user){
                navigate("/signin")
            }
            if(user && !user?.is_admin){
                navigate("/")
            }
        }
    },[appLoad])
    if(!appLoad){
        <div className='w-full  h-[100vh] items-center justify-center'>
            <Apploader size={60}/>
        </div>
    }
    return children;

}

export default AdminSecureRoute