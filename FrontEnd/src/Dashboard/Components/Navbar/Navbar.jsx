import {NavLink} from 'react-router-dom';
import './stylesheets/Navbar.scss';
import { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import { GetStaticProfileImage } from '../../../api/Api';
function DashboardNavbar() {
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
                    <div className="profile-name">
                        <h4>{profile.name}</h4>
                    </div>
                    <div className="profile-photo">
                        <img src={profile.photo === "null"? "/profile.png": GetStaticProfileImage(profile.photo)} alt="profile" />
                    </div>
                    
                </div>
            </nav>
        </>
    );
}

export default DashboardNavbar;