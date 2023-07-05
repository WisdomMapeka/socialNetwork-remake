import { useState, useEffect} from 'react';
import {RiMessengerLine} from 'react-icons/ri';
// import { getAccessRfreshUserValues } from '../utils';
// import { refreshAccessToken } from '../utils';
import axios from 'axios';
import globalVariables from '../../data/globalVariables';


let BASE_URL_DEV = globalVariables.BASE_URL_DEV

function MessagesList() {
  // const userValues = getAccessRfreshUserValues();
  let[recentmessagesdata, setRecentMessagesdata] = useState({});

  let BASE_URL_DEV = process.env.REACT_APP_BASE_URL_DEV;
  let loginuser = JSON.parse(localStorage.getItem("auth"))
  // console.log(BASE_URL_DEV)

  let  header_values = {
    baseURL: BASE_URL_DEV,
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   Authorization: "Bearer " + userValues.access
    //   },
      params: {user: loginuser.user.user}
    }


  /* 
  This fetches the messages from the database, the recent messages and the people 
  that have sent those messages. This list is what is shown on the left. 
  */
  useEffect(
      () => {
         axios.get("/messageslist", header_values)
        .then((res) => {setRecentMessagesdata( res.data.recent_messages)})
        .catch((err) => {
                console.log(err.request.response)
                // refreshAccessToken()
            }
        )
      }
    ,[]
  )


/* When a user click on a different chat, this updates the chartpersons in the local 
storage and redirect the user to a new chat page with the selected chatperson messages.

The function first checks if the chatID exists by making a post request to the backend
on the endpoint checkchatid , which returns the chatid to be used.

The notes about how it does that is on the endpoint it self. In the file chat/vewsets
*/
  const startChat = (user) => {

    const data = {
      "starterID":loginuser.user.user,
      "receiverID":user.user
  }
  
  let  header_values = {
      baseURL: BASE_URL_DEV,
      headers: {
          // "Content-Type": "multipart/form-data",
          },
      }
  
      axios.post("/checkchatid/", data, header_values)
      .then((res) => {
              let chatpersons = {chatStarter:loginuser.user, chatReceiver:user, chatid:res.data}
              localStorage.setItem("chatpersons", JSON.stringify(chatpersons))
              console.log(chatpersons)
              window.location.href = "/chat/"
      })
      .catch((err) => {
          console.log(err.request.responseText)
      })
  }
  // -----------------------------------------------------------

//  console.log(recentmessagesdata)
  return (
    <>
      <div className='relative'>
        <div className='mt-12 p-3 border-b-2 border-gray-200 '>Chats</div>
          <div
            className='w-full h-auto overflow-scroll no-scrollbar rounded-xl scroll-smooth   mx-auto flex flex-col items-center max-w-[700px]  p-0 mt-3 shadow '
          >
            
            {recentmessagesdata.length && recentmessagesdata.map((item) => {
              
              return(
              <div key={item.id} className='w-full  px-2 mt-1 shadow  cursor-pointer hover:scale-105 ease-in-out duration-300' onClick={() => startChat(item.sender)} >
                  <div className='flex my-2 w-full'>
                      <div className='h-[30px] w-[30px] flex items-center justify-center rounded-[30px] border border-solid border-gray-900 p-0 overflow-hidden bg-green-700'>
                          <img src={item.sender.profile_picture} alt='/' className='h-[95%] w-[95%] rounded-[95%]'/>
                      </div>
                      <div className='break-all ml-3'>
                          <div className='text-sm'>{item.sender.first_name + " " + item.sender.last_name} </div>
                          <div className='text-xs text-gray-700'>{item.message}</div>
                      </div>
                  </div>
              </div>
              ) 
            })}
        </div>
      </div>
    </>
  );
}








export default MessagesList;





