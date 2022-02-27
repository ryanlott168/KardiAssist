import express from 'express';
import { isLoggedIn, isAdmin } from '../middleware/authMiddleware';
import { getFollowUpTasks, createFollowUpTask } from '../controllers/followUpTask';
import FollowUpTask from '../interfaces/FollowUpTask';

const router = express.Router();

router.get('/tasks', isLoggedIn, async (req, res) => {
    let tasks: FollowUpTask[];
    try {
        tasks = await getFollowUpTasks(req.user['_id'])
    } catch(err) {
        res.status(500).send(err);
    }
    res.status(200).send(tasks);
});

router.post('/tasks', isLoggedIn, async (req, res) => {
    try {
        req.body.task.createdBy = req.user['_id'];
        await createFollowUpTask(req.body.task);
    } catch(err) {
        res.status(500).send(err);
    }
    res.sendStatus(201);
});