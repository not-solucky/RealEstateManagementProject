import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import DashboardNavbar from '../Components/Navbar/Navbar';
import { useState } from 'react';

import './stylesheets/Dashboard.scss';
import DashboardSidebar from '../Components/Sidebar/Sidebar';
import { useEffect } from 'react';
import { isLogin } from '../../utils/localstorage';
import { useNavigate } from 'react-router-dom';
function AdminPanel({loading}) {
    // const location = useNavigate()
    // useEffect(()=>{
    //     const loggedin = isLogin()
    //     console.log(loggedin)
    //     if (loggedin === false){
    //         location.apply('/')
    //     }

    // },[])

    const [toggleSidebar, setToggleSidebar] = useState(false);

    return (
        <>
            <div className="dashboard-layout">
                <DashboardNavbar loading={loading} toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}/>
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