import { useState, useEffect } from "react";
import RecommendedPeople from "../../components/desktop/RecommendedPeople";
import HomePageCol1 from "./components/homepageCol1";
function Home(){

    return(
<div className="px-8">
    <div className="flex justify-between items-start ">
        <div className="w-[28%] bg-white mt-3">
            <HomePageCol1 />
        </div>
        <div className="w-[40%] bg-white mt-3">
            <RecommendedPeople />
        </div>
        <div className="w-[28%] bg-white mt-3">
 
           col3 
        </div>

    </div>

</div>
)
}

export default Home