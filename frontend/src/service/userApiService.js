// local impors
import apiClient from "@/app/api/apiClient.js"
import { API_ENDPOINTS } from "@/config/config"

export const register = async (formData) => {
    return await apiClient.post(API_ENDPOINTS?.REGISTER, formData).then((res) => {
        console.log("🚀 ~ register ~ res:", res)
        return res;
    })
}

export const login = async (formData) => {
    return await apiClient.post(API_ENDPOINTS?.LOGIN, formData).then((res) => {
        console.log("🚀 ~ login ~ res:", res)
        return res.data;
    })
}