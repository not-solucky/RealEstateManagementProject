import './stylesheets/Navbar.scss';
import { useState, useEffect } from 'react';
import { isLogin, getProfile } from '../../../utils/localstorage';
import { ImageApi } from '../../../api/image';

function DashboardNavbar({loading}) {
    const [profile, setProfile] = useState(false);

    useEffect(() => {
        
        if (isLogin()) {
            setProfile(getProfile());
        }
    }, [loading]);


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
                        <h4>{profile.username}</h4>
                    </div>
                    <div className="profile-photo">
                        <img src={profile.image === "null"? "/profile.png": ImageApi.GetStaticProfileImage(profile.image)} alt="profile" />
                    </div>
                    
                </div>
            </nav>
        </>
    );
}

export default DashboardNavbar;