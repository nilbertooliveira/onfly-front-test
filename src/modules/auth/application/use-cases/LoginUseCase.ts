import {inject, injectable} from 'inversify'
import type {IAuthRepository} from '@/modules/auth/domain/repositories/IAuthRepository'
import {TYPES} from '@/core/di/types'

@injectable()
export class LoginUseCase {
    constructor(
        @inject(TYPES.IAuthRepository) private authRepository: IAuthRepository
    ) {
    }

    async execute(email: string, password: string): Promise<void> {
        await this.authRepository.login({email, password})
    }
}