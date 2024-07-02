import React, { useEffect, useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
function Navbar() {
    const [activeItem, setActiveItem] = useState("Home");
    const [token, setToken] = useState(null);
    useEffect(() => {
        try {
            const token = localStorage.getItem("nestnavigatortoken");
            if (token) { // Check if token exists before decoding
                const decoded = jwtDecode(token);
                setToken(decoded);
            }
        } catch (error) {
            console.error("Error decoding token:", error.message); // Log specific error message
            // Optionally set an error state variable here (if needed)
        }
    }, []);
    
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
                            <li><NavLink to= "dashboard/profile">Account</NavLink></li>

                            <li><NavLink to= "/">Sign out</NavLink></li>

                        </div> : 
                        <li><NavLink to= "signin">Sign In</NavLink></li>}
                        
                    </div>

                    <div id="sidebar" className="sidebar" aria-expanded="false">
                        <ul className="sidebar-navigation" id="sidebar-links">
                            <li className="sidebar-item"><NavLink to={"/"}>Home</NavLink></li>
                            <li className="sidebar-item"><NavLink to={"/about"}>About Us</NavLink></li>
                            <li className="sidebar-item"><NavLink to={"/properties"}>Properties</NavLink></li>
                            <li className="sidebar-item"><NavLink to={"/services"}>Services</NavLink></li>
                            <li className="sidebar-item"><NavLink to={"/signin"}>Sign In</NavLink></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;
