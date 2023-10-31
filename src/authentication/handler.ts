import Bcrypt from 'bcrypt';
import { Either, isLeft, left, right } from 'fp-ts/lib/Either';
import jwt from 'jsonwebtoken';
import _ from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import * as UserRepo from '../../src/user/repo';
import * as repo from './repo';
import { LoginDetails, LoginResponse, AuthenticationHandler } from './types';
import { AuthError } from '../../src/responses/types';

const getUserToken = async (jwtSecret, user) => {
    const sessionId = uuidv4();
    await repo.saveSession(sessionId, user.right._id);
    const jwtToken = jwt.sign(
        { userId: user.right._id.toString(), scope: user.right.roles, sessionId: sessionId },
        jwtSecret,
    );
    return jwtToken;
};

export default function authenticationHandler(env): AuthenticationHandler {
    return {
        login: async (loginDetails: LoginDetails): Promise<Either<AuthError, LoginResponse>> => {
            try {
                let user = await UserRepo.getUserByPhone(loginDetails.phone);
                if(isLeft(user)) return left('invalidCredentials');
                const match = await Bcrypt.compare(
                    loginDetails.password,
                    user.right.password || '',
                );
                
                if (!match) return left('invalidCredentials');
                const jwtToken: string = await getUserToken(env.config.JWT_SECRET, user);
                return right({ authToken: jwtToken, userId: user.right._id.toString() });
            } catch (error) {
                console.error(error);
                return left('serverError');
            }
        },
        getUserToken: (user) => getUserToken(env.config.JWT_SECRET, user),
        validateJWTToken: async (credentials, request, h) => {
            const currentSession = await repo.getSessionBySessionId(credentials.sessionId);
            if (_.isNil(currentSession)) { return { isValid: false } }
            return { isValid: true };
        },
        logout: async (sessionId) => await repo.deleteSession(sessionId)
    };
}