import Task from './Task';
import { FollowUpTask } from '../../interfaces/task'

interface Props {
    tasks: FollowUpTask[];
}

export default function TaskList({ tasks }: Props) {
    return (
        <div id='followUpTaskList'>
            <h1>TASKS</h1>
            {tasks.map(task => <Task task={ task } />)}
        </div>
    );
}