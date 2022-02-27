export default interface FollowUpTask {
    firstName: string;
    lastName: string;
    DOB: Date;
    windowOpenDate: Date;
    windowCloseDate: Date;
    notes? : string;
    createdBy: string;
}