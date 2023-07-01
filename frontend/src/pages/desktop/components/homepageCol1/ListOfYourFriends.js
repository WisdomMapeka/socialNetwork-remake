import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {RiMessengerLine} from 'react-icons/ri';
// import { getAccessRfreshUserValues } from '../utils';
// import { refreshAccessToken } from '../utils';
import axios from 'axios';


function FriendDropDown(props){ 
  const selectedUser = props.data;
  const navigate = useNavigate()
  
  let loginUser = JSON.parse(localStorage.getItem("auth")).user
  let chatpersons = {chatStarter:loginUser, chatReceiver:props.data.user}
  localStorage.setItem("chatpersons", JSON.stringify(chatpersons))

  const handleChat = () => {
    navigate("/chat/")
  } 
  
  return (
    // <span></span>
        <div key={selectedUser.user.id} className='ml-3 mb-2 px-2 mt-1 py-2  cursor-pointer hover:scale-105 ease-in-out duration-300'>
            <div className='flex h-[200px] w-[200px] mb-3 pb-3 flex-col my-2 shadow-md rounded-xl overflow-hidden'>
                <div className='flex items-center justify-center p-0 overflow-hidden'>
                    <img src={selectedUser.user.profile_picture} alt='/' className=' w-full rounded-xl'/>
                </div>
                <div className='break-all '>
                    <div className='text-xs mx-2 my-1 shadow text-center p-1 rounded font-semibold cursor-pointer'>{selectedUser.user.first_name + " " + selectedUser.user.last_name} </div>  
                    <div onClick={handleChat} className='text-xs mx-2 my-1 shadow text-center rounded bg-blue-500 text-white cursor-pointe p-1'>  send message <RiMessengerLine className='inline-block ml-2'/></div>
                    {/* <div className='text-xs mx-2 my-1 shadow text-center p-1 rounded bg-blue-500 text-white cursor-pointer'>add friend <FaUserFriends className='inline-block  ml-2'/></div> */}
                </div>
            </div>
        </div>
    )
}

function ListOfYourFriends() {
 
  const[show, setShow] = useState(false);
  const[user, setUser] = useState("");
  // const userValues = getAccessRfreshUserValues();
  let[friendlistdata, setFriendlistdata] = useState({});


  let BASE_URL_DEV = process.env.REACT_APP_BASE_URL_DEV;
  // console.log(BASE_URL_DEV)

  let  header_values = {
    baseURL: BASE_URL_DEV,
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   Authorization: "Bearer " + userValues.access
    //   },
    //   params: {user: userValues.user.user}
    }


  useEffect(
      () => {
         axios.get("/listretrieveuserprofiles", header_values)
        .then((res) => {setFriendlistdata( res.data)})
        .catch((err) => {
                console.log(err.request.response)
                // refreshAccessToken()
            }
        )
      }
    ,[]
  )



  const handleOnclick = (user) => {
    setUser(user);
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  // console.log(show)
  // console.log(user)

//  console.log(friendlistdata)
  return (
    <>
      <div className='relative'>
      
        <div
          className='w-full h-96 overflow-scroll no-scrollbar rounded-xl scroll-smooth   mx-auto flex flex-col items-center max-w-[700px]  p-0 mt-3 shadow '
        >
          
          {friendlistdata.length && friendlistdata.map((item) => {
            
            return(
            <div key={item.user.user} className='w-full  px-2 mt-1 shadow  cursor-pointer hover:scale-105 ease-in-out duration-300' >
                <div className='flex my-2 w-full' onClick={() => {handleOnclick(item)}}>
                    <div className='h-[30px] w-[30px] flex items-center justify-center rounded-[30px] border border-solid border-gray-900 p-0 overflow-hidden bg-green-700'>
                        <img src={item.user.profile_picture} alt='/' className='h-[95%] w-[95%] rounded-[95%]'/>
                    </div>
                    <div className='break-all ml-3'>
                        <div className='text-xs'>{item.user.first_name + " " + item.user.last_name} </div>
                        <div className='text-xs'>{item.user.location}</div>
                        {/* <div className='text-xs'>
                            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-12 border-b-2 border-blue-700 hover:border-blue-500 rounded">
                                send request
                            </button>
                        </div> */}
                    </div>
                </div>

                { show === true && item.user.user === user.user.user ? <FriendDropDown data = {user} />  : ""}
            </div>
            )
          
            
})}
     

        </div>
      </div>

    </>
  );
}








export default ListOfYourFriends;





