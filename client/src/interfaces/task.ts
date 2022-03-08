export interface FollowUpTask {
    study: string;
    name: string;
    DOB: string;
    windowName: string;
    windowOpenDate: string;
    windowCloseDate: string;
    notes: string;
    _id?: string;
}

export interface FollowUpTaskUpdate {
    study?: string;
    name?: string;
    DOB?: string;
    windowName?: string;
    windowOpenDate?: string;
    windowCloseDate?: string;
    notes?: string;
}