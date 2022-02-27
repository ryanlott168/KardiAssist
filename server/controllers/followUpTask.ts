import db from'../models';
import FollowUpTask from '../interfaces/FollowUpTask';
const FollowUpTask = db.followUpTask;



// Retrieve all tasks
export async function getFollowUpTasks (userId: string):  Promise<FollowUpTask[]> {
    return await FollowUpTask.find({ createdBy: userId });
}

// Create new task
export async function createFollowUpTask (newTaskData: FollowUpTask) {
    const task = new FollowUpTask(newTaskData);
    return await task.save();
}

// Update task
export async function updateFollowUpTask (taskID) {
}


// Delete task
export async function deleteFollowUpTask (taskID) {
}