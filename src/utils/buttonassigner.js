import { Projects } from "../classes/projects.js";
import { Tasks } from "../classes/tasks.js";
import { Tags } from "../classes/tags.js";
import { DOMSideGenerator } from "./domgenerator.js";
import { PageLocator } from "./pagelocator.js";
import { ObjectCreator } from "./objectcreator.js";
import { DomUpdater } from "./domupdater.js";

export const ButtonAssigner = (function() {

    const assignMenuButtons = function() {
        let allBtns = document.querySelectorAll(".side-btn");

        allBtns[0].addEventListener("click", PageLocator.openTodayPage);
        allBtns[1].addEventListener("click", PageLocator.openNext7DaysPage);
        allBtns[2].addEventListener("click", PageLocator.openInboxPage);
        allBtns[3].addEventListener("click", PageLocator.openActivityPage);
        allBtns[4].addEventListener("click", PageLocator.openProjectsPage);
        
    }

    const assignShowSetInfo = function() {
        let showBtn = document.querySelector("#show-set-info");

        showBtn.addEventListener("click", () => PageLocator.showInfo(".set-info"));
    }

    const assingSetInfoDayPickers = function() {
        let todayBtn = document.querySelector("#torday");
        let tmrwBtn = document.querySelector("#tmrw");

        todayBtn.addEventListener("click", () => ObjectCreator.changeCalendarDay("today"));
        tmrwBtn.addEventListener("click", () => ObjectCreator.changeCalendarDay("tmrw"));
    }

    const assignCreateNewTask = function() {
        let form = document.querySelector(".new-task")

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let name = document.querySelector("#taskname").value;
            let priority = document.querySelector("input[name='priority']:checked").value;
            let project;

            if (document.querySelector("input[name='project']:checked")) {
                project = document.querySelector("input[name='project']:checked").value;
            }

            let tags = document.querySelectorAll("input[type='checkbox']:checked");
            let tagsNames = [];
            tags.forEach(tag => {
                tagsNames.push(tag.name);
            })
            
            let date = document.querySelector("#date").value;
            
            Tasks.createTask(
                Tasks.tasksArray,
                project ? project : "",
                name,
                tagsNames,
                priority,
                date,
                "open"
            )

            let taskName = document.querySelector("#taskname");
            taskName.value = "";
            
            PageLocator.showInfo(".set-info", "open");
            DomUpdater.updateTodayList();
            form.reset();
        })
    }

    const assignCompleteTask = function() {
        let allBtns = document.querySelectorAll(".todo-status");
        
        allBtns.forEach(btn => {
            if (btn.classList.contains("activity-done")) {
                return;
            }

            btn.addEventListener("click", e => {
                Tasks.completeTask(e.target);
                let taskId;

                if (!e.target.parentElement.id) {
                    taskId = e.target.parentElement.parentElement.id;
                } else {
                    taskId = e.target.parentElement.id;
                }

                let task = Tasks.tasksArray.find(task => {
                    return +task.taskId == +taskId.slice(4);
                });

                Tags.tagsArray.forEach(tag => {
                    let filteredArr = tag.appendedTasks.filter(appendTaskId => appendTaskId == task.taskId);
                })

                if (!btn.classList.contains("activity-done")) {
                    setTimeout(DomUpdater.updateTodayList, 900);
                }

                
                DomUpdater.updateTagsList();
                setTimeout(() => PageLocator.showInfo(".undo-button" , "show"), 900);

                let taskUndoName = document.querySelector(".task-undo-name");
                if (task.taskName.length > 15) {
                    taskUndoName.innerText = task.taskName.slice(0, 15) + "...";
                } else {
                    taskUndoName.innerText = task.taskName;
                }
                
        })
    })
    }

    const assignShowCreateTagForm = function () {
        let createTagButton = document.querySelector("#add-tag");

        createTagButton.addEventListener("click", () => {
            PageLocator.showInfo(".new-tag", "");
        });
    }

    const assignCreateNewTag = function() {
        let form = document.querySelector(".new-tag")

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let name = document.querySelector("#tagname").value;

            let color;
            if (document.querySelector("input[name='color']:checked")) {
                color = document.querySelector("input[name='color']:checked").value;
            } else {
                color = Tags.tagsColors.red;
            }
            
            Tags.createTag(
                Tags.tagsArray,
                name,
                color
            )
            
            PageLocator.showInfo(".new-tag", "open");
            DomUpdater.updateTagsList();
        })
    }

    const assignUndoCompletedTask = function() {
        let undoBtn = document.querySelector(".undo-btn");

        undoBtn.addEventListener("click", () => {
            PageLocator.showInfo(".undo-button", "");
            Tasks.undoLastCompletedTask();
            DomUpdater.updateTodayList();
            DomUpdater.updateTagsList();
        });
    }

    const assignUndoActivityTask = function() {
        let allBtns = document.querySelectorAll(".activity-done");

        allBtns.forEach(btn => {
            btn.addEventListener("click", e => {
                Tasks.undoLastCompletedTask(e.target);
                let taskId;

                if (!e.target.parentElement.id) {
                    taskId = e.target.parentElement.parentElement.id;
                } else {
                    taskId = e.target.parentElement.id;
                }

                let task = Tasks.tasksArray.find(task => {
                    return +task.taskId == +taskId.slice(4);
                });

                setTimeout(DomUpdater.updateTodayList, 900);
                DomUpdater.updateTagsList();
            })
        })
    }

    const assignOpenProject = function(status) {
        
        let allProjects = document.querySelectorAll(".project-folder");

        allProjects.forEach(project => {
            project.addEventListener("click", () => {
                let projectId = project.id.slice(4);
                PageLocator.openSingleProjectPage(Projects.getProjectById(projectId));
            })
        });

        if (status) {
            let allSmallProjectsBtns = document.querySelectorAll(".project-assign");
            allSmallProjectsBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    let projectName = btn.textContent;
                    let projectId = Projects.projectsArray.filter(project => project.projectName == projectName)[0].projectId;
                    PageLocator.openSingleProjectPage(Projects.getProjectById(projectId));
                })
            })
        }
    }

    const assignOpenProjectSide = function() {
        let btnsArray = document.querySelectorAll(".side-btn");
        let sideProjects = document.querySelectorAll(".project-element");

        sideProjects.forEach(project => {
            project.addEventListener("click", () => {
                let projectId = project.id.slice(1);
                PageLocator.openSingleProjectPage(Projects.getProjectById(projectId));
                PageLocator.changeButtonActivityStatus(btnsArray, 4)
            })
        });
    }

    const assignDeleteTask = function() {
        let allBtns = document.querySelectorAll(".delete-btn");
        
        allBtns.forEach(btn => {

            btn.addEventListener("click", e => {
                let taskId;

                if (!e.target.parentElement.id) {
                    taskId = e.target.parentElement.parentElement.id;
                } else {
                    taskId = e.target.parentElement.id;
                }

                let task = Tasks.tasksArray.find(task => {
                    return +task.taskId == +taskId.slice(4);
                });
                
                let taskUndoName = document.querySelector(".task-undo-name");

                
                if (task.taskName.length > 15) {
                    taskUndoName.innerText = task.taskName.slice(0, 15) + "...";
                } else {
                    taskUndoName.innerText = task.taskName;
                }

                Tasks.deleteTask(e.target);

                DomUpdater.updateTagsList();

                if (!btn.classList.contains("activity-done")) {
                    setTimeout(DomUpdater.updateTodayList, 900);
                }
                
        })
    })
    }

    const assignOpenCreateProjectForm = function() {
        let createProjectButton = document.querySelector("#add-project");

        createProjectButton.addEventListener("click", () => PageLocator.showInfo(".new-project", ""));
    }

    const assignCreateNewProject = function() {
        let form = document.querySelector(".new-project")

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let name = document.querySelector("#projectname").value;
            let priority = document.querySelector("input[name='priority']:checked");

            let tags = document.querySelectorAll("input[type='checkbox']:checked");
            let tagsNames = [];
            tags.forEach(tag => {
                tagsNames.push(tag.name);
            })

            let dueDate = document.querySelector("#date-proj").value;
            let smallDesc = document.querySelector("#smallDesc").value;
            let longDesc = document.querySelector("#longDesc").value;

            Projects.createProject(
                Projects.projectsArray,
                name,
                smallDesc,
                tagsNames,
                priority,
                longDesc,
                new Date(),
                dueDate,
            )
            
            PageLocator.showInfo(".new-project", "open");
            DOMSideGenerator.createProjects();
        })
    }

    return { 
        assignMenuButtons, 
        assignShowSetInfo, 
        assingSetInfoDayPickers, 
        assignCreateNewTask,
        assignCompleteTask,
        assignShowCreateTagForm,
        assignCreateNewTag,
        assignUndoCompletedTask,
        assignUndoActivityTask,
        assignOpenProject,
        assignOpenProjectSide,
        assignDeleteTask,
        assignOpenCreateProjectForm,
        assignCreateNewProject,
     }
})();