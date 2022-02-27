import mongoose from 'mongoose';
import user from './user';

mongoose.Promise = global.Promise;

const db = {
    mongoose,
    user
};

export default db;