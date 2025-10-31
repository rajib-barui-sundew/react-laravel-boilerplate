import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS with credentials
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    const apiKey = import.meta.env.VITE_API_KEY
    if (apiKey) {
      config.headers['x-api-key'] = apiKey
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default axiosInstance
