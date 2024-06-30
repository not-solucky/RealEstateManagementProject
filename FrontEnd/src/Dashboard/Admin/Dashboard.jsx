import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import DashboardNavbar from '../Components/Navbar/Navbar';
import UserProfile from '../Pages/UserProfile';
import AllUser from '../Pages/AllUser';
import UserVerification from '../Pages/UserVerification';

import './stylesheets/Dashboard.css';

function AdminPanel() {
    return (
        <>
            <div className="dashboard-layout">
                <DashboardNavbar />
                <Outlet />
            </div>
        </>
    );
}

export default AdminPanel;