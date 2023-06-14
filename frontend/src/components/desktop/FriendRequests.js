import {data2} from "./mockData2"
import axios from "axios";
import { useEffect, useState } from "react";
import { getAccessRfreshUserValues } from "../utils";
import { refreshAccessToken } from "../utils";
import AlertMessage from '../Common/AlertMessage';

function FriendRequests(){
    
  const userValues = getAccessRfreshUserValues();
  let[friendrequestlistdata, setFriendRequestlistdata] = useState({});
  const[showalermessage, setShowalermessage] = useState({show:false, alertmessage:""});
  let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

  let  header_values = {
    baseURL: BASE_URL_DEV,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Authorization" : "Bearer " + userValues.access
      }
    
}

console.log(header_values.headers)

let user_data = {
  user: userValues.user.user
}

let handleAlertDisplay =  (messageText) => {
  setShowalermessage({show:true, alertmessage:messageText})
  setTimeout(() => { setShowalermessage({show:false, alertmessage:""}) }, 3000);
}
// details about why data is being sent like this is found on the friend's model

const memberId = ""
const acceptFriendRequest = (memberId) => {
  let add_friend_data = [{
    user: userValues.user.user,
    friend_id: memberId,
    status: "accepted",
    sent_receive: "request_sender"
      },
    {
      user: memberId,
      friend_id: userValues.user.user,
      status:"accepted",
      sent_receive: "request_receiver"
    }
  ]
  console.log(add_friend_data)

  axios.post("/friendrequests/", add_friend_data, header_values)
  .then((res) => {
      console.log(res.data)
      res.statusText.toLocaleLowerCase() === "created" ? handleAlertDisplay("Friend Request Accepted") : handleAlertDisplay(res.data);
    })
  .catch((err) => {
    // console.log(err.request.response)
    refreshAccessToken()
  }
    )
  
}



// console.log(data)
// console.log(userValues.access)


    // -------------------------
   useEffect(() => {
    axios.get(`${BASE_URL_DEV}/friendrequests/`, {headers : header_values.headers, params:user_data })
    .then((res) => {
      console.log("FriendRequests response ----------------------")
            setFriendRequestlistdata(res.data.frienrequests_list)
            // console.log(res.data.frienrequests_list)
          })
    .catch((err) => {
            // console.log(err.request)
            // console.log("runnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
            refreshAccessToken()
        }
    )

   }, [])
        
    // ------------------------
    
    console.log(friendrequestlistdata)

    return (
        <>
          <div className='relative bg-slate-20 shadow'>
          <div className="relative">{showalermessage.show === true ? <AlertMessage message={showalermessage} />: ""}</div>
            <div
              className='w-full h-96 overflow-scroll no-scrollbar rounded-xl scroll-smooth   mx-auto flex flex-col items-center max-w-[700px]  p-0 mt-3 shadow '
            >
            
              {friendrequestlistdata.length && friendrequestlistdata.map((item) => (
                <div key={item.id} className='w-full  px-2 mt-1 cursor-pointer hover:scale-105 ease-in-out duration-300'>
                    <div className='flex my-2 w-full'>
                        <div className='h-[30px] w-[30px] flex items-center justify-center rounded-[30px] border border-solid border-gray-900 p-0 overflow-hidden bg-green-700'>
                            <img src={item.friendrequests_details.first_name.profile_picture} alt='/' className='h-[95%] w-[95%] rounded-[95%]'/>
                        </div>
                        <div className='break-all ml-3'>
                            <div className='text-xs'>{item.friendrequests_details.first_name + " " + item.friendrequests_details.last_name} </div>
                            
                            <div className='text-xs'>{item.friendrequests_details.location}</div>
                            <div className='text-xs'>
                                <button onClick={() => acceptFriendRequest(item.friend_id)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-12 border-b-2 border-blue-700 hover:border-blue-500 rounded">
                                    accept
                                </button>
                            </div>
                        </div>
                    </div>
                    
                        
                </div>
               
              ))}
            </div>
          </div>
        </>
      );
}

export default FriendRequests;