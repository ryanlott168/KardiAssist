import { useEffect, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import Task from './Task';
import { FollowUpTask, FollowUpTaskUpdate } from '../../interfaces/task';
import { deleteTask, updateTask } from '../../helper/api/followUpTasks';
import { fetchStudyNames, addStudy } from '../../helper/api/studies';
import Table from 'react-bootstrap/Table';
import NewTask from './NewTask';
import '../../styles/FollowUpTaskList.scss'


interface Props {
    tasks: FollowUpTask[];
    updateFollowUpTaskList: () => void;
    newTaskVisible: boolean;
}

export default function TaskList({ tasks, updateFollowUpTaskList, newTaskVisible }: Props) {
    const [studyNames, setStudyNames] = useState<string[]>([]);
    // Setting up study creation infrustructure
    useAsyncEffect(async () => {
        const studies = await fetchStudyNames();
        setStudyNames(studies);
    }, []);

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
            <div id="followUpTaskListHeader">
                <h1>TASKS</h1>
                <p>Phone: (512) 961-8516</p>
            </div>
            <Table striped bordered hover size='sm' width={'100%'}>
                <thead>
                    <tr>
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
                        studyNames={ studyNames }
                        key={task._id} 
                        />))}
                        { newTaskVisible ? <NewTask studyNames={ studyNames }updateFollowUpTaskList={ updateFollowUpTaskList } /> : null }
                </tbody>
            </Table>
        </div>
    );
}