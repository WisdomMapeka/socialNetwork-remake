import { Outlet, Link , useNavigate} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import {BiLogIn} from "react-icons/bi";
import {HiInbox} from "react-icons/hi";
// import MenuUserInformation from "./MenuUserInformation";
// import {CheckUserLoginStatus, Logout} from "../utils";


function Header () {
    return(
            <header className="bg-blue-600 text-white  flex justify-between items-center shadow-md px-2 py-1">
                <div className="bg-gray-200 ">
                    <img alt="" src="../logochatmate.jpg" className=" h-12" />
                    {/* <img alt="" src="../media/logochatmate.jpg" className=" h-12" /> */}
                </div>

                <div>
                    <div className="">
                        <div className="flex">
                            <ul className="flex">
                                <li className="p-2 border-r"><Link to="/">Home<AiOutlineHome className='inline-block ml-2' /></Link></li>
                                <li className="p-2 border-r">Inbox<HiInbox className='inline-block ml-2' /></li>
                                <li className="p-2 border-r"><Link to="/login">Login<BiLogIn className='inline-block ml-2' /></Link></li>
                                <li className="p-2 border-r"><Link to="/signup">Signup</Link></li>                            
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
    )
}

export default Header