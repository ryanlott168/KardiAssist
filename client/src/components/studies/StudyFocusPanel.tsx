import useAsyncEffect from 'use-async-effect';
import { useForm } from 'react-hook-form';
import {Study , StudyUpdate, NewStudy } from '../../interfaces/study';
import { useEffect, useState } from 'react';

interface Props {
    study: Study | undefined;
    handleStudyUpdate: (id: string, update: StudyUpdate) => void;
    handleStudyCreate: (study: NewStudy) => void;
    setAddStudyMode: (bool: boolean) => void;
    addStudyMode: boolean;
}

export default function StudyFocusPanel({ study, handleStudyUpdate, addStudyMode, handleStudyCreate, setAddStudyMode }: Props) {
    const [updateMode, setUpdateMode] = useState(false);
    const { register, handleSubmit, reset, formState: { dirtyFields } } = useForm();

    useEffect(() => {
        addStudyMode ? 
        reset({
            name: '',
            notes: ''
        }) : 
        reset({
            name: study?.name,
            notes: study?.notes
        });
    }, [reset, study, addStudyMode]);

    const onNewStudySubmit = async (data: any) => {
        if(dirtyFields.name) {
            await handleStudyCreate(data);
        }

        setAddStudyMode(false);
    }
    console.log(addStudyMode)

    const onUpdateSubmit = async (data: any) => {
        // Prevents update call if no fields changed
        if(Object.keys(dirtyFields).length > 0 && study) {
            const update: { [key: string]: string } = {};
            for(const key in dirtyFields) {
                update[key] = data[key];
            }
            await handleStudyUpdate(study._id, update);
        }

        setUpdateMode(false);
    };

    return (
        <div id="studyFocusPanel">
            {updateMode ? 
            <form onSubmit={handleSubmit(onUpdateSubmit)}>
                <h5>Update Study</h5>
                <input type="text" placeholder="name" {...register("name", {required: true})} />
                <textarea {...register("notes", {})} />
                <button type="submit">Submit</button>
            </form> 
            : addStudyMode ? 
            <form onSubmit={handleSubmit(onNewStudySubmit)}>
                <h5>New Study</h5>
                <input type="text" placeholder="name" {...register("name", {required: true})} />
                <textarea {...register("notes", {})} />
                <button type="submit">Submit</button>
                <button onClick={ () => setAddStudyMode(false) }>Close</button>
            </form> 
            :
            <div>
                <span><strong>Study Name:</strong> {study?.name}</span>
                <div>
                    <span><strong>Notes:</strong></span>
                    <p>{study?.notes}</p>
                </div>
                <button onClick={() => setUpdateMode(true)}>Update</button>
            </div>
            }
        </div>
    );
}