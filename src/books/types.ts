import * as Joi from 'joi';

export const booksSchema = Joi.object({
    author: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.array().items(Joi.string()).optional().allow(null),
    tags: Joi.array().items(Joi.string()).optional().allow(null)
});

export interface Book {
    name: string;
    author: string;
    category: string[];
    tags: string[];
}

export type BookCreateError = 
    | 'bookAlreadyExists'
    | 'serverError'

export type BookFetchError = 
    | 'booksNotFound'
    | 'serverError'