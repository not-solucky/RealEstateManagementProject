import React, { useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
    const [activeItem, setActiveItem] = useState("Home");

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
                        <li><NavLink to= "signin">Sign In</NavLink></li>
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
