import * as Joi from 'joi';
import { Role } from '../authentication/types';

export const signUpSchema = Joi.object({
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    name: Joi.string().required(),
    roles: Joi.array().items(...Object.values(Role)).required(),
    password: Joi.string().required().min(6).max(18)
});

export interface NewUser {
    name: string;
    phone: string;
    roles: Role[];
    password: string;
}

export type UserRegistrationError =
    | 'userAlreadyExist'
    | 'passwordHashingFailed'
    | 'inValidPhoneNumber'
    | 'serverError'

export type UserID = Number;

export interface User {
    createdAt?: string,
    _id: string;
    name: string;
    phone: string;
    id: string;
    roles: Role[];
}

export interface UserWithPassword extends User {
    password?: string;
}