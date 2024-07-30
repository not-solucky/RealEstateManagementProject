import { config } from "../utils/config";
import { getToken, setToken } from "../utils/localstorage";
import { getID } from "../utils/localstorage";

const AddProperty = async (payload) => {
    const token = getToken();
    try {
        var type = payload.property_category
        const response = await fetch(`${config.baseURL}/property/create/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return {statusCode: response.status, data: data};
    } catch (error) {
        console.error(error);
        return {statusCode: 500, data: {error: "Error Connecting to Server"}};

    }
}

export const PropertyApi = {
    AddProperty
}