import { useState } from "react";
import useAuth from "../../useAuth";

export default function TaskList() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    
  
    return (
        <div id='followUpTaskList'>
            <h1>TASKS</h1>
        </div>
    );
  }