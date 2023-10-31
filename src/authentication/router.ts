import * as Hapi from '@hapi/hapi';
import { isLeft } from 'fp-ts/lib/Either';
import { userLoggedInEvent, userLoggedInFailed } from '../logEvents';
import { loginSchema, Role, AuthenticationHandler } from './types';
import { wrapError } from '../responses/wrapper';

export default function (server: Hapi.Server, authenticationHandler: AuthenticationHandler) {
    server.route({
        method: 'POST',
        path: '/auth/login',
        options: {
            handler: async (request, h) => {
                const response = await authenticationHandler.login(request.payload);
                if (isLeft(response)) {
                    userLoggedInFailed(response.left);
                    return h.response({ error: wrapError(response.left) }).code(401);
                }
                userLoggedInEvent(response.right.userId);
                return h.response(response.right).code(200);
            },
            auth: false,
            validate: {
                payload: loginSchema
            },
            tags: ['api', 'auth'],
            description: 'Login',
            notes: 'Login api  ',
        },
    });
    server.route({
        method: 'POST',
        path: '/auth/logout',
        options: {
            handler: async (request, h) => {
                authenticationHandler.logout(request.auth.credentials.sessionId);
                return h.response({
                    status: 'success',
                    message: 'User logged out'
                }).code(200);
            },
            tags: ['api', 'auth'],
            description: 'logout',
            notes: 'Logout the user',
            auth: {
                scope: [Role.Admin, Role.Student],
            },
        },
    });
}
