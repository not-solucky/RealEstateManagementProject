import { jwtDecode } from "jwt-decode";

export const token_key = "nest_navigator_token";


export const setToken = token => {
    window.localStorage.setItem(token_key, token)
}

export const getToken = () => {
    let token = window.localStorage.getItem(token_key)
    if (!!token) return token
        return false
}

export const getID = () => {
    let token = getToken()
    if (!!token) {
        data = jwtDecode(token)

        return data.userID

    }
    return false
}
export const isLogin = () => {
    if (!!getToken()) {
        return true;
    }
    return false;
};

export const logout = () => {
    window.localStorage.clear()
}