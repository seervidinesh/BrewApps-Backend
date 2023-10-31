import { Either, isLeft, right, left } from 'fp-ts/lib/Either';
import * as _ from 'ramda';
import * as repo from './repo';
import { Book, BookCreateError, BookFetchError } from './types';


export interface BookInterface {
    saveBook(productData: Book): Promise<Either<BookCreateError, Book>>;
    fetchAllBooks(): Promise<Either<BookFetchError, Book[]>>;
    fetchBookById(sku: string): Promise<Either<BookFetchError, Book>>;
    updateBook(sku: string, price: number): Promise<Either<BookFetchError, Book>>;
    deleteBook(sku: string): Promise<Either<BookFetchError, any>>;
}

export class BookHandler implements BookInterface {
    async saveBook(productData: Book): Promise<Either<BookCreateError, Book>> {
        try {
            const result = await repo.saveBook({
                author: productData.author,
                name: productData.name,
                category: productData.category,
                tags: productData.tags
            });
            if (isLeft(result)) return left(result.left);
            return right(result.right);
        } catch (error) {
            return left('serverError');
        }
    }

    async fetchAllBooks(): Promise<Either<BookFetchError, Book[]>> {
        try {
            const result = await repo.fetchAllBooks();
            if (isLeft(result)) return left(result.left);
            return right(result.right);
        } catch (error) {
            return left('serverError');
        }
    }

    async fetchBookById(sku: string): Promise<Either<BookFetchError, Book>> {
        try {
            const result = await repo.fetchBookById(sku);
            if (isLeft(result)) return left(result.left);
            return right(result.right);
        } catch (error) {
            return left('serverError');
        }
    }

    async updateBook(id: string, data): Promise<Either<BookFetchError, Book>> {
        try {
            const result = await repo.updateBook(id, data);
            if (isLeft(result)) return left(result.left);
            return right(result.right);
        } catch (error) {
            return left('serverError');
        }
    }

    async deleteBook(id: string): Promise<Either<BookFetchError, any>> {
        try {
            const result = await repo.deleteBook(id);
            if (isLeft(result)) return left(result.left);
            return right(result.right);
        } catch (error) {
            return left('serverError');
        }
    }
}