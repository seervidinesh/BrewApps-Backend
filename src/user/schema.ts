import mongoose from "mongoose";
import { Role } from "../authentication/types";
const Schema = mongoose.Schema;

const RolesSchema = new Schema({roles: { type: String, enum:[...Object.keys(Role)]}});

const UserSchema = new Schema({
    name: { type: String, require: true },
    phone: { type: String, require: true, unique : true },
    password: { type: String, require: true },
    roles: [{ type: String, refs: RolesSchema }]
});

export const UserModel = mongoose.model('User', UserSchema);