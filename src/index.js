import "./css/styles.css";
import "./css/rightbar.css";
import "./css/mainside.css";
import "./css/createDivs.css";

import { Projects } from "./classes/projects.js";
import { Tags } from "./classes/tags.js";
import { Tasks } from "./classes/tasks.js";
import { DOMSideGenerator } from "./utils/domgenerator.js";
import { PageLocator } from "./utils/pagelocator.js";
import { ButtonAssigner } from "./utils/buttonassigner.js";
import { ObjectCreator } from "./utils/objectcreator.js";
import { DomUpdater } from "./utils/domupdater.js";

DOMSideGenerator.createProjects();
DOMSideGenerator.createTags();
DOMSideGenerator.createTodos();

ButtonAssigner.assignMenuButtons();
PageLocator.openTodayPage();
ButtonAssigner.assignCompleteTask();
ButtonAssigner.assignUndoCompletedTask();
ButtonAssigner.assignOpenCreateProjectForm();
ButtonAssigner.assignCreateNewProject();
ObjectCreator.createNewTagInput();

