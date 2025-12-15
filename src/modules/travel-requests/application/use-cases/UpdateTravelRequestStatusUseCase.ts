import {inject, injectable} from 'inversify'
import type {ITravelRequestRepository} from '@/modules/travel-requests/domain/repositories/ITravelRequestRepository'
import {TYPES} from '@/core/di/types'

@injectable()
export class UpdateTravelRequestStatusUseCase {
    constructor(
        @inject(TYPES.ITravelRequestRepository) private repository: ITravelRequestRepository
    ) {
    }

    async execute(id: number, status: 'approved' | 'canceled'): Promise<void> {
        await this.repository.updateStatus(id, status)
    }
}