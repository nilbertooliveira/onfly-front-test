import {inject, injectable} from 'inversify'
import type {ITravelRequestRepository} from '@/modules/travel-requests/domain/repositories/ITravelRequestRepository'
import type {TravelRequest} from '@/modules/travel-requests/domain/entities/TravelRequest'
import type {TravelRequestFilters} from '@/modules/travel-requests/domain/entities/TravelRequestFilters'
import {TYPES} from '@/core/di/types'

@injectable()
export class ListTravelRequestsUseCase {
    constructor(
        @inject(TYPES.ITravelRequestRepository)
        private repository: ITravelRequestRepository
    ) {
    }

    async execute(filters?: TravelRequestFilters): Promise<TravelRequest[]> {
        return await this.repository.list(filters)
    }
}