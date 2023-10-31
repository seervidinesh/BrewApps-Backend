import * as _ from 'ramda';
import { Either, left, right } from 'fp-ts/lib/Either';
import { BooksModel } from './schema';
import { Book, BookCreateError, BookFetchError } from './types';

export const saveBook = async (d: Book): Promise<Either<BookCreateError, any>> => {
    const product = new BooksModel({
        name: d.name,
        author: d.author,
        category: d.category,
        tags: d.tags
    })
    const result = await product.save();
    return right(result);
}

export const fetchAllBooks = async (): Promise<Either<BookFetchError, Book[]>> => {
    const result: any = await BooksModel.find();
    return right(result);
}

export const fetchBookById = async (id: string): Promise<Either<BookFetchError, Book>> => {
    const result: any = await BooksModel.findById(id);
    if(_.isEmpty(result) || _.isNil(result)) return left('booksNotFound');
    return right(result);
}

export const updateBook = async (id: string, data): Promise<Either<BookFetchError, Book>> => {
    const result: any = await BooksModel.findOneAndUpdate({ _id: id }, data, { new: true });
    if(_.isEmpty(result) || _.isNil(result)) return left('booksNotFound');
    return right(result);
}

export const deleteBook = async (id: string): Promise<Either<BookFetchError, any>> => {
    const result: any = await BooksModel.deleteOne({ _id: id });
    if(_.isEmpty(result) || _.isNil(result)) return left('booksNotFound');
    return right(result);
}