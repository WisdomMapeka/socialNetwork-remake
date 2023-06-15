import { data } from "../../../../../components/tesData";
import { Link } from "react-router-dom";

function UploadedPics(){
    const numbers = [4, 9, 16, 25];

    return(
        <div className=" rounded-md overflow-hidden bg-white">
            <h3 className="flex justify-between  text-blue-600 py-2 px-5"> 
                <span className="font-semibold">Uploaded Pictures</span>
                <Link>See All</Link>
            </h3>
            <div className="flex flex-wrap">
                { data.map((i) => (
                <Link key={i.id} className="mt-4 px-4 py-2 block ">
                    <div className="flex w-28">
                        <img alt="" src={i.img} />
                    </div>
                </Link>
                ) )} 
            </div>
        </div>)
}

export default UploadedPics