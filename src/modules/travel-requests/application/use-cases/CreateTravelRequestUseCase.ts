import {inject, injectable} from 'inversify'
import type {ITravelRequestRepository} from '@/modules/travel-requests/domain/repositories/ITravelRequestRepository'
import type {CreateTravelRequestDTO, TravelRequest} from '@/modules/travel-requests/domain/entities/TravelRequest'
import {TYPES} from '@/core/di/types'

@injectable()
export class CreateTravelRequestUseCase {
    constructor(
        @inject(TYPES.ITravelRequestRepository) private repository: ITravelRequestRepository
    ) {
    }

    async execute(data: CreateTravelRequestDTO): Promise<TravelRequest> {
        return await this.repository.create(data)
    }
}