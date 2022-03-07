import { useForm } from 'react-hook-form';
import { addTask } from '../../helper/api/followUpTasks';
import { FollowUpTask } from '../../interfaces/task';

interface Props {
    updateTasks: () => void;
}

export default function NewTaskModal({updateTasks}: Props) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            study: '',
            name: '',
            DOB: '',
            windowName: '',
            windowOpenDate: '',
            windowCloseDate: '',
            notes: ''
        }
    });

    const onSubmit = async (data: any) => {
        const task: FollowUpTask = data;
        try {
            await addTask(task);
            updateTasks();
            reset();
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div id='newTaskModal'>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="study" {...register("study", {required: true})} />
            <input type="text" placeholder="name" {...register("name", {required: true})} />
            <input type="date" placeholder="DOB" {...register("DOB", {required: true})} />
            <input type="text" placeholder="windowName" {...register("windowName", {required: true})} />
            <input type="date" placeholder="windowOpenDate" {...register("windowOpenDate", {required: true})} />
            <input type="date" placeholder="windowCloseDate" {...register("windowCloseDate", {required: true})} />
            <textarea {...register("notes", {})} />
            <input type="submit" />
            </form>
        </div>
    );
  }