import { hashPassword } from '../helper/bcrypt';
import db from'../models';
const User = db.user;

interface CreateUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    admin?: boolean;
}

// Retrieve User
export async function getUser (email: string) {
    return await User.findOne({email});
}

// Create User
export async function createUser (userInfo: CreateUserInfo) {
    const hashedPassword = await hashPassword(userInfo.password);
    userInfo.password = hashedPassword;

    const user = new User(userInfo);
    await user.save(err => {
        if(err) {
            console.error('User could not be created', err);
            throw err;
        }
    });
}