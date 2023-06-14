import { Link } from "react-router-dom"

function UserProfile(){
    var profileBackgroundOverlay = {
        position: "absolute",
        display: "block",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
        }
    var profileBackground = {
        // width: "100%",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: "url(https://images.unsplash.com/photo-1566024287286-457247b70310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG9jZWFufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60)"
        };


    const numbers = [4, 9, 16, 25];
    return(
        <div className="profile-container container-fluid mt-4">

            <div >
                <div style={profileBackground} className="my-4 py-7 h-[200px] relative border">
                    <div className="z-10" style={profileBackgroundOverlay}></div>
                    <div className="h-36 w-36 z-20  absolute right-0 left-0 rounded-[144px] overflow-hidden m-auto bg-blue-600"><img alt="person" src="https://images.unsplash.com/photo-1494791368093-85217fbbf8de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" /></div>
                </div>
                <h1 className=" text-3xl text-center ">Wisdom Mapeka</h1>
            </div>


            <div className="flex justify-center">
                <div className="w-[40%] p-4 mr-2 bg-white">
                    <div className=" rounded-md overflow-hidden border">
                        <h3 className="flex justify-between  text-blue-600 py-2 px-5"> 
                            <span className="font-semibold">Friends</span>
                            <Link>See All</Link>
                        </h3>
                        { numbers.map((i) => (
                        <Link className="mt-4 px-4 py-2 block ">
                            <div className="flex justify-start">
                                <div className='h-[40px] w-[40px] mr-4 flex items-center justify-center rounded-[30px] border border-solid border-gray-900 p-0 overflow-hidden bg-blue-600'>
                                    <img alt="friend"  className='h-[95%] w-[95%] rounded-[95%]' src="https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" />
                                </div> 
                                <div  className="flex flex-col">
                                    <span className="text-sm text-black">{i} Wisdom mapeks mapes m</span>
                                    <span className="text-xs">Harare</span>
                                </div>
                            </div>
                        </Link>
                        ) )}  
                    </div>
                    
                </div>



                <div className="w-[55%] ml-2 p-4 bg-white">

                    <div className=" rounded-md overflow-hidden border   pb-3 mb-4">
                        <h3 className="flex justify-between  text-blue-600 py-2 px-5">
                            <span className="font-semibold">Personal Information</span>
                            <Link>Edit</Link>
                        </h3>
                        <div className="flex mt-2 px-5 py-2">
                            <div>
                                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-20 text-gray-500">First Name:</span> <span className=" text-base">Wisdom</span></div>
                                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-20 text-gray-500">Last Name:</span>  <span className=" text-base">Mapeka</span></div>
                                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-20 text-gray-500">Username:</span>   <span className=" text-base">Wiz2</span></div>
                                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-20 text-gray-500">Email:</span>      <span className=" text-base">Wisdoma@gmail.com</span></div>
                                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-20 text-gray-500">DOB:</span>      <span className=" text-base">17 march 2020</span></div>
                            </div>
                        </div>
                    </div>


                    <div className=" rounded-md overflow-hidden border pb-3 mb-4">
                        <h3 className="flex justify-between  text-blue-600 py-2 px-5">
                            <span className="font-semibold">Contacts</span>
                            <Link>Edit</Link>
                        </h3>
                        <div className="flex mt-2 px-5 py-2">
                            <div>
                                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-36 text-gray-500">whastapp:</span> <span className=" text-base">099999999</span></div>
                                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-36 text-gray-500">calls:</span>  <span className=" text-base">07777777</span></div>
                                <div className="pb-2"><span className=" text-sm inline-block mr-5 w-36 text-gray-500">Area Of Residence:</span>   <span className=" text-base">Harare</span></div>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
        </div>
    )
}

export default UserProfile