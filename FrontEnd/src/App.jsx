import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Homepage from './pages/homepage/Home'
import Aboutpage from './pages/aboutpage/About'
import Propertiespage from './pages/propertiespage/Properties'
import Servicespage from './pages/servicespage/Service'
import Signinpage from './pages/loginpage/Signin'
import Signuppage from './pages/loginpage/Signup'
import AdminPanel from './Dashboard/Admin/Dashboard'
import { Routes, Route, useLocation } from 'react-router-dom'


function App() {
    const location = useLocation();

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
                <Route path="/dashboard" element={<AdminPanel />} />

            </Routes>


        </>
    )
}

export default App
