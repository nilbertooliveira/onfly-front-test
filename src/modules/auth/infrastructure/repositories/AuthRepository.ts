import {injectable} from 'inversify'
import type {IAuthRepository, LoginCredentials, LoginResponse} from '@/modules/auth/domain/repositories/IAuthRepository'
import type {User} from '@/modules/auth/domain/entities/User'
import HttpClient from '../http/HttpClient'
import {useAuthStore} from '@/shared/stores/authStore'

@injectable()
export class AuthRepository implements IAuthRepository {
    private httpClient = HttpClient.getInstance()

    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await this.httpClient.post<LoginResponse>('/auth/login', credentials)

        const authStore = useAuthStore()

        authStore.setAuth(
            response.data.data.access_token,
            {
                id: response.data.data.id,
                email: response.data.data.email,
                name: response.data.data.name
            }
        )

        return response.data
    }

    async logout(): Promise<void> {
        try {
            await this.httpClient.post('/auth/logout')
        } finally {
            useAuthStore().clearAuth()
        }
    }

    async getAuthenticatedUser(): Promise<User> {
        const {data} = await this.httpClient.get<User>('/auth/me')
        return data
    }
}