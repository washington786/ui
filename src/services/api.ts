import axios from 'axios'
import { TOKEN } from '../utils/AuthVals'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})