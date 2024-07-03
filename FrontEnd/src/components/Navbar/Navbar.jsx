import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
import { ExpandMoreIcon } from "../icons";
import { GetStaticProfileImage } from "../../api/Api";

function Navbar() {
    const [profileExpanded, setProfileExpanded] = useState(false);
    const { userInfo, token, loading, setToken } = useContext(StoreContext);
    const [profile, setProfile] = useState({
        name: "John Doe",
        photo: "/profile.png",
    });

    useEffect(() => {
        if (userInfo) {
            setProfile({
                name: userInfo.username,
                photo: userInfo.image,
            });
        }
    }, [userInfo]);

    // decode token to get user information
    
    const handleSidebar = () => {
        const sidebar = document.getElementById("sidebar");
        const sidebarButton = document.getElementById("sidebarbutton");

        if (sidebar.getAttribute("aria-expanded") === "false") {
            sidebar.setAttribute("aria-expanded", "true");
            sidebarButton.setAttribute("aria-expanded", "true");
        } else {
            sidebar.setAttribute("aria-expanded", "false");
            sidebarButton.setAttribute("aria-expanded", "false");
        }
    }

    const signout = () => {
        localStorage.removeItem("nestnavigatortoken");
        setToken(null);
        window.location.reload();
    }

    return (
        <>
            <header className="header-section">
                <div className="container">
                    <div className="logo">NestNavigator</div>
                    <button id="sidebarbutton" aria-expanded="false" onClick= {handleSidebar} ></button>

                    <nav className="navbar">
                        <ul>
                            <li>
                                <NavLink to= "/"  >Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">About Us</NavLink>
                            </li>
                            <li>
                                <NavLink to="/properties">Properties</NavLink>
                            </li>
                            <li>
                                <NavLink to= "/services">Services</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="sign-up">
                        {token ? 
                        <div className="user-profile-container">
                            <div className="image-content">
                                <img src={profile.photo === "null"? "/profile.png": GetStaticProfileImage(profile.photo)} alt="profile" />
                            </div>
                            
                            <div className="dropdown-content">
                                <p>{profile.name}</p>
                                <NavLink to= "/dashboard/userprofile">Profile</NavLink>
                                <NavLink to= "/dashboard">Dashboard</NavLink>
                                <a onClick={signout}>Sign Out</a>
                            </div>
                            
                        </div> : 
                        <li><NavLink to= "signin">Sign In</NavLink></li>}
                        
                    </div>

                    <div id="sidebar" className="sidebar" aria-expanded="false">
                        <div className="user-profile-container">
                            <div className="main-container"
                                onClick={() => setProfileExpanded(!profileExpanded)}>
                            
                                <div className="image-content">
                                    <img src={profile.photo === "null"? "/profile.png": GetStaticProfileImage(profile.photo)} alt="profile" />
                                </div>
                                <div className="menu-content" >
                                    <p>My account</p>
                                    <div className={`expanded-svg ${profileExpanded ? "rotated" : ""}`}>
                                        <ExpandMoreIcon/>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-navigations">
                                <div className={`profile-links ${profileExpanded ? "expanded" : ""}`}>
                                    <ul>
                                        <li>
                                            <NavLink to="/dashboard/userprofile">Profile</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard">Dashboard</NavLink>
                                        </li>
                                        <li>
                                            <a onClick={signout}>Sign Out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <ul className="sidebar-navigation" id="sidebar-links">
                            <li className="sidebar-item"><NavLink to={"/"}>Home</NavLink></li>
                            <li className="sidebar-item"><NavLink to={"/about"}>About Us</NavLink></li>
                            <li className="sidebar-item"><NavLink to={"/properties"}>Properties</NavLink></li>
                            <li className="sidebar-item"><NavLink to={"/services"}>Services</NavLink></li>
                            {!token && <li className="sidebar-item"><NavLink to={"/signin"}>Sign In</NavLink></li>}
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;
