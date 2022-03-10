import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FollowUpTask, FollowUpTaskUpdate } from '../../interfaces/task';
import { formatDateForForm, formatDateForDisplay } from '../../helper/util';

interface Props {
    task: FollowUpTask;
    handleTaskDelete: (taskId: string) => Promise<void>;
    handleTaskUpdate: (taskId: string, update: FollowUpTaskUpdate) => Promise<void>;
}

export default function Task({ task, handleTaskDelete, handleTaskUpdate }: Props) {
    const [updateMode, setUpdateMode] = useState(false);


    const { register, handleSubmit, reset, formState: { dirtyFields } } = useForm({
        defaultValues: {
            study: task.study,
            name: task.name,
            DOB: formatDateForForm(task.DOB),
            windowName: task.windowName,
            windowOpenDate: formatDateForForm(task.windowOpenDate),
            windowCloseDate: formatDateForForm(task.windowCloseDate),
            notes: task.notes
        }
    });
    
    const onSubmit = async (data: any) => {
        // Prevents update call if no fields changed
        if(Object.keys(dirtyFields).length > 0) {
            const update: { [key: string]: string } = {};
            for(const key in dirtyFields) {
                
                update[key] = data[key];
            }
            console.log(update);
            await handleTaskUpdate(task._id!, update);
        }

        setUpdateMode(false);
        console.log(updateMode);
    };



    return (
        <>
        
        {!updateMode ? 
            <tr>
                <td></td>
                <td>{task.study}</td>
                <td>{task.name}</td>
                <td>{formatDateForDisplay(task.DOB)}</td>
                <td>{task.windowName}</td>
                <td>{formatDateForDisplay(task.windowOpenDate)}</td>
                <td>{formatDateForDisplay(task.windowOpenDate)}</td>
                <td>{task.notes}</td>
                <td><button onClick={() => setUpdateMode(true)}>Update</button></td>
                <td><button onClick={() => handleTaskDelete(task._id!)}>Delete</button></td>
            </tr> :
            <>
                <form onSubmit={handleSubmit(onSubmit)} id='updateTaskForm'></form>
                <tr>
                    <td></td>
                    <td><input type="text" placeholder="study" {...register("study", {required: true})} /></td>
                    <td><input type="text" placeholder="name" {...register("name", {required: true})} /></td>
                    <td><input type="date" placeholder="DOB" {...register("DOB", {required: true})} /></td>
                    <td><input type="text" placeholder="windowName" {...register("windowName", {required: true})} /></td>
                    <td><input type="date" placeholder="windowOpenDate" {...register("windowOpenDate", {required: true})} /></td>
                    <td><input type="date" placeholder="windowCloseDate" {...register("windowCloseDate", {required: true})} /></td>
                    <td><textarea {...register("notes", {})} /></td>
                    <td><input type="submit" form='updateTaskForm'/></td>
                </tr>
            </>}
        </>
        
    );
  }