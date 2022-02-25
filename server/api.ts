import express from 'express';
import routes from './routes';

const router = express.Router();

router.use('/auth', routes.authRoutes);

router.get('/user', (req, res) => {
    if(!req.user) {
        res.sendStatus(404);
    } else {

        const userInfo = {
            firstName: req.user['firstName'],
            lastName: req.user['lastName'],
            email: req.user['email']
        }

        res.status(200).send(userInfo);
    }
});

router.delete('/session', (req, res) => {
    req.logout();
    req.session.destroy(err => {
        console.log(err);
    });
    
    res.sendStatus(202);
})

export default router;