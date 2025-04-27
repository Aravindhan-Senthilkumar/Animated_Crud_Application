import axios from "axios";


export const authApi = axios.create({
    baseURL:'http://192.168.29.24:5000/api/auth',
    headers: { 'Content-Type': 'application/json' }
})

export const memberApi = axios.create({
    baseURL:'http://192.168.29.24:5000/api/member',
    headers: { 'Content-Type': 'application/json' }
})

