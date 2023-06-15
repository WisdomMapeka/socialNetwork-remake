import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function EditContacts(){
    const [form, setForm] = useState({first_name : "annonymouse",
        last_name :"",password :"",
        password2 :"",username :"annonymouse"});
    const [Error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
    console.log("handleSubmit run")
    event.preventDefault();
    const registrationForm = event.currentTarget;
    if (registrationForm.checkValidity() === false) {event.stopPropagation();}
    }

    const data = {
    first_name : form.first_name.trim(),
    last_name :form.last_name.trim(),
    username :form.username.trim()
    }

    let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;
    const headers_values = {
    baseURL: BASE_URL_DEV,
    headers: {
    'Content-Type': 'application/json',
    }
    }

    const send_form = () => {
    axios.post("/signup/", data, headers_values)
    .then((res) => {
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
        <div className="container mx-auto pt-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Edit Contacts</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-[700px] mx-auto bg-white p-8 rounded-md shadow-md border-t-4 border-blue-600">
                <div className="md:flex justify-between">
                    <div className="mb-4 md:mr-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">whastapp</label>
                        <input onChange={(e) => setForm({...form, "first_name":e.currentTarget.value})} className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text" id="first_name" name="first_name" placeholder="First Name" />
                    </div>

                    <div className="mb-4 md:ml-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">calls</label>
                        <input onChange={(e) => setForm({...form, "last_name":e.currentTarget.value})} className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text" id="last_name" name="last_name" placeholder="Last Name" />
                    </div>
                </div>



                <div className="md:flex justify-between">
                    <div className="mb-4 md:mr-6">
                        <label className="flex justify-between text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        location
                            <span className=" text-red-600 italic">{Error.username}</span>
                        </label>
                        <input onChange={(e) => setForm({...form, "username":e.currentTarget.value})} className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text" id="username" name="username" placeholder="User Name or Phone Number" />
                    </div>
                </div>

                <button onClick={send_form}
                className="w-full bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditContacts