import Bcrypt from 'bcrypt';
import { UserModel } from '../src/user/schema';
import { BooksModel } from '../src/books/schema';
import { Role } from '../src/authentication/types';

export const seed = async () => {
    try {
        const encryptedPassword = await Bcrypt.hash('Admin@123', 10);
        const users = [
            {
                name: 'Admin 01',
                phone: '7014966641',
                roles: [Role.Admin],
                password: encryptedPassword
            },
            {
                name: 'Admin 02',
                phone: '7014966642',
                roles: [Role.Admin],
                password: encryptedPassword
            },
            {
                name: 'Customer 01',
                phone: '7014966645',
                roles: [Role.Student],
                password: encryptedPassword
            },
            {
                name: 'Customer 02',
                phone: '7014966646',
                roles: [Role.Student],
                password: encryptedPassword
            }
        ]
        await UserModel.insertMany(users);

        const books = [
            {
                name: 'Book 01',
                tags: ["Electronics"]
            },
            {
                name: 'Book 02',
                tags: ["Electronics"]
            }
        ]

        await BooksModel.insertMany(books);

    } catch (error) {
        console.log(error);
    }
}