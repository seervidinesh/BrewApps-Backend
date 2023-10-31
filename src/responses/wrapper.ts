import { ErrorEvent } from './types';
import { errorObject } from './errors';

export const wrapError = (errorEvent: any | ErrorEvent, message: string = '') => {
    if (!!message) {
        return { code: errorEvent, message }
    }
    if (errorEvent in errorObject) {
        return errorObject[errorEvent];
    }
    return { code: errorEvent };
};