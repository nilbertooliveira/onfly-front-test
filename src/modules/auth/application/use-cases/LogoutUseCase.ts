import {inject, injectable} from 'inversify'
import type {IAuthRepository} from '@/modules/auth/domain/repositories/IAuthRepository'
import {TYPES} from '@/core/di/types'

@injectable()
export class LogoutUseCase {
    constructor(
        @inject(TYPES.IAuthRepository) private authRepository: IAuthRepository
    ) {
    }

    async execute(): Promise<void> {
        await this.authRepository.logout()
    }
}