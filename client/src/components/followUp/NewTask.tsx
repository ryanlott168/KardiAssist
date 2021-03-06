import { useForm } from 'react-hook-form';
import { addTask } from '../../helper/api/followUpTasks';
import { FollowUpTask } from '../../interfaces/task';

interface Props {
    studyNames: string[];
    updateFollowUpTaskList: () => void;
}

export default function NewTask({ studyNames, updateFollowUpTaskList }: Props) {
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
            updateFollowUpTaskList();
            reset();
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <tr>
                    <td>
                        <select  {...register("study", {required: true})} >
                            {studyNames.map(studyName => <option value={studyName}>{studyName}</option>)}
                        </select>
                    </td>
                    <td><input type="text" placeholder="name" {...register("name", {required: true})} /></td>
                    <td><input type="date" placeholder="DOB" {...register("DOB", {required: true})} /></td>
                    <td><input type="text" placeholder="windowName" {...register("windowName", {required: true})} /></td>
                    <td><input type="date" placeholder="windowOpenDate" {...register("windowOpenDate", {required: true})} /></td>
                    <td><input type="date" placeholder="windowCloseDate" {...register("windowCloseDate", {required: true})} /></td>
                    <td><textarea {...register("notes", {})} /></td>
                    <td><input type="submit" onClick={handleSubmit(onSubmit)} /></td>
            </tr>
        </>
    );
  }