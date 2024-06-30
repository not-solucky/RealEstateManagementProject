import {NavLink} from 'react-router-dom';
import './stylesheets/Navbar.css';
import { useState } from 'react';
function DashboardNavbar() {

    const [profile, setProfile] = useState({
        name: 'John Doe',
        photo: '/profile.png'
    });

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <div className="hamburger"></div>
                    <div className="logo">
                        <h2>Dashboard</h2>
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="profile-photo">
                        <img src={profile.photo} alt="profile" />
                    </div>
                    <div className="profile-name">
                        <h4>{profile.name}</h4>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default DashboardNavbar;