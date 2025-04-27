import axios from "axios";


export const authApi = axios.create({
    baseURL:'https://animated-crud-app-server.onrender.com/api/auth',
    headers: { 'Content-Type': 'application/json' }
})

export const memberApi = axios.create({
    baseURL:'https://animated-crud-app-server.onrender.com/api/member',
    headers: { 'Content-Type': 'application/json' }
})

