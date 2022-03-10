import express from 'express';
import routes from './routes';

const router = express.Router();

router.use('/auth', routes.authRoutes);
router.use('/user', routes.userRoutes);
router.use('/follow_up', routes.followUpRoutes);

router.delete('/session', (req, res) => {
    req.logout();
    req.session.destroy(err => {
        console.log(err);
    });
    
    res.sendStatus(202);
})

export default router;