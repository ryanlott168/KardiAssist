import { useState} from 'react';
import useAsyncEffect from 'use-async-effect';
import useAuth from '../../useAuth';
import StudyList from './StudyList';
import { Study, StudyUpdate, NewStudy } from '../../interfaces/study';
import { addStudy, deleteStudy, fetchStudies, updateStudy,  } from '../../helper/api/studies';
import '../../styles/Studies.scss'
import StudyFocusPanel from './StudyFocusPanel';

export default function Studies() {
  const { user } = useAuth();
  const [studies, setStudies] = useState<Study[]>([]);
  const [currentStudyViewed, setCurrentStudyViewed] = useState<Study>();
  const [addStudyMode, setAddStudyMode] = useState(false);

  useAsyncEffect(async () => {
    handleStudiesFetch();
  }, []);

  const handleStudiesFetch = async () => {
    const studyList = await fetchStudies();
    setStudies(studyList);
    if(currentStudyViewed) {
      for(let study of studyList) {
        if(study._id === currentStudyViewed._id) {
          setCurrentStudyViewed(study);
          break;
        }
      }
      for(let i = 0; i < studyList.length; i++) {
        if(studyList[i]._id === currentStudyViewed._id) {
          setCurrentStudyViewed(studyList[i]);
          break;
        } else if(i === studyList.length - 1) {
          setCurrentStudyViewed(undefined);
        }
      }
    }
  }

  const handleStudyUpdate = async (id: string, update: StudyUpdate) => {
    try {
      await updateStudy(id, update);
      await handleStudiesFetch();
    } catch(err) {
      console.log(err);
    }
  }

  const handleStudyCreate = async (study: NewStudy) => {
    try {
      await addStudy(study);
      await handleStudiesFetch();
    } catch(err) {
      console.log(err);
    }
  }

  const handleStudyDelete = async (id: string) => {
    try {
      await deleteStudy(id);
      await handleStudiesFetch();
    } catch(err) {
      console.log(err);
    }
  }

  const selectStudyToUpdate = (study: Study) => {
      setCurrentStudyViewed(study);
  }

  return (
      <>
        <main id="studyHome">
          <h2>Studies</h2>
          <div id="studyMain">
            <StudyList 
            studies={ studies } 
            selectStudyToUpdate={ selectStudyToUpdate }
            handleStudyDelete={ handleStudyDelete }
            setAddStudyMode={ setAddStudyMode }
            />
            {currentStudyViewed || addStudyMode ? 
            <StudyFocusPanel 
            study={currentStudyViewed} 
            handleStudyUpdate={handleStudyUpdate}
            handleStudyCreate={handleStudyCreate} 
            setAddStudyMode={setAddStudyMode}
            addStudyMode={ addStudyMode } /> 
            : undefined }
          </div>
        </main>
      </>
  );
}
