import {NavLink} from 'react-router-dom';
import './stylesheets/Navbar.scss';
import { useState, useContext } from 'react';
import { StoreContext } from '../../../context/StoreContext';
function DashboardNavbar() {
    const { userInfo } = useContext(StoreContext);
    const [profile, setProfile] = useState({
        name: 'John Doe',
        photo: '/profile.png'
    });

    return (
        <>
            <nav className="dashboard-navbar">
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