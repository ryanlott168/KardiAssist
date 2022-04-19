import express from 'express';
import { isLoggedIn, isAdmin } from '../middleware/authMiddleware';
import { parseUserData } from '../middleware/user';
import { getStudies, getStudyNames, createStudy, updateStudy, deleteStudy } from '../controllers/studies';
import path from 'path';

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    // Create new study
    try {
        const studies = await getStudies();
        res.status(200).send(studies);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/names', isLoggedIn, async (req, res) => {
    try {
        const studyNames = await getStudyNames();
        res.status(200).send(studyNames);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Create new study
router.post('/', isAdmin, async (req, res) => {
    // Create new study
    console.log(req.body);
    try {
        await createStudy(req.body);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update study Info
router.put('/:id', isAdmin, async (req, res) => {
    const taskId = path.basename(req.url);
    try {
        await updateStudy(taskId, req.body);
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(500);
    }
});

// Delete existing study
router.delete('/:id', isAdmin, async (req, res) => {
    console.log('DELETING!!!!!!')
    const taskId = path.basename(req.url);
    const result = await deleteStudy(taskId);
    if(result.deletedCount === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

export default router;