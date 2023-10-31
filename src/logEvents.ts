import { logger } from './logger';

export type EventName =
    | UserEvents

export type UserEvents =
    | 'user-account-created'
    | 'user-account-creation-failed'
    | 'user-login-successful'
    | 'user-login-failed'

export function logEvent(eventName: EventName, eventData: any, level: string = 'info') {
    logger.log(level, { eventName, eventData });
}

// User events
export function userAccountCreated(userDetails) {
    logEvent('user-account-created', userDetails);
}

export function userAccountCreationFailed(d) {
    logEvent('user-account-creation-failed', d);
}

export function userLoggedInEvent(userId) {
    logEvent('user-login-successful', { userId: userId });
}

export function userLoggedInFailed(reason) {
    logEvent('user-login-failed', { reason });
}