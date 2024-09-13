import "./styles.css";
import "./rightbar.css";
import "./mainside.css";

import { Projects } from "./projects.js";
import { Tasks } from "./tasks.js";
import { DOMSideGenerator } from "./domgenerator.js";

let projectManager = Projects;
let taskManager = Tasks;

DOMSideGenerator.createProjects();
