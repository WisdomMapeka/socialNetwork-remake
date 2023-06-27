import axios from "axios";
import { getAccessRfreshUserValues } from "../../utils";
import globalVariables from "../../data/globalVariables";
const updateUserOnlineStatus = (online_status) =>{
    const userValues = getAccessRfreshUserValues();
    const data  = {
      user: userValues.user.user,
      is_online : online_status
    }
  
    //  let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;
    let BASE_URL_DEV = globalVariables.BASE_URL_DEV
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