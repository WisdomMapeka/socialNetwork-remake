// import {data2} from "./mockData2"
import { useState, useEffect } from "react";
import {BsArrowLeft, BsArrowsFullscreen, BsInbox} from "react-icons/bs";
import axios from "axios";
// import { getAccessRfreshUserValues } from '../utils';
import { useNavigate } from "react-router-dom";

// This component displays the list of users that have just send messages that are BsInbox.
// It is displayed when a user click messages on the left side , Next to friends .
function Messages(){
    const [userchatlist, setUserchatlist] = useState("")
    // let userValues = getAccessRfreshUserValues();
    let navigate = useNavigate()

    // let data_params = {
    //   user: userValues.user.user
    // }

  let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

  let  header_values = {
    baseURL: BASE_URL_DEV,
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   "Authorization" : "Bearer " + userValues.access
    //   },
    //   params: {user: userValues.user.user}
    }

    const handleChat = (item) => {
      console.log("Messages.js ------------handle chat item ------------")
      let chatparties =JSON.parse(localStorage.getItem("chatParticipants"))
      chatparties.friend_id = item.sender
      chatparties.friend_details.user = item.sender
      chatparties.friend_details.username = item.sender_username
      chatparties.friend_details.first_name = item.sender_first_name
      chatparties.friend_details.last_name = item.sender_last_name
      chatparties.friend_details.email = item.sender_email
      chatparties.friend_details.profile_picture = item.sender_profile_picture
      chatparties.friend_details.location = ""
      chatparties.friend_details.dateOfBirth = ""
      chatparties.friend_details.religion = ""
      chatparties.friend_details.hobbies = ""
      localStorage.setItem("chatParticipants", JSON.stringify(chatparties))
      navigate("/messages")
    } 


    useEffect(
        () => {
          // ----------------------
          axios.get("/chatlist", header_values)
          .then((res) => {
            // console.log("-----------Messages chatlist-------------")
            setUserchatlist(res.data)
            // console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
          // --------------------
        }, []
    )
    
  


    var all_messages =  <div className='relative bg-slate-20 shadow'> 
                            <div className='w-full h-96 overflow-scroll overscroll-none no-scrollbar rounded-xl scroll-smooth   mx-auto flex flex-col items-center max-w-[700px]  p-0 mt-3 shadow '>
                                  {userchatlist.length && userchatlist.map((item) => (
                                    <div key={item.id} onClick={() => handleChat(item)} className='w-full  px-2 mt-1 cursor-pointer hover:scale-105 ease-in-out duration-300'>
                                        <div className='flex my-2 w-full'>
                                            <div className='h-[30px] w-[30px] flex items-center justify-center rounded-[30px] border border-solid border-gray-900 p-0 overflow-hidden bg-green-700'>
                                                <img src={item.sender_profile_picture} alt='/' className='h-[95%] w-[95%] rounded-[95%]'/>
                                            </div>
                                            <div className='break-all ml-3'>
                                                <div className='text-xs'>{item.sender_name}</div>
                                                
                                                <div className='text-xs'><span className='inline-block h-2 w-2 rounded-lg bg-green-700'></span>{item.message}</div>
                                            </div>
                                        </div>        
                                    </div>
                                  
                                  ))}
                                </div>
                        </div>



    return (
        <>
        {all_messages  }
        </>
      );
    }

export default Messages;