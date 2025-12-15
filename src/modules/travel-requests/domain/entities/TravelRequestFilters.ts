export interface TravelRequestFilters {
    status?: 'requested' | 'approved' | 'canceled'
    start_date?: string
    end_date?: string
    destination_id?: string
}