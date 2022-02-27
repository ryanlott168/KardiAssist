import express from 'express';
import { createUser } from '../controllers/users'


interface ReturnUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin?: boolean;
}

const router = express.Router();


router.get('/', (req, res) => {
    if(!req.user) {
        res.sendStatus(401);
    } else {

        const userInfo: ReturnUserInfo = {
            firstName: req.user['firstName'],
            lastName: req.user['lastName'],
            email: req.user['email']
        }

        if(req.user['isAdmin']) userInfo.isAdmin = true;

        res.status(200).send(userInfo);
    }
});

router.post('/', async (req, res) => {
    if(!req.user || !req.user['isAdmin']) {
        res.sendStatus(401);
    } else {
        // Create user
        const userInfo = req.body.user;
        try {
            await createUser(userInfo);
        } catch (err) {
            res.sendStatus(409);
        }

        res.sendStatus(200);
    }
});

export default router;