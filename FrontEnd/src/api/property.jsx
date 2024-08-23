import { config } from "../utils/config";
import { getToken } from "../utils/localstorage";

const buildQueryParams = (filters) => {
    const query = new URLSearchParams();
    for (const key in filters) {
        if (Array.isArray(filters[key])) {
            // If the filter value is an array, append each value separately
            filters[key].forEach((value) => query.append(key, value));
        } else if (filters[key] !== undefined && filters[key] !== null) {
            query.append(key, filters[key]);
        }
    }
    return query.toString();
};
const AddProperty = async (payload) => {
    const token = getToken();
    try {
        var type = payload.property_category;
        const response = await fetch(`${config.baseURL}/property/create/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return { statusCode: response.status, data: data };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
};
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
        return { statusCode: response.status, data: data };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
};
const GetRentProperties = async (filter) => {
    try {
        const query = buildQueryParams(filter);
        const response = await fetch(`${config.baseURL}/getrentproperty?${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return { statusCode: response.status, data: data };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
};
const AdminGetAllProperty = async (filter) => {
    const token = getToken();
    try {
        const query = buildQueryParams(filter);
        const response = await fetch(`${config.baseURL}/admin/getallproperty?${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,

            },
        });
        const data = await response.json();
        return { statusCode: response.status, data: data };
    }
    catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
};
const DashGetActiveListings = async () => {
    const token = getToken();
    try {
        const response = await fetch(`${config.baseURL}/dashboard/getactivelistings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,

            },
        });
        const data = await response.json();
        return { statusCode: response.status, data: data };
    }
    catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
};
const DashGetPendingListings = async () => {
    const token = getToken();
    try {
        const response = await fetch(`${config.baseURL}/dashboard/getpendinglistings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,

            },
        });
        const data = await response.json();
        return { statusCode: response.status, data: data };
    }
    catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
};

const DashGetPendingAllproperties = async (page) => {
    const token = getToken();
    try {
        const response = await fetch(`${config.baseURL}/dashboard/getallpendingproperty/${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,

            },
        });
        const data = await response.json();
        return { statusCode: response.status, data: data };
    }
    catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
};

const GetPropertyById = async (id) => {
    try {
        const response = await fetch(`${config.baseURL}/getproperty/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return { statusCode: response.status, data: data };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
};

const GetDocument = async (id) => {
    const token = getToken();
    try {
        const response = await fetch(`${config.baseURL}/dashboard/getdocument/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,

            },
        });
        const data = await response.json();
        return { statusCode: response.status, data: data };
    }
    catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
}

const SubmitDocument = async (payload) => {
    const token = getToken();
    try {
        const response = await fetch(`${config.baseURL}/dashboard/submitdocument`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return { statusCode: response.status, data: data };
    }
    catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
}

const updateVerificationProperty = async (payload) => {
    // payload = {property_id: "property_id", status: "verified", message: "message" required if rejected`}
    const token = getToken();
    try {
        const response = await fetch(`${config.baseURL}/dashboard/verifyproperty`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        return { statusCode: response.status, data: data };
    }
    catch (error) {
        console.error(error);
        return { statusCode: 500, data: { error: "Error Connecting to Server" } };
    }
}
export const PropertyApi = {
    AddProperty,
    GetSaleProperties,
    GetRentProperties,
    AdminGetAllProperty,
    DashGetActiveListings,
    DashGetPendingListings,
    GetPropertyById,
    GetDocument,
    SubmitDocument,
    DashGetPendingAllproperties,
    updateVerificationProperty
};
