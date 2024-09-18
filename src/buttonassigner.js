import { Projects } from "./projects.js";
import { Tasks } from "./tasks.js";
import { Tags } from "./tags.js";
import { DOMSideGenerator } from "./domgenerator.js";
import { PageLocator } from "./pagelocator.js";
import { ObjectCreator } from "./utils/objectcreator.js";
import { DomUpdater } from "./utils/domupdater.js";

export const ButtonAssigner = (function() {
    const assignProjectButtons = function() {

    }

    const assignTagButtons = function() {

    }

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
                console.log("clicked")
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
            let btnsArray = document.querySelectorAll(".side-btn");
            let sideProjects = document.querySelectorAll(".project-element");

            sideProjects.forEach(project => {
                project.addEventListener("click", () => {
                    let projectId = project.id.slice(1);
                    PageLocator.openSingleProjectPage(Projects.getProjectById(projectId));
                    PageLocator.changeButtonActivityStatus(btnsArray, 4)
                })
            });

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
     }
})();