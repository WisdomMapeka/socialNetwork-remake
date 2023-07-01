import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import globalVariables from '../../data/globalVariables';


let BASE_URL_DEV = globalVariables.BASE_URL_DEV

// THis is parent chat , does a little bit more, it also checks for a roomChatID from 
// the data base and set it as context to be used when we make socket connection.
function ParentChat(){
    let[returnedchatid, SetReturnedChaiID] = useState("")
    let chatpersons = JSON.parse(localStorage.getItem("chatpersons"));  

    const data = {
        "starterID":chatpersons.chatStarter.user,
        "receiverID":chatpersons.chatReceiver.user
    }

    let  header_values = {
        baseURL: BASE_URL_DEV,
        headers: {
            "Content-Type": "multipart/form-data",
            'Accept': 'application/json',
            // "Authorization" : "Bearer " + userValues.access
            },
        }
 
        axios.post("/checkchatid/", data, header_values)
        .then((res) => {
                SetReturnedChaiID(res.data)
        })
        .catch((err) => {
            console.log(err.request.responseText)
        })
    return (<Chat dddd = {returnedchatid}/>)
}



function Chat(props) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    let roomChatID = props.dddd
    console.log("runned--------------")
    console.log(roomChatID) 

    let client = new W3CWebSocket('ws://localhost:8000/ws/chat/'+roomChatID+'/'); 

    useEffect(() => {
        client.onopen = () => {
        console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
        const messageObject = JSON.parse(message.data);
        setMessages([...messages, messageObject]);
        };
    }, [messages]);

    const handleSendMessage = () => {
        client.send(JSON.stringify({ message }));
        setMessage('');
    };

    // console.log(messages)
    

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.message}</li>
        ))}
      </ul>
      <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ParentChat;