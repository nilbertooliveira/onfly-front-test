import axios, {type AxiosInstance} from 'axios'
import {useAuthStore} from '@/shared/stores/authStore'

class HttpClient {
    private static instance: AxiosInstance

    static getInstance(): AxiosInstance {
        if (!HttpClient.instance) {
            HttpClient.instance = axios.create({
                baseURL: import.meta.env.VITE_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })

            HttpClient.instance.interceptors.request.use(config => {
                const authStore = useAuthStore()
                if (authStore.token) {
                    config.headers.Authorization = `Bearer ${authStore.token}`
                }
                return config
            })

            HttpClient.instance.interceptors.response.use(
                response => response,
                error => {
                    if (error.response?.status === 401) {
                        const authStore = useAuthStore()
                        authStore.clearAuth()
                        window.location.href = '/login'
                    }
                    return Promise.reject(error)
                }
            )
        }

        return HttpClient.instance
    }
}

export default HttpClient