import { useState} from 'react';
import useAsyncEffect from 'use-async-effect';
import useAuth from '../useAuth';
import { fetchTasks } from '../helper/api/followUpTasks';
import NewTaskModal from './followUp/NewTask';
import FollowUpTaskList from './followUp/TaskList';
import { FollowUpTask } from '../interfaces/task';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<FollowUpTask[]>([]);
  const [refreshTasks, setRefreshTasks] = useState(true);
  const [newTaskVisible, setNewTaskVisible] = useState(false);

  useAsyncEffect(async () => {
    if(refreshTasks) {
      try {
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
        setRefreshTasks(false);
      } catch (err) {
        console.log(err);
      }
    }
  }, [refreshTasks]);

  const updateFollowUpTaskList = () => {
    setRefreshTasks(true);
    setNewTaskVisible(false)
  }

  return (
      <>
        <main>
          <h2>Welcome to the Dashboard, {user!.firstName}!</h2>
          <FollowUpTaskList tasks={ tasks } updateFollowUpTaskList={ updateFollowUpTaskList } newTaskVisible={ newTaskVisible }/>
          <button onClick={() => setNewTaskVisible(!newTaskVisible)}>Make a new task</button>
        </main>
      </>
  );
}