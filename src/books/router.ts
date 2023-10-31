import * as Hapi from '@hapi/hapi';
import { BookHandler } from './handler'
import { isLeft } from 'fp-ts/lib/Either';
import { booksSchema } from './types';
import { wrapError } from '../responses/wrapper'
import { Role } from '../authentication/types';
import Joi from 'joi';


export default function (server: Hapi.Server, bookHandler: BookHandler) {
    // add new book to database
    server.route({
        method: 'POST',
        path: '/book/create',
        options: {
            handler: async (request, h) => {
                const { payload } = request;
                const response = await bookHandler.saveBook(payload);
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: {
                scope: [ Role.Admin ]
            },
            tags: ['api', 'Book'],
            validate: {
                payload: booksSchema,
            },
            description: 'Create new book',
            notes: 'Create new book',
        },
    });

    // GET all books
    server.route({
        method: 'GET',
        path: '/book/all',
        options: {
            handler: async (request, h) => {
                const response = await bookHandler.fetchAllBooks();
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: {
                scope: [ Role.Admin, Role.Student ]
            },
            tags: ['api', 'book'],
            description: 'Fetch all book',
            notes: 'Fetch all book',
        },
    });

    // GET book by SKU
    server.route({
        method: 'GET',
        path: '/book/{id}',
        options: {
            handler: async (request, h) => {
                const { id } = request.params;
                const response = await bookHandler.fetchBookById(id);
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: {
                scope: [ Role.Admin, Role.Student ]
            },
            tags: ['api', 'book'],
            validate: {
                params: Joi.object({
                    id: Joi.string()
                }),
            },
            description: 'Fetch book by id',
            notes: 'Fetch book by id',
        },
    });

    // PUT update book ID
    server.route({
        method: 'PUT',
        path: '/book/{id}',
        options: {
            handler: async (request, h) => {
                const { ...data } = request.payload;
                const { id } = request.params;
                const response = await bookHandler.updateBook(id, data);
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: {
                scope: [ Role.Admin ]
            },
            tags: ['api', 'book'],
            validate: {
                payload: booksSchema,
                params: Joi.object({
                    id: Joi.string()
                })
            },
            description: 'Update book data by id',
            notes: 'Update book data by id',
        },
    });

    // DELETE delete book 
    server.route({
        method: 'DELETE',
        path: '/book/{id}',
        options: {
            handler: async (request, h) => {
                const { id } = request.params;
                const response = await bookHandler.deleteBook(id);
                if (isLeft(response)) {
                    return h
                        .response({ error: wrapError(response.left) })
                        .code(400);
                }
                return h.response(response.right).code(200);
            },
            auth: {
                scope: [ Role.Admin ]
            },
            tags: ['api', 'book'],
            validate: {
                params: Joi.object({
                    id: Joi.string(),
                }),
            },
            description: 'delete book ',
            notes: 'delete book ',
        },
    });
}
