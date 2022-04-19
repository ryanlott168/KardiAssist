import axios from 'redaxios';
import { FollowUpTask, FollowUpTaskUpdate } from '../../interfaces/task';

export async function fetchTasks (): Promise<FollowUpTask[]> {
    try {
        const res = await axios.get('/api/follow_up/tasks');
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function addTask (newTask: FollowUpTask) {
    try {
        return axios.post('/api/follow_up/task', newTask);
    } catch (err) {
        return err;
    }
}

export async function updateTask (taskId: string, update: FollowUpTaskUpdate) {
    try {
        return axios.put(`/api/follow_up/task/${taskId}`, update);
    } catch (err) {
        return err;
    }
}

export async function deleteTask (taskId: string) {
    try {
        return axios.delete(`/api/follow_up/task/${taskId}`);
    } catch (err) {
        return err;
    }
}