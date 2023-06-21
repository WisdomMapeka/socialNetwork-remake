import { useState } from "react"
import Messages from "../../../components/desktop/Messages"
import ListOfYourFriends from "../../../components/desktop/ListOfYourFriends"

function HomePageCol1(){
    let[show, setShow] = useState("friends")
    return(
        <div className="p-3">
            <div className="flex justify-between">
                <span className="cu cursor-pointer pt-3" onClick={() => setShow("friends")}>Friends</span>
                <span className="cu cursor-pointer pt-3" onClick={() => setShow("messages")}>Messages</span>
            </div>

            <div>
                {show === "friends" ? <ListOfYourFriends /> : "messages"}
            </div>
        </div>
    )
}

export default HomePageCol1