
import './stylesheets/Sidebar.scss'
import AllUser from '../../Pages/AllUser';
import UserProfile from '../../Pages/UserProfile/UserProfile';
import { AdduserIcon, VerifyuserIcon, AlluserIcon, ProfileIcon } from '../../../components/icons';
import { NavLink } from 'react-router-dom'


function DashboardSidebar() {
    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-items">
                    {/* <NavLink to="userprofile"><AdduserIcon /> Profile</NavLink> */}

                    {/* <NavLink to="alluser"><AlluserIcon /> All Users</NavLink> */}
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