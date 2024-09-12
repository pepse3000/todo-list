import "./styles.css";
import "./rightbar.css";
import "./mainside.css";

import { Projects } from "./projects.js";
import { Tasks } from "./tasks.js";


let projectManager = Projects;
let taskManager = Tasks;

console.log(taskManager.tasksArray)
console.log(projectManager.projectsArray)
taskManager.appendTasks();
