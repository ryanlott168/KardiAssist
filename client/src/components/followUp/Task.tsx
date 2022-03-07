import { FollowUpTask } from '../../interfaces/task';

interface Props {
    task: FollowUpTask
}

export default function Task({ task }: Props) {

    return (
        <div id='followUpTaskList'>
            <span>{task.study}</span>
            <span>{task.name}</span>
            <span>{task.DOB}</span>
            <span>{task.windowName}</span>
            <span>{task.windowOpenDate}</span>
            <span>{task.windowCloseDate}</span>
            <span>{task.notes}</span>
        </div>
    );
  }