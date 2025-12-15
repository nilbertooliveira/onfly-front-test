import type {CreateTravelRequestDTO, TravelRequest} from '../entities/TravelRequest'
import type {TravelRequestFilters} from '../entities/TravelRequestFilters'

export interface ITravelRequestRepository {
    list(filters?: TravelRequestFilters): Promise<TravelRequest[]>

    getById(id: string): Promise<TravelRequest>

    create(data: CreateTravelRequestDTO): Promise<TravelRequest>

    updateStatus(id: number, status: 'approved' | 'canceled'): Promise<TravelRequest>
}