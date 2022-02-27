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

router.delete('/session', (req, res) => {
    req.logout();
    req.session.destroy(err => {
        console.log(err);
    });
    
    res.sendStatus(202);
})

export default router;