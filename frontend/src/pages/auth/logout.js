import axios from "axios";
import {BiLogOut} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

function Logout(){
    const navigate = useNavigate();
    const getuser = JSON.parse(localStorage.getItem("auth")).user;
    const data = getuser.username;
    const handleLogingUserOut = () => {
        console.log("logout run")
    //   let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

    //   let  header_values = {
    //     baseURL: BASE_URL_DEV,
    //     }
    //     const data = {}
        
    //     axios.post("/logout/", data, header_values)
    //     .then((res) => {
    //         console.log(res);
    //         updateUserOnlineStatus(false)
    //         localStorage.removeItem("auth");
    //         navigate("/");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    }
    

    return <Link onClick={handleLogingUserOut} >Logout<BiLogOut className='inline-block ml-2' /></Link>

}


export default Logout