import { config } from "../utils/config";
import { getToken, setToken } from "../utils/localstorage";
import axios from "axios";

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
        const response = await fetch(`${config.baseURL}/user/register`, {
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

}
export const UserApi = {
    Login,
    Register,
};
