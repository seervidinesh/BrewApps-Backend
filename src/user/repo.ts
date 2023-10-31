import * as _ from 'ramda';
import { Either, left, right } from 'fp-ts/lib/Either';
import { UserModel } from './schema';
import { NewUser, User, UserRegistrationError, UserWithPassword } from './types';

export const saveUser = async (d: NewUser): Promise<Either<UserRegistrationError, any>> => {
    const user = new UserModel({
        name: d.name,
        phone: d.phone,
        password: d.password,
        roles: d.roles
    })
    const result = await user.save();
    return right(result);
}

export const getUserByPhone = async (phone: string): Promise<Either<'userNotFound', UserWithPassword>> => {
    const user: any = await UserModel.findOne({ phone }).select({name: 1, phone: 1, _id: 1, roles: 1, password: 1});
    if(!_.isNil(user)) return right(user);
    return left('userNotFound');
}

export const getUserById = async (id: string): Promise<Either<'userNotFound', User>> => {
    const user: any = await UserModel.findById(id).select({name: 1, phone: 1, _id: 1, roles: 1});
    if(!_.isNil(user)) return right(user);
    return left('userNotFound');
}