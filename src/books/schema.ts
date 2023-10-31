import mongoose from "mongoose";
const Schema = mongoose.Schema;


const BooksSchema = new Schema({
    name: { type: String, require: true },
    author: { type: String, require: true },
    category: [{ type: String }],
    tags: [{ type: String }]
});

export const BooksModel = mongoose.model('Books', BooksSchema);