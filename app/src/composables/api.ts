import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API;
const path = "dishes";

export default function useApi() {
    async function getMenus() {
        const response = await axios.get(`${API_URL}/${path}`);
        return response;
    }
    async function getMenuWithId(id: Number) {
        const response = await axios.get(`${API_URL}/${path}/${id}`);
        return response;
    }
    async function updateMenu(data: Record<string, any>) {
        const response = await axios.put(`${API_URL}/${path}`, data);
        return response;
    }
    async function deleteMenu(id: string, data: Record<string, any>) {
        const response = await axios.delete(`${API_URL}/${path}/${id}`, data);
        return response;
    }

    return {
        getMenus,
        updateMenu,
        getMenuWithId,
        deleteMenu,
    };
}
