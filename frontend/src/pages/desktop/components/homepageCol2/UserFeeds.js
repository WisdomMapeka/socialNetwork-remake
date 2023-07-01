import React, { useState, useEffect } from 'react';
// import { data } from './mockData';
import { getAccessRfreshUserValues } from '../../../../utils';
import { refreshAccessToken } from '../../../../utils';
import axios from 'axios';
import globalVariables from '../../../../data/globalVariables';

function ImageFile(props){
  const[imgerror, setImgerror] = useState(false);

  const stylesBlock = {"displaye":"none"}
  const stylesNone = {"displaye":"none"}
  let styles = {}
  imgerror === true ? (styles = stylesNone) : (styles = stylesBlock)
  
  // console.log(imgerror)
  // console.log(props.source)
    return <img src={props.source} style={styles} alt='' onError={() => {setImgerror(true)}}/>
}



function  UserFeeds() {
  const userValues = getAccessRfreshUserValues();
  const[postdata, setPostdata] = useState({});

  
  // let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;
  let BASE_URL_DEV = globalVariables.BASE_URL_DEV

  let  header_values = {
    baseURL: BASE_URL_DEV,
    headers: {
      'Content-Type': 'application/json',
      // "Authorization" : "Bearer " + userValues.access
      }
    }


  
    useEffect(
      // -------------------------
        () => {
          axios.get("/posts/", header_values)
          .then((res) => {setPostdata(res.data.posts)})
          .catch((err) => {
                  // console.log(err.request)
                  refreshAccessToken()
              }
          )
        }
      // ------------------------
      ,[]
    )
    
    const cleanDate = (d) => {
      let date = new Date(d);
      return date.toDateString()
    }
    
    // console.log(postdata)
    // console.log(cleanDate())
    // postdata.length && postdata.map((i) => console.log(i))
  return (
    <>
      <div className='relative w-full'>
     
        <div className='w-full flex flex-col items-center h-full scroll  scroll-smooth scrollbar-hide'>

          {postdata.length && postdata.map((item) => (
            
            <div key={item.id} className='w-full p-2 mt-3 shadow bg-white cursor-pointer hover:scale-105 ease-in-out duration-300'>
                <div className='flex my-4 '>
                    <div className='h-[50px] w-[50px] flex items-center justify-center rounded-[50px] border border-solid border-gray-900 p-0 overflow-hidden bg-green-700'>
                        <img src={item.created_by.profile_picture} alt='/' className='h-[45px] w-[45px]  rounded-[45px]'/>
                    </div>
                    <div className='flex flex-col ml-3'>
                        <span>{item.created_by.first_name + " " + item.created_by.last_name} {cleanDate(item.date_created)}</span>
                        <span className='text-xs'>{item.created_by.location}</span>
                    </div>
                </div>
                <div className='w-full overflow-hidden rounded-xl'>
                    <ImageFile source = {item.uploaded_picture} /> 
                </div>
                <div>
               
                  {item.description}
                  {/* <span className='text-xs h-2 w-2 rounded-lg bg-green-700'></span> */}
                </div>
                <div className='flex justify-between text-xs'>
                  <span>Location</span>
                  <span>o</span>
                  <span>Harare</span>
                </div>
                
                    
            </div>
           
          ))}
        </div>
      </div>
    </>
  );
}



















export default UserFeeds;