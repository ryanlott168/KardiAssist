import axios from 'redaxios';
import { FollowUpTask } from '../../interfaces/task';

export async function fetchTasks (): Promise<FollowUpTask[]> {
    try {
        const res = await axios.get('/api/follow_up/tasks')
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function addTask (newTask: FollowUpTask) {
    try {
        return axios.post('/api/follow_up/task', newTask)
    } catch (err) {
        return err;
    }
}