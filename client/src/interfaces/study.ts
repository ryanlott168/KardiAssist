export interface Study {
    name: string;
    notes?: string;
    _id: string;
}

export interface NewStudy {
    name: string;
    notes?: string;
}

export interface StudyUpdate {
    name?: string;
    notes?: string;
}