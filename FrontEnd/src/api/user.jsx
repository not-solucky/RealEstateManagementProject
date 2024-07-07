import { config } from "../utils/config";
import { getToken, setToken } from "../utils/localstorage";

const Login = async (email, password) => {
    try {
        const response = await fetch(`${config.baseURL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const data = await response.json();
        if (data.token) {
            setToken(data.token);
        }
        return {statusCode: response.status, data: data};
    } catch (error) {
        console.error(error);
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
