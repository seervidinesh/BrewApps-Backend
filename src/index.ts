/* eslint-disable fp/no-throw */
/* eslint-disable no-console */
/* eslint-disable fp/no-nil */
import * as Server from './server';
import config from './config';
import { logger } from './logger';
import _ from 'ramda';

// Catch unhandled unexpected exceptions
process.on('uncaughtException', (error: Error) => {
    logger.error({ error: error, type: 'uncaughtException' });
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandled rejected promises
process.on('unhandledRejection', (reason: any) => {
    logger.error({ reason: reason, type: 'unhandledRejection' });
    console.error(`unhandledRejection ${reason}`);
});

const start = async () => {
    try {
        const { server } = await Server.init(config);
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err: any) {
        console.error('Error starting server: ', err.message);
        throw err;
    }
};

start();
