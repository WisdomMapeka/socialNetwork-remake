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

export default CheckUserLoginStatus