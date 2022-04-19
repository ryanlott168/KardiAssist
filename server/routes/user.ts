import express from 'express';
import { isLoggedIn, isAdmin } from '../middleware/authMiddleware';
import { parseUserData } from '../middleware/user';
import { createUser } from '../controllers/users';

interface ReturnUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin?: boolean;
}

const router = express.Router();

router.get('/', isLoggedIn, parseUserData, (req, res) => {
    res.status(200).send(req.user);
});

router.post('/', isAdmin, async (req, res) => {
    // Create user
    const userInfo = req.body.user;
    try {
        await createUser(userInfo);
    } catch (err) {
        res.sendStatus(409);
    }

    res.sendStatus(200);
});

export default router;