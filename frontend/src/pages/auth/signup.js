import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../../components/desktop/header";


function SignUp(){
  const [form, setForm] = useState({email :"NotSet",first_name : "annonymouse",
                                    last_name :"",password :"",
                                    password2 :"",username :"annonymouse"});
  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log("handleSubmit run")
    event.preventDefault();
    const registrationForm = event.currentTarget;
    if (registrationForm.checkValidity() === false) {
    event.stopPropagation();
    }
  }

  const data = {
    email :form.email.trim(),
    first_name : form.first_name.trim(),
    last_name :form.last_name.trim(),
    password :form.password.trim(),
    password2 :form.password2.trim(),
    username :form.username.trim()
  }


  let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

  console.log(data)
  const headers_values = {
    baseURL: BASE_URL_DEV,
    headers: {
      'Content-Type': 'application/json',
    }}
const send_form = () => {
    axios.post("/signup/", data, headers_values)
    .then((res) => {
      // store user data in the browser-----
      console.log(res.request)
      localStorage.setItem("auth", JSON.stringify({
        access: res.data.access,
        refresh: res.data.refresh,
        user: res.data.user,
      }));
      navigate("/user-additional-information/")
    })
    .catch((err) => {
      console.log(err.request.response)
      setError(JSON.parse(err.request.response))
    })
}
 

  console.log(Error);
    return (
       
       <>
       <Header />
        <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
          <div className="text-center " ><img src="" alt="logo on signup page" className="inline-block mx-auto" /> </div>
          <form onSubmit={handleSubmit} className="w-full max-w-[700px] mx-auto bg-white p-8 rounded-md shadow-md border-t-4 border-blue-600">
    
            <div className="md:flex justify-between">
                <div className="mb-4 md:mr-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">First Name</label>
                    <input onChange={(e) => setForm({...form, "first_name":e.currentTarget.value})} className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text" id="first_name" name="first_name" placeholder="First Name" />
                </div>

                <div className="mb-4 md:ml-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">Last Name</label>
                    <input onChange={(e) => setForm({...form, "last_name":e.currentTarget.value})} className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text" id="last_name" name="last_name" placeholder="Last Name" />
                </div>
            </div>



            <div className="md:flex justify-between">
                <div className="mb-4 md:mr-6">
                    <label className="flex justify-between text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            User Name/ Phone Number
                            <span className=" text-red-600 italic">{Error.username}</span>
                        </label>
                    <input onChange={(e) => setForm({...form, "username":e.currentTarget.value})} className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text" id="username" name="username" placeholder="User Name or Phone Number" />
                </div>

                <div className="mb-4 md:ml-6">
                    <label className="flex justify-between text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            <span>Email (optional)</span>
                            <span className=" text-red-600 italic">{Error.email}</span>
                        </label>
                    <input onChange={(e) => setForm({...form, "email":e.currentTarget.value})} className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="email" id="email" name="email" placeholder="email e.g john@example.com" />
                </div>
            </div>



            <div className="mb-4">
              <label className="flex justify-between text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  <span>Password</span>
                  <span className=" text-red-600 italic">{Error.password}</span>
              </label>
              <input onChange={(e) => setForm({...form, "password":e.currentTarget.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password" id="password" name="password" placeholder="********" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">Confirm Password</label>
              <input onChange={(e) => setForm({...form, "password2":e.currentTarget.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password" id="confirm-password" name="confirm-password" placeholder="********" />
            </div>
            <button onClick={send_form}
              className="w-full bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
              type="submit">Register</button>

              <Link className="block text-blue-600 text-sm mt-3" to={"/login"}>If you already have an account. Login</Link>
          </form>

          
        </div>
        
        </div>

        
        </>
   
    )
}



export default SignUp