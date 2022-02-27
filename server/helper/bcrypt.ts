import bcrypt from 'bcryptjs';

export async function hashPassword (password: string) {
    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS);
    return await bcrypt.hash(password, saltRounds)
}