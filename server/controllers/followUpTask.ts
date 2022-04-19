import db from'../models';
import { FollowUpTask, FollowUpTaskUpdate } from '../interfaces/FollowUpTask';
const FollowUpTask = db.followUpTask;



// Retrieve all follow-up tasks associated w/ current user
export async function getFollowUpTasks (userId: string):  Promise<FollowUpTask[]> {
    return await FollowUpTask.find({ createdBy: userId }, { __v: 0, createdBy: 0 }, { sort: { windowCloseDate: 1 }});
}

// Create new follow-up task 
export async function createFollowUpTask (newTaskData: FollowUpTask) {
    const task = new FollowUpTask(newTaskData);
    return await task.save();
}

// Update follow-up task
// Task must be associated with current user
export async function updateFollowUpTask (taskID: string, userId: string, update: FollowUpTaskUpdate) {
    return FollowUpTask.findOneAndUpdate({ _id: taskID, createdBy: userId }, update);
}


// Delete follow-up task
// Task must be associated with current user
export async function deleteFollowUpTask (taskID: string, userId: string) {
    return FollowUpTask.deleteOne({ _id: taskID, createdBy: userId });
}