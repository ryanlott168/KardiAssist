import { useState} from 'react';
import useAsyncEffect from 'use-async-effect';
import useAuth from '../useAuth';
import { fetchTasks } from '../helper/api/followUpTasks';
import NewTaskModal from './followUp/NewTaskModal';
import FollowUpTaskList from './followUp/TaskList';
import { FollowUpTask } from '../interfaces/task';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<FollowUpTask[]>([]);
  const [refreshTasks, setRefreshTasks] = useState(true);
  const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);

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

  const updateTasks = () => {
    setRefreshTasks(true);
  }

  return (
      <>
        <main>
          <h2>Welcome to the Dashboard, {user!.firstName}!</h2>
          <FollowUpTaskList tasks={tasks} />
          <button onClick={() => setNewTaskModalVisible(!newTaskModalVisible)}>Make a new task</button>
          { newTaskModalVisible ? <NewTaskModal updateTasks={updateTasks} /> : null }
        </main>
      </>
  );
}