import { Outlet, Link } from "react-router-dom";
import Header from "../components/desktop/header";


/*
All pages that are inside the router when a desktop layout is selected based on 
media querries will be displayed on the outlet section. 

The router and the media querries are inside the router.js file , and the app.js file
*/
function Desktop(){
    return (
        <div className="desktop-container">
            <div>
                <Header />
            </div>
            < Outlet />
            <div>Footer</div>
        </div>
    )
}


export default Desktop