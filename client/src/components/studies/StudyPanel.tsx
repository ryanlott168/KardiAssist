import { MouseEventHandler, useState} from 'react';
import useAsyncEffect from 'use-async-effect';
import { Study } from '../../interfaces/study';

interface Props {
    study: Study;
    selectStudyToUpdate: (study: Study) => void;
    handleStudyDelete: (id: string) => void;
}

export default function StudyPanel({ study, selectStudyToUpdate, handleStudyDelete }: Props) {


    return (
        <div id='studyPanel' key={study._id} onClick={() => selectStudyToUpdate(study)}>
            <span className='studyPanelName'>{study.name}</span>
            <div className='studyPanelBtns'>
                <button onClick={ () => handleStudyDelete(study._id) }>Delete</button>
            </div>
        </div>
    );
}