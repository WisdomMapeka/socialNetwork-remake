import { Link , useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { BiImage } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { MdOutlineAudiotrack } from "react-icons/md";
import axios from "axios";



function EditProfilePic() {
    const[form, setForm] = useState({"postpic":""});
    const[errors, setErrors] = useState({"error":""});
    const inputFile = useRef(null);
    const navigate = useNavigate()
    // const userValues = getAccessRfreshUserValues();

    // console.log(form)

    if (form.postpic !== "" || undefined) {
        var output = document.getElementById('post-img-output-preview');
        output.src = URL.createObjectURL(form.postpic);
        output.onload = function() {
          URL.revokeObjectURL(output.src) 
        }
    }
   

    const handleInputFile = () => {
        inputFile.current.click()
       
    }



    const data = {
        uploaded_picture:form.postpic,
        description:form.posttext,
        is_profile_pic: false,
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
    new_form_data.append("uploaded_picture", data.uploaded_picture)
    new_form_data.append("created_by", data.created_by)
    new_form_data.append("is_profile_pic", data.is_profile_pic)
    new_form_data.append("description", data.description)
    // ------------------------------------------

    const handleSubmit = () =>{
        // console.log(userValues.user.user)
        axios.post("/posts/", new_form_data, header_values)
        .then((res) => {
            // console.log(res.request.responseText)
            setErrors({...errors, "error":JSON.parse(res.request.responseText)});
            console.log(res.data);
            window.location.href = "/"
            // ----------------------------------------------------------------

            // userValues.user = res.data.user 
            // localStorage.setItem("auth", JSON.stringify(userValues))
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
                <div><input ref={inputFile} name="postpic" onChange={(e) => setForm({...form, "postpic":e.currentTarget.files[0]})} type="file" className="relative m-0 block max-w-[250px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" /></div>
                <button className="m-0 max-w-[250px] rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal bg-neutral-700 text-neutral-200 transition duration-300 ease-in-out  focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none ">update profile picture</button>
            </div>
        </div>
    )
}

export default EditProfilePic