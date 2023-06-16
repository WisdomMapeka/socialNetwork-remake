import axios from "axios";
import {BiLogOut} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';

function CheckUserLoginStatus(){
//   console.log("CheckuserLoginstatus run");
  try {
    const data = JSON.parse(localStorage.getItem("auth"))  ;
    // console.log(data.access)
    // console.log(localStorage.length)
    if (data.access && data.refresh){
        return true
     }
    
  } catch (error) {
    // console.log("User is logged out. If you want more information about the error. Console.log error on utils file")
    return false
  }
  
   
    // console.log(getuser.username)
}


function Logout(){
    const navigate = useNavigate();
    // const getuser = JSON.parse(localStorage.getItem("auth")).user;
    // const data = getuser.username;
    const handleLogingUserOut = () => {
      let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

      let  header_values = {
        baseURL: BASE_URL_DEV,
        }
        const data = {}
        
        axios.post("/logout/", data, header_values)
        .then((res) => {
            // console.log(res);
            updateUserOnlineStatus(false)
            localStorage.removeItem("auth");
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        })
    }
    

    return  <li onClick={handleLogingUserOut} className="p-2 border-r">Logout<BiLogOut className='inline-block ml-2' /></li>
}

const getAccessRfreshUserValues = () =>{
    // console.log("get access run---------------------")
    
    const values = JSON.parse(localStorage.getItem("auth"))
    return values
}

const updateUserOnlineStatus = (online_status) =>{
  // console.log("utils.js updateUserOnlineStatus -------------------")
  const userValues = getAccessRfreshUserValues();
  const data  = {
    user: userValues.user.user,
    is_online : online_status
  }
  
  // console.log(userValues)
  // console.log(data)

   let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

   let  header_values = {
    baseURL: BASE_URL_DEV,
    }
  
  axios.post("/updateuseronlinestatus/", data, header_values)
  .then(
    (res) => {
      console.log(res)
    }
  )
  .catch((err) => {
    console.log(err)
  })
}
const refreshAccessToken = () => {
   let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

   let  header_values = {
    baseURL: BASE_URL_DEV,
    }
    const userValues = getAccessRfreshUserValues();
    axios.post("/token/refresh/", {"refresh":userValues.refresh}, header_values)
    .then((res) => {
        // console.log(res.data);
        userValues.access = res.data.access
        localStorage.setItem("auth", JSON.stringify(userValues))
        updateUserOnlineStatus(true)
    })
    .catch((err) => {console.log(err)})

}




// custo hook for the chat, it uses pollig or askig the server after every few secons if 
// the server have a mesage.
const useInterval = (callback, delay) => {

  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);


  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}



export {CheckUserLoginStatus, 
        Logout, 
        getAccessRfreshUserValues, 
        refreshAccessToken,
        useInterval,
        updateUserOnlineStatus};