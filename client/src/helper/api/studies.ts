import axios from 'redaxios';
import { Study, StudyUpdate, NewStudy } from '../../interfaces/study';

export async function fetchStudies(): Promise<Study[]> {
    try {
        const res = await axios.get('/api/studies');
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function fetchStudyNames (): Promise<string[]> {
    try {
        const res = await axios.get('/api/studies/names');
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function addStudy (newStudy: NewStudy) {
    try {
        return axios.post('/api/studies', newStudy);
    } catch (err) {
        return err;
    }
}

export async function updateStudy (studyId: string, studyUpdate: StudyUpdate) {
    try {
        return axios.put(`/api/studies/${studyId}`, studyUpdate);
    } catch (err) {
        return err;
    }
}

export async function deleteStudy (studyId: string) {
    try {
        return axios.delete(`/api/studies/${studyId}`);
    } catch (err) {
        return err;
    }
}