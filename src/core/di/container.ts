import 'reflect-metadata'
import {Container} from 'inversify'
import {TYPES} from './types'

import type {IAuthRepository} from '@/modules/auth/domain/repositories/IAuthRepository'
import {AuthRepository} from '@/modules/auth/infrastructure/repositories/AuthRepository'
import {LoginUseCase} from '@/modules/auth/application/use-cases/LoginUseCase'
import {LogoutUseCase} from '@/modules/auth/application/use-cases/LogoutUseCase'
import {GetAuthenticatedUserUseCase} from '@/modules/auth/application/use-cases/GetAuthenticatedUserUseCase'

import type {ITravelRequestRepository} from '@/modules/travel-requests/domain/repositories/ITravelRequestRepository'
import {TravelRequestRepository} from '@/modules/travel-requests/infrastructure/repositories/TravelRequestRepository'
import {ListTravelRequestsUseCase} from '@/modules/travel-requests/application/use-cases/ListTravelRequestsUseCase'
import {CreateTravelRequestUseCase} from '@/modules/travel-requests/application/use-cases/CreateTravelRequestUseCase'
import {
    UpdateTravelRequestStatusUseCase
} from '@/modules/travel-requests/application/use-cases/UpdateTravelRequestStatusUseCase'

const container = new Container()

container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository).inSingletonScope()
container.bind<LoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase)
container.bind<LogoutUseCase>(TYPES.LogoutUseCase).to(LogoutUseCase)
container.bind<GetAuthenticatedUserUseCase>(TYPES.GetAuthenticatedUserUseCase).to(GetAuthenticatedUserUseCase)

container.bind<ITravelRequestRepository>(TYPES.ITravelRequestRepository).to(TravelRequestRepository).inSingletonScope()
container.bind<ListTravelRequestsUseCase>(TYPES.ListTravelRequestsUseCase).to(ListTravelRequestsUseCase)
container.bind<CreateTravelRequestUseCase>(TYPES.CreateTravelRequestUseCase).to(CreateTravelRequestUseCase)
container.bind<UpdateTravelRequestStatusUseCase>(TYPES.UpdateTravelRequestStatusUseCase).to(UpdateTravelRequestStatusUseCase)

export {container}