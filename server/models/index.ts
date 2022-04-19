import mongoose from 'mongoose';
import user from './user';
import followUpTask from './followUpTask';
import study from './study';

mongoose.Promise = global.Promise;

const db = {
    mongoose,
    user,
    followUpTask,
    study
};

export default db;