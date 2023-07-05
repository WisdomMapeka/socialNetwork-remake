
import ChatSection from "./chatSection";
import MessagesList from "./messageslist";

function EnlargedChatMessages(){
      return (
         <div className="px-8 mt-3">
            <div className="flex justify-center items-start ">
               <div className="w-[28%] bg-white">
                     <MessagesList />
               </div>
               <div className="w-[50%] bg-white">
               <ChatSection />
               </div>
               {/* <div className="w-[28%] bg-white mt-3">
               </div> */}
      
            </div>
            </div>
      );
}

export default EnlargedChatMessages;