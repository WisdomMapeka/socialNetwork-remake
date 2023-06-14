import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {RiMessengerLine} from 'react-icons/ri';
// import { getAccessRfreshUserValues } from '../utils';
// import { refreshAccessToken } from '../utils';
import axios from 'axios';


function YourFriends(props){ 
  // let userValues = getAccessRfreshUserValues();

  const selectedUser = props.data;
  const navigate = useNavigate()

  const handleChat = () => {
    localStorage.setItem("chatParticipants", JSON.stringify(selectedUser))
    navigate("/messages")
  } 
  
  return (
    // <span></span>
        <div key={selectedUser.id} className='ml-3 mb-2 px-2 mt-1 py-2  cursor-pointer hover:scale-105 ease-in-out duration-300'>
            <div className='flex h-[200px] w-[200px] mb-3 pb-3 flex-col my-2 shadow-md rounded-xl overflow-hidden'>
                <div className='flex items-center justify-center p-0 overflow-hidden'>
                    <img src={selectedUser.friend_details.profile_picture} alt='/' className=' w-full rounded-xl'/>
                </div>
                <div className='break-all '>
                    <div className='text-xs mx-2 my-1 shadow text-center p-1 rounded font-semibold cursor-pointer'>{selectedUser.friend_details.first_name + " " + selectedUser.friend_details.last_name} </div>  
                    <div onClick={handleChat} className='text-xs mx-2 my-1 shadow text-center rounded bg-blue-500 text-white cursor-pointe p-1'>  send message <RiMessengerLine className='inline-block ml-2'/></div>
                    {/* <div className='text-xs mx-2 my-1 shadow text-center p-1 rounded bg-blue-500 text-white cursor-pointer'>add friend <FaUserFriends className='inline-block  ml-2'/></div> */}
                </div>
            </div>
        </div>
    )
}

function ListOfYourFriends() {
 
  const[yourFriends, setYourFriends] = useState(false);
  const[memberId, setMemberId] = useState("");
  // const userValues = getAccessRfreshUserValues();
  let[friendlistdata, setFriendlistdata] = useState({});


  let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

  let  header_values = {
    baseURL: BASE_URL_DEV,
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   Authorization: "Bearer " + userValues.access
    //   },
    //   params: {user: userValues.user.user}
    }


// console.log(data)
// console.log(userValues.access)

  useEffect(
    // -------------------------
      () => {
        axios.get("/friends", header_values)
        .then((res) => {setFriendlistdata(res.data.friens_list)})
        .catch((err) => {
                console.log(err.request.response)
                // refreshAccessToken()
            }
        )
      }
    // ------------------------
    ,[]
  )

  // console.log("-------friend list -----------------")
  // console.log(friendlistdata)
  // console.log("-------friend list -----------------")


  const handleOnclickOnNewMembers = (memberid) => {
    setMemberId(memberid);
    if (yourFriends === false) {
      setYourFriends(true)
    } else {
      setYourFriends(false)
    }
  }

  if (friendlistdata.length> 0) {
    friendlistdata = friendlistdata.filter(item => !(item.friend_details.username === undefined))
  }

//  console.log(friendlistdata)
  return (
    <>
      <div className='relative'>
      
        <div
          className='w-full h-96 overflow-scroll no-scrollbar rounded-xl scroll-smooth   mx-auto flex flex-col items-center max-w-[700px]  p-0 mt-3 shadow '
        >
          
          {friendlistdata.length && friendlistdata.map((item) => {
            
            return(
            <div key={item.id} className='w-full  px-2 mt-1 shadow  cursor-pointer hover:scale-105 ease-in-out duration-300' >
                <div className='flex my-2 w-full' onClick={() => {handleOnclickOnNewMembers(item.id)}}>
                    <div className='h-[30px] w-[30px] flex items-center justify-center rounded-[30px] border border-solid border-gray-900 p-0 overflow-hidden bg-green-700'>
                        <img src={item.friend_details.profile_picture} alt='/' className='h-[95%] w-[95%] rounded-[95%]'/>
                    </div>
                    <div className='break-all ml-3'>
                        <div className='text-xs'>{item.friend_details.first_name + " " + item.friend_details.last_name} </div>
                        <div className='text-xs'>{item.friend_details.location}</div>
                        {/* <div className='text-xs'>
                            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-12 border-b-2 border-blue-700 hover:border-blue-500 rounded">
                                send request
                            </button>
                        </div> */}
                    </div>
                </div>

                { YourFriends && memberId === item.id ? <YourFriends data = {item} memberId = {memberId}/>  : ""}
            </div>
           

            )
          
            
})}
     

        </div>
      </div>

    </>
  );
}








export default ListOfYourFriends;





