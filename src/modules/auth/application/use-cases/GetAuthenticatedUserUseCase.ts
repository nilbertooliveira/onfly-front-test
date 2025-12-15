import {inject, injectable} from 'inversify'
import type {IAuthRepository} from '@/modules/auth/domain/repositories/IAuthRepository'
import type {User} from '@/modules/auth/domain/entities/User'
import {TYPES} from '@/core/di/types'

@injectable()
export class GetAuthenticatedUserUseCase {
    constructor(
        @inject(TYPES.IAuthRepository) private authRepository: IAuthRepository
    ) {
    }

    async execute(): Promise<User> {
        return await this.authRepository.getAuthenticatedUser()
    }
}