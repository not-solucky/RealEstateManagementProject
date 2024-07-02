import axios from 'axios';
import { useContext } from 'react';


const api = "http://192.168.0.104:8080/api/v1"; // Adjust the API base URL as needed

export const Allapi = axios.create({
    baseURL: api, // Ensure the correct base URL is set
    headers: {
        "Content-Type": "application/json",
    },
});

export const Protectedapi = axios.create({
    baseURL: api, // Ensure the correct base URL is set
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("nestnavigatortoken")}`,
    },
});