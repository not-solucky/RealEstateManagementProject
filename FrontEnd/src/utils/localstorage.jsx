import { jwtDecode } from "jwt-decode";

export const token_key = "nest_navigator_token";
export const user_profile = "nest_navigator_profile";


export const setToken = token => {
    window.localStorage.setItem(token_key, token)
}

export const setProfile = profile => {
    window.localStorage.setItem(user_profile, JSON.stringify(profile))
}

export const getProfile = () => {
    let profile = window.localStorage.getItem(user_profile)
    if (!!profile) return JSON.parse(profile)
        return false
}

export const getToken = () => {
    let token = window.localStorage.getItem(token_key)
    if (!!token) return token
        return false
}

export const getID = () => {
    let token = getToken()
    if (!!token) {
        const data = jwtDecode(token)

        return data.userID

    }
    return false
}

export const getRole = () => {
    let token = getToken()
    if (!!token) {
        const data = jwtDecode(token)
        return data.role
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