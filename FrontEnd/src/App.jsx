import { useState, useEffect,useContext } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Homepage from './pages/homepage/Home'
import Aboutpage from './pages/aboutpage/About'
import Propertiespage from './pages/propertiespage/Properties'
import Servicespage from './pages/servicespage/Service'
import Signinpage from './pages/loginpage/Signin'
import Signuppage from './pages/loginpage/Signup'
import AdminPanel from './Dashboard/Admin/Dashboard'

import AllUser from './Dashboard/Pages/AllUser'
import UserProfile from './Dashboard/Pages/UserProfile'
import UserVerification from './Dashboard/Pages/UserVerification'

import { Routes, Route, useLocation } from 'react-router-dom'
import { StoreContext } from './context/StoreContext'
import {Protectedapi} from './api/Api'
import { jwtDecode } from 'jwt-decode'



function App() {
    const location = useLocation();
    const { token, userInfo } = useContext(StoreContext);
    
        
    return (
        <>
            {!location.pathname.startsWith('/dashboard') && <Navbar />}
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<Aboutpage />} />
                <Route path="/properties" element={<Propertiespage />} />
                <Route path="/services" element={<Servicespage />} />
                <Route path="/signin" element={<Signinpage />} />
                <Route path="/signup" element={<Signuppage />} />

                <Route path="/dashboard" element={<AdminPanel />} >
                    <Route path="alluser" element={<AllUser />} />
                    <Route path="userprofile" element={<UserProfile />} />
                    <Route path="userverification" element={<UserVerification />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
