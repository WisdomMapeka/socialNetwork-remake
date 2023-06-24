import { Link , useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { BiImage } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { MdOutlineAudiotrack } from "react-icons/md";
import { getAccessRfreshUserValues } from "../../../../utils";
import axios from "axios";


function PostingData(){
    const[form, setForm] = useState({"postpic":""});
    const[errors, setErrors] = useState({"error":""});
    const inputFile = useRef(null);
    const navigate = useNavigate()
    const userValues = getAccessRfreshUserValues();

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
        created_by: parseInt(userValues.user.user),
    } 


    let BASE_URL_DEV = process.env.REACT_APP_ASE_URL_DEV;

    let  header_values = {
        baseURL: BASE_URL_DEV,
        headers: {
            "Content-Type": "multipart/form-data",
            'Accept': 'application/json',
            "Authorization" : "Bearer " + userValues.access
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

    return (
        <div className="my-6 bg-white p-2">
            {/* ----------------------------------------- */}
                <img id="post-img-output-preview" alt=""/>
                <textarea  name="userpost" onChange={(e) => setForm({...form, "posttext":e.currentTarget.value})} type="text" placeholder="... share something with your friends" className="w-full h-5 px-3 pb-12 pt-6 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                <input ref={inputFile} name="postpic" onChange={(e) => setForm({...form, "postpic":e.currentTarget.files[0]})} type="file" className="hidden" />
                <div>
                    <Link onClick={handleInputFile}><BiImage className="inline-block " /></Link>
                    <Link><FaVideo className="inline-block pl-2 text-xl" /></Link>
                    <Link><HiDocumentDuplicate className="inline-block pl-2 text-xl" /></Link>
                    <Link><MdOutlineAudiotrack className="inline-block pl-2 text-xl" /></Link>
                </div>
                <div className="flex justify-between items-baseline">
                    <button onClick={handleSubmit} type="submit" className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Upload</button>                    
                </div>
            {/* ----------------------------------------- */}

        </div>
    )
}

export default PostingData;