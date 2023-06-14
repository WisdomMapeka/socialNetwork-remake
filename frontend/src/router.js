import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// import Layout from "./pages/Layout";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";
import Desktop from "./layout/desktop";
import SignUp from "./pages/auth/signup";
import { useMediaQuery } from 'react-responsive'
import Mobile from "./layout/mobile";
import Home from "./pages/desktop/home";
import Login from "./pages/auth/login";
import UserProfile from "./pages/userprofile/desktop/userProfileDetails";

function AllRouters() {
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 768px)'})
    // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    useEffect(
      () => {
          document.body.classList.add( 
          "bg-gray-100", 
          // "px-8",
          "text-sm", 
          );
         
      }, []
  )

  let desktop = <BrowserRouter>
                  <Routes>
                    <Route path="/" element={ <Desktop /> } >
                        <Route index element={<Home />} />
                        <Route path="signup" element={<SignUp />} />
                        <Route path="login" element={<Login />} />
                        <Route path="profile" element={<UserProfile />} />
                        {/* 
                        <Route path="blogs" element={<Blogs />} />
                        <Route path="blogs" element={<Blogs />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="*" element={<NoPage />} /> */}
                    </Route>
                  </Routes>
                </BrowserRouter>



  let mobile =    <BrowserRouter>
                    <Routes>
                      <Route path="/" element={ <Mobile />} >
                          <Route path="s" element={<SignUp />} />
                          <Route path="home" element={<Home />} />
                          {/* 
                          <Route path="blogs" element={<Blogs />} />
                          <Route path="blogs" element={<Blogs />} />
                          <Route path="contact" element={<Contact />} />
                          <Route path="*" element={<NoPage />} /> */}
                      </Route>
                    </Routes>
                  </BrowserRouter>


  return (<> {isDesktopOrLaptop ? desktop : mobile}</>);
}

export default AllRouters