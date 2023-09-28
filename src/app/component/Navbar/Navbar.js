
import React from "react";
import starLogo from "../../assests/Star design.png";
import reviewLogo from "../../assests/review and rate.jpg";
import profile from "../../assests/my image.jpg";
import "./Navbar.css";
import {Link,useNavigate } from "react-router-dom";

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
const navigate =useNavigate();
const handleLogout =()=>{
  console.log("logout call");
  localStorage.clear();
  navigate("/");
}

  return (
    <>
      <div>
        <nav className="navbar navbar-light bg-light shadow p-2 mb-2 bg-white rounded-bottom">
          {/* starLogo */}
          <div>
            <img id="navstarLogo" src={starLogo} height="35px" alt="starLogo" />
          </div>
          {/* 2 img */}
          <div>
            <img src={reviewLogo} width="" height="15px" alt="review_rating" />
          </div>
          {/* search bar */} 
          <div className="search">
            <form>
              <input
                type="search"
                placeholder="Search...."
                aria-label="Search"
                id="search"
              />
            </form>
          </div>
          {/* profile pic */}
          <div>
            <img id="profile" src={profile} height="45px" alt="Profile_pic" />
          </div>
          <div > <button type="button "  id="logout" onClick={handleLogout}>
            Logout
          </button></div> 
        </nav>
      </div>
    </>
  );
};




