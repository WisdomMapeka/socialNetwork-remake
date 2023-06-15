/* 
DOCUMENTATION ABOUT THIS FILE
when an edit button is clicked, useState changes to false or true depending on the already
existing bool. A form is edit the data is displayed based on this bool
*/
import { Link } from "react-router-dom"
import { useState } from "react"
import EditContacts from "../edituserprofileForms/editContacts"

function ContactsData(){
    return(
        <div className="flex mt-2 px-5 py-2">
            <div>
                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-36 text-gray-500">whastapp:</span>            <span className=" text-sm">099999999</span></div>
                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-36 text-gray-500">calls:</span>               <span className=" text-sm">07777777</span></div>
                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-36 text-gray-500">Locaton:</span>   <span className=" text-sm">Harare</span></div>
            </div>
        </div>
)
}

function Contacts(){
    let[showcomponent, SetShowcomponent] = useState(false)
    let buttonText = "Edit"
    showcomponent === false ? buttonText = "Edit" : buttonText = "close";
    return(
        <div className=" rounded-md overflow-hidden bg-white border pb-3 mb-4">
            <h3 className="flex justify-between  text-blue-600 py-2 px-5">
                <span className="font-semibold">Contacts</span>
                <Link onClick={() => {showcomponent === false ? SetShowcomponent(true) : SetShowcomponent(false)}}>{buttonText}</Link>
            </h3>
            {showcomponent === false ? <ContactsData /> :  <EditContacts />}
        </div>
    )

}

export default Contacts