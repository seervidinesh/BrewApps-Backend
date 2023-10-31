export type ErrorEvent =
    | UserEvents
    | AuthError

export type UserEvents = 
    | 'userCreated'

export type AuthError = 
    | 'invalidCredentials'
    | 'invalidRole'
    | 'serverError'