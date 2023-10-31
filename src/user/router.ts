import * as Hapi from '@hapi/hapi';
import { UserHandler } from './handler'
import { isLeft } from 'fp-ts/lib/Either';
import { signUpSchema } from './types';
import { wrapError } from '../responses/wrapper'
import { Role } from '../authentication/types';


export default function (server: Hapi.Server, userHandler: UserHandler) {
    server.route({
        method: 'POST',
        path: '/user/signup',
        options: {
            handler: async (request, h) => {
                const signUpDetails = request.payload;
                const response = await userHandler.signUpUser(signUpDetails);
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: false,
            plugins: {
                reCaptcha: false,
            },
            tags: ['api', 'user'],
            validate: {
                payload: signUpSchema,
            },
            description: 'user',
            notes: 'sign up',
        },
    });

    server.route({
        method: 'GET',
        path: '/user/me',
        options: {
            handler: async (request, h) => {
                const response = await userHandler.userDetails(request.auth.credentials.userId);
                return h.response(response).code(200);
            },
            auth: {
                scope: [ Role.Student, Role.Admin ],
            },
            tags: ['api', 'user'],
            description: 'user',
            notes: 'User Details up',
        },
    });
}
