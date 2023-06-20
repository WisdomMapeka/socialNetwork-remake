import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAccessRfreshUserValues } from "../../../../../utils";


function EditBio(){
    let userValues = getAccessRfreshUserValues()
    const [form, setForm] = useState({description : userValues.user.description,
                                    hobbies :userValues.user.hobbies, 
                                    dob :userValues.user.dob});
    const [Error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
    console.log("handleSubmit run")
    event.preventDefault();
    const registrationForm = event.currentTarget;
    if (registrationForm.checkValidity() === false) {event.stopPropagation();}
    }

    const data = {
    description : form.description.trim(),
    hobbies :form.hobbies.trim(),
    dob :form.dob
    }

    let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;
    const headers_values = {
    baseURL: BASE_URL_DEV,
    headers: {
    'Content-Type': 'application/json',
    }
    }

    const send_form = () => {
    axios.patch(`/userprofile/${userValues.user.user}/`, data, headers_values)
    .then((res) => {
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth["user"] = res.data.user;
        localStorage.setItem("auth", JSON.stringify(auth))
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
            <h1 className="text-2xl font-bold mb-6 text-center">Edit Bio</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-[700px] mx-auto bg-white p-8 rounded-md shadow-md border-t-4 border-blue-600">
                <div className="md:flex justify-between">
                    <div className="mb-4 md:mr-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
                        <input onChange={(e) => setForm({...form, "description:":e.currentTarget.value})} className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text" id="description" name="description" placeholder="description" />
                    </div>

                    <div className="mb-4 md:ml-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hobbies">hobies</label>
                        <input onChange={(e) => setForm({...form, "hobbies":e.currentTarget.value})} className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text" id="hobbies" name="hobbies" placeholder="hobbies" />
                    </div>
                </div>



                <div className="md:flex justify-between">
                    <div className="mb-4 md:mr-6">
                        <label className="flex justify-between text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                        dob
                            <span className=" text-red-600 italic">{Error.username}</span>
                        </label>
                        <input onChange={(e) => setForm({...form, "dob":e.currentTarget.value})} className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text" id="dob" name="dob" placeholder="dob" />
                    </div>
                </div>

                <button onClick={send_form}
                className="w-full bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditBio