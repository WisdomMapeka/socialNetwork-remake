import { Outlet, Link, Navigate } from "react-router-dom";
import Header from "../components/desktop/header";
import CheckUserLoginStatus from "../pages/auth/checkLoginStatus";


/*
All pages that are inside the router when a desktop layout is selected based on 
media querries will be displayed on the outlet section. 

The router and the media querries are inside the router.js file , and the app.js file
*/
function Desktop(){
    let UIdata =  <div className="desktop-container">
                        <div>
                            <Header />
                        </div>
                        < Outlet />
                        <div>Footer</div>
                    </div>
    return CheckUserLoginStatus() === true ? UIdata : <Navigate to="/login" />
}


export default Desktop