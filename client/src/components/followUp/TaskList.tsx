import Task from './Task';
import { FollowUpTask, FollowUpTaskUpdate } from '../../interfaces/task';
import { deleteTask, updateTask } from '../../helper/api/followUpTasks';
import Table from 'react-bootstrap/Table';
import NewTask from './NewTask';
import '../../styles/FollowUpTaskList.scss'

interface Props {
    tasks: FollowUpTask[];
    updateFollowUpTaskList: () => void;
    newTaskVisible: boolean;
}

export default function TaskList({ tasks, updateFollowUpTaskList, newTaskVisible }: Props) {

    const handleTaskDelete = async (taskId: string) => {
        try {
            await deleteTask(taskId);
            updateFollowUpTaskList();
        } catch (err) {

        }
    }

    const handleTaskUpdate = async (taskId: string, update: FollowUpTaskUpdate) => {
        try {
            console.log(update)
            await updateTask(taskId, update);
            updateFollowUpTaskList();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div id='followUpTaskList'>
            <h1>TASKS</h1>
            <Table striped bordered hover size='sm' width={'100%'}>
                <thead>
                    <tr>
                        <th>Priority #</th>
                        <th>Study Name</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Window Name</th>
                        <th>Window Open Date</th>
                        <th>Window Close Date</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <Task 
                        task={ task } 
                        handleTaskDelete={ handleTaskDelete } 
                        handleTaskUpdate={ handleTaskUpdate } 
                        key={task._id} 
                        />))}
                        { newTaskVisible ? <NewTask updateFollowUpTaskList={ updateFollowUpTaskList } /> : null }
                </tbody>
            </Table>
        </div>
    );
}