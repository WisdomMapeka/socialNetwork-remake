import axios
 from "axios";
const updateUserOnlineStatus = (online_status) =>{
    // console.log("utils.js updateUserOnlineStatus -------------------")
    // const userValues = getAccessRfreshUserValues();
    const data  = {
    //   user: userValues.user.user,
      is_online : online_status
    }
    
    // console.log(userValues)
    // console.log(data)
  
     let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;
  
     let  header_values = {
      baseURL: BASE_URL_DEV,
      }
    
    axios.post("/updateuseronlinestatus/", data, header_values)
    .then(
      (res) => {
        console.log(res)
      }
    )
    .catch((err) => {
      console.log(err)
    })
  }

  export default updateUserOnlineStatus