import './stylesheets/Sidebar.scss'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { isLogin, getRole } from '../../../utils/localstorage';


function DashboardSidebar() {
    const [role, SetRole] = useState(null)
    const fetchUserProfile = async () => {
        try {
            let userrole = getRole();
            if (userrole) {
                SetRole(userrole)
            }
        } catch (error) {
            console.error("Error fetching user profile", error);
        }
    };

    useEffect(() => {
        fetchUserProfile()
    }, [])
    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-items">
                    <div className="settings">
                        <NavLink to="userprofile"> Profile</NavLink>
                    </div>
                    {role === "admin" &&
                        <div className="settings">
                            <NavLink to="alluser"> All Users</NavLink>
                            <NavLink to="adduser"> Add User</NavLink>
                            <NavLink to="verifyuser"> Verify User</NavLink>
                            <NavLink to="verifyproperty"> Verify Property</NavLink>
                            <NavLink to="allsaleproperty">All Property for Sale</NavLink>
                            <NavLink to="allrentproperty">All Property for Rent</NavLink>
                        </div>
                    }
                    <div className="settings">
                        <NavLink to="addproperty">Add Property</NavLink>
                        <NavLink to="activelistings">Active Listings</NavLink>
                        <NavLink to="pendinglistings">Pending Listings</NavLink>
                        <NavLink to="soldproperties">Sold Properties</NavLink>
                        <NavLink to="rentproperties">Rented Properties</NavLink>
                    </div>
                    <div className="settings">
                        <NavLink to="mypurchasedproperites">My Purchased Properties</NavLink>
                        <NavLink to="myrentedproperties">My Rented Properties</NavLink>
                    </div>

                </div>
                <div className="dashboard-exit">
                    <div className="link">
                        <NavLink to={'/'}>Exit Dashboard</NavLink>
                    </div>
                </div>

            </div>
        </>
    );
}

export default DashboardSidebar;