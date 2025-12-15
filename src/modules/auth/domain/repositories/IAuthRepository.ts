import type {User} from '../entities/User'

export interface LoginCredentials {
    email: string
    password: string
}

export interface LoginResponse {
    data: {
        id: number
        email: string
        name: string
        access_token: string
        token_type: string
        expires_in: number
    }
}

export interface IAuthRepository {
    login(credentials: LoginCredentials): Promise<LoginResponse>

    logout(): Promise<void>

    getAuthenticatedUser(): Promise<User>
}