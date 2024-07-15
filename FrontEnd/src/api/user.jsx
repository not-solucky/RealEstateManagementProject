import { config } from "../utils/config";
import { getToken, setToken } from "../utils/localstorage";
import { getID } from "../utils/localstorage";

const Login = async (payload) => {
    try {
        const response = await fetch(`${config.baseURL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (response.status === 200) {
            setToken(data.token);
        }
        return {statusCode: response.status, data: data};
    } catch (error) {
        console.error(error);
        return {statusCode: 500, data: {error: "Error Connecting to Server"}};

    }
}

const Register = async (payload) => {
    try {
        const response = await fetch(`${config.baseURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return {statusCode: response.status, data: data};
    } catch (error) {
        console.error(error);

    }
}

const getProfile = async () => {
    try {
        const id = getID();
        const token = getToken();
        const response = await fetch(`${config.baseURL}/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        return {statusCode: response.status, data: data};
        
    } catch (error) {
        console.error(error);
        return {statusCode: 500, data: {error: "Error Connecting to Server"}};

    }
}

const getAllUsers = async () => {
    try{
        const token = getToken();
        const response = await fetch(`${config.baseURL}/admin/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        return {statusCode: response.status, data: data}; 
        // data{[user1, user2, user3, ...]} where user1 = {username, email, phone, is_verified, image, created_at,role ...} and so on
        
    
    } catch (error) {
        console.error(error);
        return {statusCode: 500, data: {error: "Error Connecting to Server"}};

    }
}

// update profile

const updateUsername = async (payload) => {
    try {
        const id = getID();
        const token = getToken();
        const response = await fetch(`${config.baseURL}/update/username`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return {statusCode: response.status, data: data};
        
    } catch (error) {
        console.error(error);
        return {statusCode: 500, data: {error: "Error Connecting to Server"}};

    }
}

const updatePassword = async (payload) => {
    try {
        const id = getID();
        const token = getToken();
        const response = await fetch(`${config.baseURL}/update/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return {statusCode: response.status, data: data};
        
    } catch (error) {
        console.error(error);
        return {statusCode: 500, data: {error: "Error Connecting to Server"}};

    }
}

const updateEmail = async (payload) => {
    try {
        const id = getID();
        const token = getToken();
        const response = await fetch(`${config.baseURL}/update/email`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return {statusCode: response.status, data: data};
        
    } catch (error) {
        console.error(error);
        return {statusCode: 500, data: {error: "Error Connecting to Server"}};

    }
}

const updatePhone = async (payload) => {
    try {
        const id = getID();
        const token = getToken();
        const response = await fetch(`${config.baseURL}/update/phone`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return {statusCode: response.status, data: data};
        
    } catch (error) {
        console.error(error);
        return {statusCode: 500, data: {error: "Error Connecting to Server"}};

    }
}


export const UserApi = {
    Login,
    Register,
    getProfile,
    getAllUsers,
    updateUsername,
    updatePassword,
    updateEmail,
    updatePhone
};
