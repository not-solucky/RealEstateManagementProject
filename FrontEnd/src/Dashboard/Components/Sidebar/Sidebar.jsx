import './stylesheets/Sidebar.scss'
import { AdduserIcon, VerifyuserIcon, AlluserIcon, ProfileIcon } from '../../../components/icons';
import { NavLink } from 'react-router-dom'


function DashboardSidebar() {
    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-items">
                    <NavLink to="userprofile"> Profile</NavLink>

                    <NavLink to="alluser"> All Users</NavLink>
                    <NavLink to="adduser"> Add User</NavLink>
                    <NavLink to="verifyuser"> Verify User</NavLink>
                    <NavLink to="addproperty">Add Property</NavLink>
                    <NavLink to="allsaleproperty">All Property for Sale</NavLink>
                    <NavLink to="allrentproperty">All Property for Rent</NavLink>
                </div>
                <div className="dashboard-exit">
                    <div className="line"></div>
                    <div className="link">
                        <NavLink to={'/'}>Exit Dashboard</NavLink>
                    </div>
                </div>

            </div>
        </>
    );
}

export default DashboardSidebar;