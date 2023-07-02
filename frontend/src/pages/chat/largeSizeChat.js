// import { getAccessRfreshUserValues } from "../../utils";
// import { useInterval } from "../../utils";
import axios from "axios";
import { useState, useRef , useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useNavigate } from "react-router-dom";
import globalVariables from "../../data/globalVariables";


function EnlargedChatMessages(){
   
  //  let userValues = getAccessRfreshUserValues();
   let [chatmessagesdata, setChatmessagesdata] = useState([]);
   const[form, setForm] = useState({"postpic":""});
   const[errors, setErrors] = useState({"error":""});
   // const [messages, setMessages] = useState([]);
   //  const [message, setMessage] = useState({});
    let chatpersons = JSON.parse(localStorage.getItem("chatpersons"))



   //  preview uploaded image
   if (form.postpic !== "" && form.postpic !== undefined) {
      var output = document.getElementById('post-img-output-preview');
      output.src = URL.createObjectURL(form.postpic);
      output.onload = function() {
        URL.revokeObjectURL(output.src) 
      }
  }


    let roomChatID = chatpersons.chatid
   const inputFile = useRef(null);
   const navigate = useNavigate()
   

   let chatParticipants = JSON.parse(localStorage.getItem("chatpersons"));

   let img_styles = {
      height:"100%"
   }
  

   const handleInputFile = () => {
       inputFile.current.click()
      
   }


   const data = {
      sender:chatParticipants.chatStarter.user,
      receiver: chatParticipants.chatReceiver.user,
      message:form.posttext,
      pic:form.postpic
   } 

   // console.log(data)
   let BASE_URL_DEV = globalVariables.BASE_URL_DEV

   // create form data ------------------------
   let new_form_data = new FormData();
   new_form_data.append("sender", data.sender)
   new_form_data.append("receiver", data.receiver)
   new_form_data.append("roomchatID", roomChatID)
   // new_form_data.append("message", data.message)
   new_form_data.append("is_pic", true)
   new_form_data.append("pic", data.pic)
   // ------------------------------------------

   let  header_values = {
      baseURL: BASE_URL_DEV,
      headers: {
          "Content-Type": "multipart/form-data",
          'Accept': 'application/json',
          // "Authorization" : "Bearer " + userValues.access
          },
      }

   let savemessagepic = () => {
    axios.post("/savemessagepic/",  new_form_data, header_values)
    .then((res) => {
      console.log(res)
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
   }

  

   
   useEffect(
      () => {
         let client = new W3CWebSocket('ws://localhost:8000/ws/chat/'+roomChatID+'/'); 
         client.onopen = () => {
            console.log('WebSocket Client Connected');
            };
            client.onmessage = (message) => {
            const messageObject = JSON.parse(message.data).message_response;
            // console.log(JSON.parse(messageObject))
            setChatmessagesdata([...chatmessagesdata, JSON.parse(messageObject)]);
            };
      }, []
      )


      // console.log(chatmessagesdata[0])
      chatmessagesdata.length && chatmessagesdata[0].map((i) => console.log(i))


      // console.log(data)
      const  handleSendMessage = () => {
         
         
      let client =  new W3CWebSocket('ws://localhost:8000/ws/chat/'+roomChatID+'/'); 

      let message = {"sender":chatParticipants.chatStarter.user,
                     "receiver": chatParticipants.chatReceiver.user,
                     "message" :data.message}

         console.log(message)

         client.onopen = () => {console.log('WebSocket Client Connected')};

         if (form.postpic !== "" && form.postpic !== undefined) {
            savemessagepic()
         }else{
            console.log("No Pic UPLOADED IN CHAT")
         }
         
         setTimeout(() => {
            try{
               client.send(JSON.stringify({ message }))
            } catch (error) {
               console.log(error)
            }
         }, 200)
         
         setForm('');
      };
      
      // this small code always keep the scroll line at the bottom when a message is sent
      if (document.querySelector('#chat-messages-tab-big')) {
         var messageBody = document.querySelector('#chat-messages-tab-big');
         messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
      }
      
      return (
         <>
            <div className="flex-1 my-3 p:2 sm:p-6 justify-between flex flex-col h-screen bg-white">
               <div className="flex  sm:items-center justify-between py-3 border-b-2 border-gray-200">
                  <div className="relative  flex items-center space-x-4">
                     <div className="relative">
                        {/* <span className="absolute text-green-500 right-0 bottom-0">
                           <svg width="20" height="20">
                              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                           </svg>
                        </span> */}
                        <div className='h-[30px] w-[30px] flex items-center justify-center rounded-[30px] border border-solid border-gray-900 p-0 overflow-hidden bg-green-700'>
                           <img src={chatParticipants.chatReceiver.profile_picture} alt='/' className='h-[95%] w-[95%] rounded-[95%]'/>
                        </div>
            
                     </div>
                     <div className="flex flex-col leading-tight">
                        <div className="text-sm mt-1 flex items-center">
                           <span className="text-gray-700 mr-3">OOO</span>
                        </div>
                        {/* <span className="text-xs text-gray-600">{chatParticipants.friend_details.location}</span> */}
                     </div>
                  </div>
               </div>
               <div id="chat-messages-tab-big" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                  {/* ------------chat messages loop start-------------------- */}
                 {chatmessagesdata.length && chatmessagesdata[0].map(
                   (mesage) => (
                   
                       <div className="chat-message" key={mesage.id}>
                           {mesage.sender === chatParticipants.chatStarter.user ? 
                           
                              
                           <div className="flex items-end">
                              {mesage.is_pic === true ? 
                                 <div className="max-w-xl mx-2"><img src={mesage.pic} alt="" /></div>
                              : 
                              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                 <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{mesage.message}</span></div>
                              </div>
                              }
                              <img src={chatParticipants.chatStarter.profile_picture} alt="" className="w-6 h-6 rounded-full order-2"/>
                           </div> : 
                           <div className="flex items-end justify-end">
                              {mesage.is_pic === true ? 
                                 <div className="max-w-xl mx-2"><img src={mesage.pic} alt="" /></div>
                              : 
                              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                 <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{mesage.message}</span></div>
                              </div>
                              }
                              <img src={chatParticipants.chatReceiver.profile_picture} alt="" className="w-6 h-6 rounded-full order-2" />
                           </div>
                           }
                        </div>
             
                    ))}
                  {/* -------------------------chat messages loop end------------- */}
               </div>
               <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                  <div className="relative flex-col flex pb-8 overflow-scroll">
                     <div className="max-h-48 text-center overflow-hidden">
                        <img id="post-img-output-preview" style={img_styles}  alt=""/>
                     </div>
                     
                     <br />
                     <textarea name="userpost" onChange={(e) => setForm({...form, "posttext":e.currentTarget.value})} type="text" placeholder="Write message!" className="w-full block h-28 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 pr-6 pb-28 bg-gray-200 rounded-md py-1    scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"></textarea>
                     <input ref={inputFile} name="postpic" onChange={(e) => setForm({...form, "postpic":e.currentTarget.files[0]})} type="file" className="hidden" />
                     <div className="absolute right-0 bottom-0 items-center  hidden sm:flex">

                        <button  onClick={handleInputFile} type="button" className="inline-flex items-center justify-center rounded-full h-5 w-5 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                              <path rokelinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                              <path rokelinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                           </svg>
                        </button>
           
                        <button onClick={handleSendMessage} type="button" className="inline-flex items-center justify-center rounded-lg px-2 mr-1 py-1 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                           <span className="font-bold text-xs">Send</span>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 ml-1 transform rotate-90">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </>
      );
}

export default EnlargedChatMessages;