import "./styles.css";
import "./rightbar.css";
import "./mainside.css";

import { Projects } from "./projects.js";
import { Tasks } from "./tasks.js";
import { DOMSideGenerator } from "./domgenerator.js";
import { PageLocator } from "./pagelocator.js";
import { ButtonAssigner } from "./buttonassigner.js";
import { Tags } from "./tags.js";

let projectManager = Projects;
let taskManager = Tasks;
let tagManager = Tags;

DOMSideGenerator.createProjects();
DOMSideGenerator.createTags();
DOMSideGenerator.createTodos();
PageLocator.openTodayPage();
ButtonAssigner.assignMenuButtons();
