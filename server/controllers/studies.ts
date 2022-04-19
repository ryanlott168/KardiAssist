import db from'../models';
import Study from '../interfaces/Study';
const Study = db.study;



export async function createStudy (studyInfo: Study):  Promise<string[]> {
    const study = new Study(studyInfo);
    return await study.save();
}

export async function updateStudy (id, update) {
    return await Study.findOneAndUpdate({_id: id}, update);
}

export async function getStudies ():  Promise<Study[]> {
    const studies = await Study.find({});
    return studies;
}

export async function getStudyNames ():  Promise<string[]> {
    const studies = await Study.find({}, { name: 1, _id: 0 });
    const studyNames = studies.map(study => study.name);
    return studyNames;
}

export async function deleteStudy (id: string) {
    return await Study.deleteOne({ _id: id });
}