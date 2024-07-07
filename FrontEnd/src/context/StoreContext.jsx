import React, { createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

// Create the context
export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const contextValue = {
        token,
        userInfo,
        setToken,
        loading,
        setUserInfo
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;