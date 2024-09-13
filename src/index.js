import "./styles.css";
import "./rightbar.css";
import "./mainside.css";

import { Projects } from "./projects.js";
import { ProjectTasks } from "./tasks.js";
import { DOMSideGenerator } from "./domgenerator.js";
import { Tags } from "./tags.js";

let projectManager = Projects;
let taskManager = ProjectTasks;
let tagManager = Tags;

DOMSideGenerator.createProjects();
