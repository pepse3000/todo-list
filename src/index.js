import "./styles.css";
import "./rightbar.css";
import "./mainside.css";
import "./createDivs.css";

import { Projects } from "./projects.js";
import { Tasks } from "./tasks.js";
import { DOMSideGenerator } from "./domgenerator.js";
import { PageLocator } from "./pagelocator.js";
import { ButtonAssigner } from "./buttonassigner.js";
import { Tags } from "./tags.js";
import { ObjectCreator } from "./utils/objectcreator.js";

let projectManager = Projects;
let taskManager = Tasks;
let tagManager = Tags;

DOMSideGenerator.createProjects();
DOMSideGenerator.createTags();
DOMSideGenerator.createTodos();
PageLocator.openTodayPage();
ButtonAssigner.assignMenuButtons();
ButtonAssigner.assignCompleteTask();
ObjectCreator.createNewTagInput();
