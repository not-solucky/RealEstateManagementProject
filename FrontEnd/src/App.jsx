import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Homepage from './pages/homepage/Home'
import Aboutpage from './pages/aboutpage/About'
import Propertiespage from './pages/propertiespage/Properties'
import Servicespage from './pages/servicespage/Service'
import Signinpage from './pages/loginpage/Signin'
import Signuppage from './pages/loginpage/Signup'
import AdminPanel from './Dashboard/Admin/Dashboard'
import AllUsers from './pages/AllUsers/AllUsers'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import AllUser from './Dashboard/Pages/Alluser/AllUser'
import UserProfile from './Dashboard/Pages/UserProfile/UserProfile'
import UserVerification from './Dashboard/Pages/UserVerification'
import { getID, setProfile } from './utils/localstorage'
import { useLocation } from 'react-router-dom'


import { UserApi } from './api/user'


function App() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [isloggedin, setIsloggedin] = useState(false);
    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const userId = getID();
                if (userId) {
                    const { statusCode, data } = await UserApi.getProfile();
                    if (statusCode === 200) {
                        setProfile(data); // Ensure setProfile is properly defined
                    }
                }
            } catch (error) {
                console.error("Error fetching user profile", error);
            }
            setLoading(false);

        };
        fetchUserProfile();
    }, [isloggedin]);
        
    return (
        <>
            {!location.pathname.startsWith('/dashboard') && <Navbar loading = {loading}/>}
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<Aboutpage />} />
                <Route path="/properties" element={<Propertiespage />} />
                <Route path="/services" element={<Servicespage />} />
                <Route path="/signin" element={<Signinpage loggedin = {setIsloggedin}/>} />
                <Route path="/signup" element={<Signuppage />} />


                <Route path="/dashboard" element={<AdminPanel loading={loading}/>} >
                    <Route path="alluser" element={<AllUser />} />
                    <Route path="userprofile" element={<UserProfile />} />
                    <Route path="userverification" element={<UserVerification />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
