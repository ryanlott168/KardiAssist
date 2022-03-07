import express from 'express';
import { isLoggedIn } from '../middleware/authMiddleware';
import { getFollowUpTasks, createFollowUpTask } from '../controllers/followUpTask';
import FollowUpTask from '../interfaces/FollowUpTask';

const router = express.Router();

router.get('/tasks', isLoggedIn, async (req, res) => {
    let tasks: FollowUpTask[];

    try {
        const tasks = await getFollowUpTasks(req.user['_id']);
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/task', isLoggedIn, async (req, res) => {
    try {
        req.body.createdBy = req.user['_id'];
        await createFollowUpTask(req.body);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;