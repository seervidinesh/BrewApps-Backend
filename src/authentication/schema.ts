import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    userId: mongoose.Schema.ObjectId,
    sessionId: String
});

export const SessionModel = mongoose.model('Session', SessionSchema);