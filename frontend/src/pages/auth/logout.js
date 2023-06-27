import axios from "axios";
import {BiLogOut} from "react-icons/bi";
import { useNavigate , Link} from "react-router-dom";
import checkUserLoginStatus from "./checkLoginStatus";
import updateUserOnlineStatus from "./updateUserOnlineStatus";

function Logout(){
    const navigate = useNavigate();
    let BASE_URL_DEV = process.env.REACT_APP_BASE_URL_DEV;

    const handleLogingUserOut = () => {
        console.log("logout run")
        console.log(BASE_URL_DEV)
        let  header_values = {
            baseURL: BASE_URL_DEV,
            }
            const data = {}
            
            axios.post("/logout/", data, header_values)
            .then((res) => {
                console.log(res);
                updateUserOnlineStatus(false)
                localStorage.removeItem("auth");
                navigate("/login/");
            })
            .catch((err) => {
                console.log(err);
            })

    }
    let logout = <Link onClick={handleLogingUserOut} ><li className="p-2 border-r">Logout<BiLogOut className='inline-block ml-2' /></li></Link>    

    return checkUserLoginStatus() === true ? logout : ""

}


export default Logout