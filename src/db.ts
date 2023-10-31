import Mongoose from 'mongoose';
import config from './config';
Mongoose.connect(config.DB_CONNECTION_URI || '');
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Connection with database succeeded.'));
exports.db = db;