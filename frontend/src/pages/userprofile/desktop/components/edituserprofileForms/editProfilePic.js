import { Link , useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { BiImage } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { MdOutlineAudiotrack } from "react-icons/md";
import axios from "axios";
import { getAccessRfreshUserValues } from "../../../../../utils";



function EditProfilePic() {
    const userValues = getAccessRfreshUserValues();
    const[form, setForm] = useState({"profile_picture":""});
    const[errors, setErrors] = useState({"error":""});
    const inputFile = useRef(null);
    const navigate = useNavigate()
    

    // console.log(form)

    if (form.profile_picture !== "" || undefined) {
        var output = document.getElementById('post-img-output-preview');
        output.src = URL.createObjectURL(form.profile_picture);
        output.onload = function() {
          URL.revokeObjectURL(output.src) 
        }
    }
   

    const handleInputFile = () => {
        inputFile.current.click()
       
    }



    const data = {
        profile_picture:form.profile_picture,
        // description:form.posttext,
        // is_profile_pic: false,
        // created_by: parseInt(userValues.user.user),
    } 


    let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

    let  header_values = {
        baseURL: BASE_URL_DEV,
        headers: {
            "Content-Type": "multipart/form-data",
            'Accept': 'application/json',
            // "Authorization" : "Bearer " + userValues.access
            },
        }
    // create form data ------------------------
    let new_form_data = new FormData();
    new_form_data.append("profile_picture", data.profile_picture)
    // ------------------------------------------

    const handleSubmit = () =>{
        // console.log(userValues.user.user)
        axios.patch(`/userprofile/${userValues.user.user}/`, new_form_data, header_values)
        .then((res) => {
            // console.log(res.request.responseText)
            setErrors({...errors, "error":JSON.parse(res.request.responseText)});
            console.log(res.data);
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth["user"] = res.data.user;
            localStorage.setItem("auth", JSON.stringify(auth))
            // window.location.href = "/"
            // ----------------------------------------------------------------
            navigate("/")
            // ----------------------------------------------------------------
        })
        .catch((err) => {
            // console.log(err.request.responseText)
        })
    }


    return(
        <div>
            <div className="text-center w-[200px] mx-auto rounded-lg overflow-hidden my-4" ><img id="post-img-output-preview" src="https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="logo on signup page" className="inline-block mx-auto" /> </div>
            <div className="flex justify-between p-4">
                <div><input ref={inputFile} name="profile_picture" onChange={(e) => setForm({...form, "profile_picture":e.currentTarget.files[0]})} type="file" className="relative m-0 block max-w-[250px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" /></div>
                <button onClick={handleSubmit} className="m-0 max-w-[250px] rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal bg-neutral-700 text-neutral-200 transition duration-300 ease-in-out  focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none ">update profile picture</button>
            </div>
        </div>
    )
}

export default EditProfilePic