import express from 'express';
import routes from './routes';

interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin?: boolean;
}

const router = express.Router();

router.use('/auth', routes.authRoutes);
router.use('/user', routes.userRoutes);

// router.get('/user', (req, res) => {
//     if(!req.user) {
//         res.sendStatus(404);
//     } else {

//         const userInfo: UserInfo = {
//             firstName: req.user['firstName'],
//             lastName: req.user['lastName'],
//             email: req.user['email']
//         }

//         if(req.user['admin']) userInfo.isAdmin = true;

//         res.status(200).send(userInfo);
//     }
// });

router.delete('/session', (req, res) => {
    req.logout();
    req.session.destroy(err => {
        console.log(err);
    });
    
    res.sendStatus(202);
})

export default router;