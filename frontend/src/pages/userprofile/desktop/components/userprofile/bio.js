import { Link } from "react-router-dom"
import { useState } from "react"
import EditPersonalInformation from "../edituserprofileForms/editPersonalInformation"
import EditBio from "../edituserprofileForms/editBio"


function BioData(){
    return(
        <div className="flex mt-2 px-5 py-2">
            <div>
                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-36 text-gray-500">Description:</span>        <span className=" text-sm">hhhhhhhhdbnh </span></div>
                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-36 text-gray-500">hobies:</span>             <span className=" text-sm">hahaha hshhs hehehe hahah heheh </span></div>
                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-36 text-gray-500">DOB:</span>                <span className=" text-sm">17 march 2020</span></div>
            </div>
        </div>
    )
}
function Bio(){
    let[showcomponent, SetShowcomponent] = useState(false)
    let buttonText = "Edit"
    showcomponent === false ? buttonText = "Edit" : buttonText = "close";
    return(
        <div className=" rounded-md overflow-hidden bg-white border pb-3 mb-4">
            <h3 className="flex justify-between  text-blue-600 py-2 px-5">
                <span className="font-semibold">Bio</span>
                <Link onClick={() => {showcomponent === false ? SetShowcomponent(true) : SetShowcomponent(false)}}>{buttonText}</Link>
            </h3>
            {showcomponent === false ? <BioData /> :  <EditBio />}
        </div>
        )
    }

export default Bio