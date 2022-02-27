import mongoose from 'mongoose';
import user from './user';
import followUpTask from './followUpTask';

mongoose.Promise = global.Promise;

const db = {
    mongoose,
    user,
    followUpTask
};

export default db;