import React, {useState, useEffect} from 'react';
import { data } from './mockData';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { RiMessengerLine } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import { getAccessRfreshUserValues } from '../utils';
import axios from 'axios';
import { refreshAccessToken } from '../utils';
import AlertMessage from '../Common/AlertMessage';


function RecommendedPeopleSlider() {
  const userValues = getAccessRfreshUserValues();
  let[friendlistdata, setFriendlistdata] = useState({});
  const[showalermessage, setShowalermessage] = useState({show:false, alertmessage:""});

  let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

  let  header_values = {
    baseURL: BASE_URL_DEV,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Authorization" : "Bearer " + userValues.access
      },
      params: {user: userValues.user.user}
    }
  
    
    let handleAlertDisplay =  (messageText) => {
        setShowalermessage({show:true, alertmessage:messageText})
        setTimeout(() => { setShowalermessage({show:false, alertmessage:""}) }, 3000);
    }
// details about why data is being sent like this is found on the friend's model

const memberId = ""
const sendFriendRequest = (memberId) => {
  let add_friend_data = [{
    user: userValues.user.user,
    friend_id: memberId,
    status: "sent",
    sent_receive: "request_sender"
      },
    {
      user: memberId,
      friend_id: userValues.user.user,
      status:"pending",
      sent_receive: "request_receiver"
    }
  ]
  // console.log(add_friend_data)

  axios.post(`${BASE_URL_DEV}/friends/`, add_friend_data,   {headers : header_values.headers})
  .then((res) => {
    console.log(res.data)
    res.statusText.toLocaleLowerCase() === "created" ? handleAlertDisplay("Friend Request Sent") : handleAlertDisplay(res.data);
  }
    )
  .catch((err) => {
    console.log(err.request.response)
  }
    )
  
}



// console.log(data)
// console.log(userValues.access)


    // -------------------------
   useEffect(() => {
    axios.get("/users/", header_values)
    .then((res) => {
            setFriendlistdata(res.data.users)
          })
    .catch((err) => {
            // console.log(err.request)
            // console.log("runnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
            refreshAccessToken()
        }
    )

   }, [])
        
    // ------------------------
  

  // console.log(friendlistdata)
  // console.log(memberId)


  // const handleOnclickOnNewMembers = (memberid) => {
  //   setMemberId(memberid);
  //   if (yourFriends === false) {
  //     setYourFriends(true)
  //   } else {
  //     setYourFriends(false)
  //   }
  // }

  // if (friendlistdata.length> 0) {
  //   friendlistdata = friendlistdata.filter(item => !(item.friend_details.username === undefined))
  // }




  
  const slideLeft = () => {
    var slider = document.getElementById('reccommended-slider');
    slider.scrollLeft = slider.scrollLeft - 300;
  };

  const slideRight = () => {
    var slider = document.getElementById('reccommended-slider');
    slider.scrollLeft = slider.scrollLeft + 300;
  };


  // remove the login user on the list of reccommended users
  if (friendlistdata.length> 0) {
    friendlistdata = friendlistdata.filter(item => !(item.id === userValues.user.user))
    // friendlistdata = friendlistdata.filter(item => {if (item.first_name === ""){item.first_name = item.username} return item.username})
    // console.log("reccommended people ----------------------------------")
    // console.log(friendlistdata)
  }


  return (
    <>
     <div className='px-8 py-2 font-semibold'>Recommended People</div>
     <div className="relative">{showalermessage.show === true ? <AlertMessage message={showalermessage} />: ""}</div>
      <div className='relative flex items-center'>
      
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <div
          id='reccommended-slider'
          className='w-full h-full overflow-hidden scroll flex scroll-smooth scrollbar-hide'
        >
          {friendlistdata.length && friendlistdata.map((item) => (
            <div key={item.id}  className='mx-1 flex-shrink-0 w-45 border p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'>
                <div className='h-24 w-24 m-auto rounded-[96px] overflow-hidden'>
                    <img src={item.details.profile_picture} alt='/' className=''/>
                </div>

                <div className=''>
                    <div className='text-xs mx-2 my-1 shadow text-center p-1 rounded font-semibold cursor-pointer'>
                        {/* {item.details.first_name + ' ' + item.details.last_name} */}
                        {item.details.username}
                    </div>  
                    {/* <div className='text-xs mx-2 my-1 shadow text-center rounded bg-blue-500 text-white cursor-pointe p-1'>  send message <RiMessengerLine className='inline-block ml-2'/></div> */}
                    <div onClick={() => sendFriendRequest(item.id)} className='text-xs mx-2 my-1 shadow text-center p-1 rounded bg-blue-500 text-white cursor-pointer'>add friend <FaUserFriends className='inline-block  ml-2'/></div>
                </div>
                {/* <div className=''>
                    <button type="button" className="px-3 inline-block py-1 text-xs text-center w-full text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                                        
                      <svg class="h-3 w-3 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
                      Start Chat
                      
                    </button>
                </div> */}
                    
            </div>
           
          ))}
        </div>
        <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
    </>
  );
}



function RecommendedPeople(){
    return(
        <div className="recommendedPeople-container rounded-lg bg-white mt-3">
            <div>
                <div>

                    <RecommendedPeopleSlider />
                  
                </div>
            </div>
        </div>
    )
}

export default RecommendedPeople;