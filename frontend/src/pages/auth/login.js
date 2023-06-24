import { Link, useNavigate  } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/desktop/header";
// import { updateUserOnlineStatus } from "../../utils";

function Login(){
    const[form, setForm] = useState({});
    const[errors, setErrors] = useState({"error":""})
    const navigate = useNavigate()

    let BASE_URL_DEV = process.env.REACT_APP_BASE_URL_DEV;

    let  header_values = {
      baseURL: BASE_URL_DEV,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // "Authorization" : "Bearer " + userValues.access
        },
        // params: {user: userValues.user.user}
      }

    const data = {
        username: form.email,
        password: form.password
    }

    const handleSubmit = () =>{
        console.log(BASE_URL_DEV)
        axios.post("/login/", data, header_values)
        .then((res) => {
            // console.log(res.request.responseText)
            setErrors({...errors, "error":JSON.parse(res.request.responseText)});
            // console.log(res.data.user);
            // ----------------------------------------------------------------
            
              localStorage.setItem("auth", JSON.stringify({
                access: res.data.access,
                refresh: res.data.refresh,
                user: res.data.user,
              }))
            //   updateUserOnlineStatus(true)
              navigate("/")
            // ----------------------------------------------------------------
        })
        .catch((err) => {
            // console.log(err.request.data.error)
        })
    }
    // console.log(errors.error.error)
    // console.log(data);

    return (
        <>
        {/* <   Header /> */}
        <div className="p-6">
            {/* <h1>LandingMobilejsjs</h1> */}
            <div className="flex flex-wrap lg:flex-nowrap justify-between bg-gray-50 px-24">
                <div className="m-2">
                    {/* -------------------------col one----------------------- */}
                    <div className="relative flex text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                        <h1 className="text-2xl font-light ">Wellcome to chatmate,<img alt="" className=" max-w-xl" src="../../logochatmate.jpg"/></h1>
                        <div className="pt-8 pr-8">This is a social media site, built by me. If you want to meet new people, 
                        for fun, business, or love, then , this is a place for you. If you already have an account, login on the right, 
                        If you dont have one consider signing up here below. </div>
                        <div className="mt-8 text-2xl"><Link className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-purple-600 " to="/signup">Signup</Link></div>
                    </div>
                    {/* -------------------------col one end------------------- */}
                </div>
                <div className=" m-2">
                    {/* -------------------------col tywo----------------------- */}
                    <div className="relative flex  text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                        <h1 className="text-2xl font-light ">Login to your account</h1>
                        <div className=" text-red-700">{errors !== null ? errors.error.error: ""}</div>
                        <div className="relative py-3 sm:w-96 mx-auto text-center">
                        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
                            <div className="h-1 bg-blue-600 rounded-t-md"></div>
                            <div className="px-8 py-6 ">
                            <label className="block font-semibold"> Username or Email </label>
                            <input onChange={(e) => setForm({...form, "email":e.currentTarget.value})} type="text" placeholder="Email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                            <label className="block mt-3 font-semibold"> Username or Email </label>
                            <input onChange={(e) => setForm({...form, "password":e.currentTarget.value})} type="password" placeholder="Password" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                <div className="flex justify-between items-baseline">
                                <button onClick={handleSubmit} type="submit" className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Login</button>
                                <a href="#" className="text-sm hover:underline">Forgot password?</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    </div>
          
                    {/* -------------------------col two end-------------------- */}
                </div>
            </div>   
        </div>
        </>
    )
}

export default Login;