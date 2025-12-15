export const TYPES = {
    IAuthRepository: Symbol.for('IAuthRepository'),
    LoginUseCase: Symbol.for('LoginUseCase'),
    LogoutUseCase: Symbol.for('LogoutUseCase'),
    GetAuthenticatedUserUseCase: Symbol.for('GetAuthenticatedUserUseCase'),

    ITravelRequestRepository: Symbol.for('ITravelRequestRepository'),
    ListTravelRequestsUseCase: Symbol.for('ListTravelRequestsUseCase'),
    CreateTravelRequestUseCase: Symbol.for('CreateTravelRequestUseCase'),
    UpdateTravelRequestStatusUseCase: Symbol.for('UpdateTravelRequestStatusUseCase'),
}