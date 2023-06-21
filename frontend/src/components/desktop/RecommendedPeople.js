import React, {useState, useEffect} from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { RiMessengerLine } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';
import axios from 'axios';
// import { refreshAccessToken } from '../utils';
import { getAccessRfreshUserValues } from '../../utils';




function RecommendedPeopleSlider() {
  const userValues = getAccessRfreshUserValues();
  let[userprofileslistdata, setUserProfileslistdata] = useState({});
  const[showalermessage, setShowalermessage] = useState({show:false, alertmessage:""});

  let BASE_URL_DEV = process.env.REACT_APP_BASE_URL_DEV
  let  header_values = {baseURL: BASE_URL_DEV,}
  console.log(BASE_URL_DEV)

  const sendFriendRequest = () =>{

  }

  useEffect(
    () => {
        axios.get("/listretrieveuserprofiles/",  header_values)
        .then((res) => {
          setUserProfileslistdata(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, []
  )



  const slideLeft = () => {
    var slider = document.getElementById('reccommended-slider');
    slider.scrollLeft = slider.scrollLeft - 300;
  };

  const slideRight = () => {
    var slider = document.getElementById('reccommended-slider');
    slider.scrollLeft = slider.scrollLeft + 300;
  };

  return (
    <>
     <div className='px-8 py-2 font-semibold'>Recommended People</div>
     {/* <div className="relative">{showalermessage.show === true ? <AlertMessage message={showalermessage} />: ""}</div> */}
      <div className='relative flex items-center'>
      
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <div
          id='reccommended-slider'
          className='w-full h-full overflow-hidden scroll flex scroll-smooth scrollbar-hide'
        >
          {userprofileslistdata.length && userprofileslistdata.map((item) => (
            <div key={item.user.id}  className='mx-1 flex-shrink-0 w-45 border p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'>
                <div className='h-24 w-24 m-auto rounded-[96px] overflow-hidden'>
                    <img src={item.user.profile_picture} alt='/' className=''/>
                </div>

                <div className=''>
                    <div className='text-xs mx-2 my-1 shadow text-center p-1 rounded font-semibold cursor-pointer'>
                        {item.user.first_name + ' ' + item.user.last_name}
                    </div>  
                    <div className='text-xs mx-2 my-1 shadow text-center rounded bg-blue-500 text-white cursor-pointe p-1'>  message <RiMessengerLine className='inline-block ml-2'/></div>
                    <div onClick={() => sendFriendRequest(item.id)} className='text-xs mx-2 my-1 shadow text-center p-1 rounded bg-blue-500 text-white cursor-pointer'>add friend <FaUserFriends className='inline-block  ml-2'/></div>
                </div>
                    
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