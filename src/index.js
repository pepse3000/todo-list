import "./styles.css";
import "./rightbar.css";
import "./mainside.css";
import "./createDivs.css";

import { Projects } from "./projects.js";
import { Tags } from "./tags.js";
import { Tasks } from "./tasks.js";
import { DOMSideGenerator } from "./domgenerator.js";
import { PageLocator } from "./pagelocator.js";
import { ButtonAssigner } from "./buttonassigner.js";
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

