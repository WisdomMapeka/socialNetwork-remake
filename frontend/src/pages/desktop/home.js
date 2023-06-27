import HomePageCol1 from "./components/homepageCol1";
import HomePageCol2 from "./components/homepageCol2";
import HomePageCol3 from "./components/homepageCol3";
function Home(){

    return(
<div className="px-8">
    <div className="flex justify-between items-start ">
        <div className="w-[28%] bg-white mt-3">
            <HomePageCol1 />
        </div>
        <div className="w-[40%] bg-white mt-3">
            <HomePageCol2 />
        </div>
        <div className="w-[28%] bg-white mt-3">
 
            <HomePageCol3 />
        </div>

    </div>

</div>
)
}

export default Home