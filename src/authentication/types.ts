import { Either } from 'fp-ts/lib/Either';
import * as Joi from 'joi';
import { AuthError } from '../responses/types';

export enum Role {
    Admin = 'ADMIN',
    Student = 'STUDENT'
}

export const loginSchema = Joi.object({
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    password: Joi.string().required().min(6).max(18)
});

export interface LoginDetails {
    phone: string;
    password: string;
    name: string;
}

export interface LoginResponse {
    authToken: string;
    userId: string;
}


export interface AuthenticationHandler {
    login(loginDetails: LoginDetails): Promise<Either<AuthError, LoginResponse>>;
    getUserToken(user): Promise<string>;
    validateJWTToken(credentials, request, h): Promise<{ isValid: boolean }>;
    logout(sessionId): void;
}