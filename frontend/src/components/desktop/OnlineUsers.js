import React, {useState, useEffect} from 'react';
import { data } from './mockData';
import axios from "axios";
import { getAccessRfreshUserValues } from '../utils';


function OnlineUsers() {
  const[onlineusers, setOnlineusers] = useState({})
  const userValues = getAccessRfreshUserValues();
  // console.log("online users ---------------------")
  // console.log(userValues)
  const userdata = {
    
  }

  let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

  let  header_values = {
    baseURL: BASE_URL_DEV,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Authorization" : "Bearer " + userValues.access
      },
      params: {user: userValues.user.user_id}
    }

  useEffect(
    () => {
        // -------------------------------------------
        axios.get("/onlineusers/", header_values)
        .then((res) => {
          // console.log(res.data)
          setOnlineusers(res.data)
        })
        .catch((err) => {console.log(err)})
        // ------------------------------------------
    }, []
  )
  
  // console.log(onlineusers)
  return (
    <>
      <div className='relative'>
        <div
          className='w-full h-96 overflow-scroll no-scrollbar rounded-xl scroll-smooth   mx-auto flex flex-col items-center max-w-[700px]  p-0 mt-3 shadow '
        >
        
          {onlineusers.length && onlineusers.map((item) => (
            <div key={item.details.user            } className='w-full  px-2 mt-1 shadow  cursor-pointer hover:scale-105 ease-in-out duration-300'>
                <div className='flex my-2 w-full'>
                    <div className='h-[30px] w-[30px] flex items-center justify-center rounded-[30px] border border-solid border-gray-900 p-0 overflow-hidden bg-green-700'>
                        <img src={item.details.profile_picture} alt='/' className='h-[95%] w-[95%] rounded-[95%]'/>
                    </div>
                    <div className='break-all ml-3'>
                        <div className='text-xs'>{item.details.first_name + " " + item.details.last_name} </div>
                        
                        <div className='text-xs'><span className='inline-block h-2 w-2 rounded-lg bg-green-700'></span>{ " " +item.location}</div>
                    </div>
                </div>
                
                    
            </div>
           
          ))}
        </div>
      </div>
    </>
  );
}








export default OnlineUsers;





