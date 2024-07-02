import React, { createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

// Create the context
export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        try {
            const token = localStorage.getItem("nestnavigatortoken");
            if (token) {
                const decodedToken = jwtDecode(token);
                setToken(token);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    },[]);
    
    const contextValue = {
        token,
        userInfo,
        setUserInfo,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;