import { Link } from "react-router-dom"

function FriendsUserprofile(){
    const numbers = [4, 9, 16, 25];

    return(
        <div className=" rounded-md overflow-hidden mt-2 bg-white ">
            <h3 className="flex justify-between  text-blue-600 py-2 px-5"> 
                <span className="font-semibold">Friends</span>
                <Link>See All</Link>
            </h3>
            { numbers.map((i) => (
            <Link key={i} className="mt-4 px-4 py-2 block ">
                <div className="flex justify-start">
                    <div className='h-[40px] w-[40px] mr-4 flex items-center justify-center rounded-[30px] border border-solid border-gray-900 p-0 overflow-hidden bg-blue-600'>
                        <img alt="friend"  className='h-[95%] w-[95%] rounded-[95%]' src="https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" />
                    </div> 
                    <div  className="flex flex-col">
                        <span className="text-sm text-black">{i} Wisdom mapeks mapes m</span>
                        <span className="text-xs text-gray-500">Harare</span>
                    </div>
                </div>
            </Link>
            ) )}  
        </div>)
}

export default FriendsUserprofile