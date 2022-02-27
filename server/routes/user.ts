import express from 'express';
import { parseUserData } from '../middleware/user';
import { createUser } from '../controllers/users';
import { isLoggedIn, isAdmin } from '../middleware/authMiddleware';


interface ReturnUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin?: boolean;
}

const router = express.Router();


router.get('/', isLoggedIn, parseUserData, (req, res) => {
    // const userInfo: ReturnUserInfo = {
    //     firstName: req.user['firstName'],
    //     lastName: req.user['lastName'],
    //     email: req.user['email']
    // }

    // if(req.user['isAdmin']) userInfo.isAdmin = true;

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