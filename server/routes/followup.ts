import express from 'express';
import path from 'path';
import { isLoggedIn } from '../middleware/authMiddleware';
import { getFollowUpTasks, createFollowUpTask, deleteFollowUpTask, updateFollowUpTask } from '../controllers/followUpTask';
import { FollowUpTask } from '../interfaces/FollowUpTask';

const router = express.Router();

// Route to get all follow-up tasks associated w/ logged in user
router.get('/tasks', isLoggedIn, async (req, res) => {
    let tasks: FollowUpTask[];

    try {
        const tasks = await getFollowUpTasks(req.user['_id']);
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route to post a new follow-up task to database
router.post('/task', isLoggedIn, async (req, res) => {
    try {
        req.body.createdBy = req.user['_id'];
        await createFollowUpTask(req.body);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route to update an existing follow-up task in the database
router.put('/task/:id', isLoggedIn, async (req, res) => {
    const taskId = path.basename(req.url);
    try {
        await updateFollowUpTask(taskId, req.user['_id'], req.body);
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(500);
    }
    
});

// Route to delete an existing follow-up task in the database
router.delete('/task/:id', isLoggedIn, async (req, res) => {
    const taskId = path.basename(req.url);
    const result = await deleteFollowUpTask(taskId, req.user['_id'])
    if(result.deletedCount === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

export default router;