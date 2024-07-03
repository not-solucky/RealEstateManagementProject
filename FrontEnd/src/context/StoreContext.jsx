import React, { createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import {Protectedapi} from '../api/Api';

// Create the context
export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const token = localStorage.getItem("nestnavigatortoken");
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userID;
                setToken(token);
                setUserInfo({
                    username: decodedToken.username,
                    image: decodedToken.userImage
                
                })

                const fetchUserInfo = async () => {
                    try {
                        const response = await Protectedapi.get(`/users/${userId}`);
                        if (response.status === 200) {
                            setUserInfo(response.data);
                        }
                    } catch (error) {
                        console.log("Error:", error);
                    }
                };
                fetchUserInfo();

            
            }
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    },[token]);
    
    const contextValue = {
        token,
        userInfo,
        setToken,
        loading
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;