import axios from "axios";
import {BiLogOut} from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';


// function CheckUserLoginStatus({ children }) {
//   const { user } = JSON.parse(localStorage.getItem("auth"));
//   return user ? <>{children}</> : <Navigate to="/login/" />;
//   }


function CheckUserLoginStatus(){
  // console.log("CheckuserLoginstatus run");
  try {
    const data = JSON.parse(localStorage.getItem("auth"))  ;
    if (data.user !== null){
        return true
     }
    
  } catch (error) {
    console.log("User is logged out. If you want more information about the error. Console.log(err) on checkLoginStatus.js")
    return false
  }
}

export default CheckUserLoginStatus