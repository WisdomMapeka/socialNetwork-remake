import { Link } from "react-router-dom"
import Bio from "./components/userprofile/bio";
import Contacts from "./components/userprofile/contacts";
import FriendsUserprofile from "./components/userprofile/friends";
import PersonalInformation from "./components/userprofile/personalInformation";
import UploadedPics from "./components/userprofile/uploadedPics";

function UserProfile(){
    // var profileBackgroundOverlay = {
    //     position: "absolute",
    //     display: "block",
    //     width: "100%",
    //     height: "100%",
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     backgroundColor: "rgba(0, 0, 0, 0.5)"
    //     }
    // var profileBackground = {
    //     backgroundPosition: 'center',
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundImage: "url(https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60)"
    //     };



    return(
        <div className="profile-container container-fluid mt-4">

            <div className="flex justify-center">
                <div className="w-[55%] p-4 mr-2 bg-gray-100">
                    <PersonalInformation />
                    <Contacts />
                    <Bio /> 
                </div>

                <div className="w-[40%] ml-2 p-4 bg-gray-100">
                    <UploadedPics />
                    <FriendsUserprofile />
                </div>
            </div>
        </div>
    )
}

export default UserProfile