import dotenv from 'dotenv';
import _ from 'ramda';

dotenv.config();

// Without Trailing /
const BASE_URL = process.env.BASE_URL || 'http://0.0.0.0:4000';

const Config = {
    // Server Configs
    BASE_URL,
    PORT: process.env.PORT || 4000,
    JWT_SECRET:
        process.env.JWT_SECRET ||
        'pp~f}dbkwd]k1qpp@n1<:lljptymffd]k1q~f}dbkwdt>',

    LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'debug',
    NODE_ENV: process.env.NODE_ENV || '',
    DB_CONNECTION_URI: process.env.DB_CONNECTION_URI || ''
};

const Test = _.mergeRight(Config, {
    APP_ENV: 'Test',
    DB_CONNECTION_URI: process.env.TEST_DB_CONNECTION_URI,
});

const Dev = _.mergeRight(Config, {
    APP_ENV: 'Dev',
    DB_CONNECTION_URI: process.env.DB_CONNECTION_URI,
});

// eslint-disable-next-line fp/no-nil, func-names
export = (function () {
    console.log(`Env = ${process.env.NODE_ENV}`);
    switch (process.env.NODE_ENV?.trim()) {
    case 'Test':
        return Test;
    default:
        return Dev;
    }
})();
