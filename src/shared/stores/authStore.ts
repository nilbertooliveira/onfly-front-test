import {defineStore} from 'pinia'
import type {User} from '@/modules/auth/domain/entities/User'

interface AuthState {
    token: string | null
    user: User | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('auth_token'),
        user: JSON.parse(localStorage.getItem('auth_user') || 'null')
    }),

    getters: {
        isAuthenticated: (state): boolean => !!state.token,
        currentUser: (state): User | null => state.user
    },

    actions: {
        setAuth(token: string, user: User): void {
            this.token = token
            this.user = user
            localStorage.setItem('auth_token', token)
            localStorage.setItem('auth_user', JSON.stringify(user))
        },

        clearAuth(): void {
            this.token = null
            this.user = null
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user')
        }
    },

    persist: true
})