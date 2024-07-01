import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import DashboardNavbar from '../Components/Navbar/Navbar';
import UserProfile from '../Pages/UserProfile';
import AllUser from '../Pages/AllUser';
import UserVerification from '../Pages/UserVerification';

import './stylesheets/Dashboard.scss';
import DashboardSidebar from '../Components/Sidebar/Sidebar';

function AdminPanel() {
    return (
        <>
            <div className="dashboard-layout">
                <DashboardNavbar />
                <div className="dashboard-content">
                    <div className="sidebar">
                        <DashboardSidebar />
                    </div>

                    <div className="outlet">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminPanel;