export interface TravelDestination {
    id: number | ''
    name: string
}

export const travelDestinations: TravelDestination[] = [
    {id: '', name: 'Selecione um destino'},
    {id: 1, name: 'São Paulo'},
    {id: 2, name: 'Rio de Janeiro'},
    {id: 3, name: 'Brasília'},
    {id: 4, name: 'Salvador'},
    {id: 5, name: 'Recife'},
    {id: 6, name: 'Fortaleza'},
    {id: 7, name: 'Florianópolis'},
    {id: 8, name: 'Belo Horizonte'},
    {id: 9, name: 'Curitiba'},
    {id: 10, name: 'Porto Alegre'}
]