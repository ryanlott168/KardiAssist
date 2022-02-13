import mongoose from 'mongoose';
import user from './user';
import role from './role';

mongoose.Promise = global.Promise;

const db = {
    mongoose,
    user,
    role,
    ROLES: ['user', 'admin', 'moderator']
};

export default db;