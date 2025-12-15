export type TravelRequestStatus = 'requested' | 'approved' | 'canceled'

export interface TravelRequest {
    id: number
    userId: number
    userName: string
    destinationId: number
    destinationName: string
    startDate: string
    endDate: string
    status: TravelRequestStatus
    role: string
}

export interface CreateTravelRequestDTO {
    destinationId: number
    startDate: string
    endDate: string
}