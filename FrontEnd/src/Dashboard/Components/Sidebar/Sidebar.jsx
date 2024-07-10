import './stylesheets/Sidebar.scss'
import { AdduserIcon, VerifyuserIcon, AlluserIcon, ProfileIcon } from '../../../components/icons';
import { NavLink } from 'react-router-dom'


function DashboardSidebar() {
    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-items">
                    <NavLink to="userprofile"><ProfileIcon /> Profile</NavLink>

                    <NavLink to="alluser"><AlluserIcon /> All Users</NavLink>
                    <NavLink to="adduser"><AdduserIcon /> Add User</NavLink>
                    <NavLink to="verifyuser"><VerifyuserIcon /> Verify User</NavLink>
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