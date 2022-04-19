import StudyPanel from './StudyPanel';
import { Study } from '../../interfaces/study';

interface Props {
    studies: Study[];
    selectStudyToUpdate: (study: Study) => void;
    handleStudyDelete: (id: string) => void;
    setAddStudyMode: (bool: boolean) => void;
}

export default function StudyList({ studies, selectStudyToUpdate, handleStudyDelete, setAddStudyMode }: Props) {

    return (
        <div id="studyList">
            <div id="currentStudiesHeader">
                <h3>Current Studies</h3>
                <button onClick={() => setAddStudyMode(true) }>Add Study</button>
            </div>
            {studies.map(study => 
            <StudyPanel 
            key={study._id} 
            study={study} 
            selectStudyToUpdate={ selectStudyToUpdate } 
            handleStudyDelete={ handleStudyDelete }
            />)}
        </div>
    );
}