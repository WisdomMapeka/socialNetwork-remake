/* 
DOCUMENTATION ABOUT THIS FILE
when an edit button is clicked, useState changes to false or true depending on the already
existing bool. A form is edit the data is displayed based on this bool
*/
import { useState } from "react"
import { Link } from "react-router-dom"
import EditPersonalInformation from "../edituserprofileForms/editPersonalInformation"
function PersonalInformationData(){
    return (
        <div className="flex flex-col mt-2 px-5 py-2">
            <div className="max-w-[200px] max-h-[300px]  overflow-hidden">
                <img className=" rounded-md" src="https://images.unsplash.com/photo-1562059392-096320bccc7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60" alt="" />
                <div className="text-2xl py-6">Wisdom Mapeka</div>
            </div>
            <div>
                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-20 text-gray-500">First Name:</span> <span className=" text-sm">Wisdom</span></div>
                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-20 text-gray-500">Last Name:</span>  <span className=" text-sm">Mapeka</span></div>
                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-20 text-gray-500">Username:</span>   <span className=" text-sm">Wiz2</span></div>
                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-20 text-gray-500">Email:</span>      <span className=" text-sm">Wisdoma@gmail.com</span></div>
            </div>
        </div>
    )
}
function PersonalInformation() {
    let[showcomponent, SetShowcomponent] = useState(false)
    let buttonText = "Edit"
    showcomponent === false ? buttonText = "Edit" : buttonText = "close";
return(
    <div className=" rounded-md overflow-hidden  bg-white pb-3 mb-4">
        <h3 className="flex justify-between  text-blue-600 py-2 px-5">
            <span className="font-semibold">Personal Information</span>
            <Link onClick={() => {showcomponent === false ? SetShowcomponent(true) : SetShowcomponent(false)}}>{buttonText}</Link>
        </h3>
        {showcomponent === false ? <PersonalInformationData /> :  <EditPersonalInformation />}
    </div>
)
}
export default PersonalInformation


