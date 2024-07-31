import { config } from "../utils/config";
import { getToken, setToken } from "../utils/localstorage";
import { getID } from "../utils/localstorage";

const buildQueryParams = (filters) => {
    const query = new URLSearchParams();
    for (const key in filters) {
        if (Array.isArray(filters[key])) {
            // If the filter value is an array, append each value separately
            filters[key].forEach(value => query.append(key, value));
        } else if (filters[key] !== undefined && filters[key] !== null) {
            query.append(key, filters[key]);
        }
    }
    return query.toString();
};

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

const GetSaleProperties = async (filter) => {
    try {
        const query = buildQueryParams(filter);
        const response = await fetch(`${config.baseURL}/getsaleproperty?${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return {statusCode: response.status, data: data};
    } catch (error) {
        console.error(error);
        return {statusCode: 500, data: {error: "Error Connecting to Server"}};

    }
}

export const PropertyApi = {
    AddProperty,
    GetSaleProperties,
}