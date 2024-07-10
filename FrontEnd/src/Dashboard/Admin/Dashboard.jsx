import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import DashboardNavbar from '../Components/Navbar/Navbar';

import './stylesheets/Dashboard.scss';
import DashboardSidebar from '../Components/Sidebar/Sidebar';

function AdminPanel({loading}) {

    return (
        <>
            <div className="dashboard-layout">
                <DashboardNavbar loading={loading}/>
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