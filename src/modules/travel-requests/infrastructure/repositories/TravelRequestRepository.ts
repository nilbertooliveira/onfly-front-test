import {injectable} from 'inversify'
import type {ITravelRequestRepository} from '@/modules/travel-requests/domain/repositories/ITravelRequestRepository'
import type {CreateTravelRequestDTO, TravelRequest} from '@/modules/travel-requests/domain/entities/TravelRequest'
import type {TravelRequestFilters} from '@/modules/travel-requests/domain/entities/TravelRequestFilters'
import HttpClient from '@/modules/auth/infrastructure/http/HttpClient'

@injectable()
export class TravelRequestRepository implements ITravelRequestRepository {
    private httpClient = HttpClient.getInstance()

    async list(filters?: TravelRequestFilters): Promise<TravelRequest[]> {
        const {data} = await this.httpClient.get<{ data: TravelRequest[] }>(
            '/travel-requests',
            {params: filters}
        )
        return data.data
    }

    async getById(id: string): Promise<TravelRequest> {
        const {data} = await this.httpClient.get<{ data: TravelRequest }>(
            `/travel-requests/${id}`
        )
        return data.data
    }

    async create(travelRequestData: CreateTravelRequestDTO): Promise<TravelRequest> {
        const {data} = await this.httpClient.post<{ data: TravelRequest }>(
            '/travel-requests',
            travelRequestData
        )
        return data.data
    }

    async updateStatus(id: number, status: 'approved' | 'canceled'): Promise<TravelRequest> {
        const {data} = await this.httpClient.put<{ data: TravelRequest }>(
            `/travel-requests/${id}`,
            {status}
        )
        return data.data
    }
}