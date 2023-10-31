import config from '../../src/config';
import { init } from '../../src/server';
import _ from 'ramda';

// drop all collections
import { UserModel } from '../../src/user/schema';
import { BooksModel } from '../../src/books/schema';
// eslint-disable-next-line no-var
var testEnv: undefined | any;

async function resetDB() {
    await UserModel.deleteMany();
    await BooksModel.deleteMany();
}

async function initTestServer() {
    const updateConfig = _.mergeRight(config, {});
    const { server, handlers } = await init(updateConfig);
    return {
        server,
        resetDB: resetDB,
        authHandler: handlers.authHandler,
        userHandler: handlers.userHandler,
        bookHandler: handlers.bookHandler,
    };
}

export async function getTestEnv() {
    if (testEnv === undefined) {
        // eslint-disable-next-line fp/no-mutation
        testEnv = await initTestServer();
    }
    return testEnv;
}
