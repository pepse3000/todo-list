import { Tasks } from "../classes/tasks.js";
import { Tags } from "../classes/tags.js";
import { Projects } from "../classes/projects.js";
import { ObjectCreator } from "./objectcreator.js";
import { DOMSideGenerator } from "./domgenerator.js";
import { ButtonAssigner } from "./buttonassigner.js";
import { TimeConverter } from "./timeconverter.js";

export const DomUpdater = (function() {
    const updateTodayList = function (status) {
        let todosListMain = document.querySelector(".todos-list");
        let todosListSide = document.querySelector(".todos-container");

        if (todosListMain.parentElement && todosListMain.parentElement.classList.contains("days7page")) {
            todosListMain.innerHTML = "";
            todosListMain.appendChild(ObjectCreator.createTodayList("7days"));
            todosListSide.innerHTML = "";

            let infoBars = document.querySelectorAll(".info");
            infoBars[0].textContent = Tasks.getUncompletedTasks("7days").length;
            infoBars[1].textContent = Tasks.getCompletedTasks("7days").length;

            DOMSideGenerator.createTodos();
            ButtonAssigner.assignCompleteTask();
            ButtonAssigner.assignDeleteTask();
            DOMSideGenerator.createProjects();
            return;
        }

        if (todosListMain.parentElement.classList.contains("inboxpage")) {
            todosListMain.innerHTML = "";
            todosListMain.appendChild(ObjectCreator.createTodayList("inbox"));
            todosListSide.innerHTML = "";

            let infoBars = document.querySelectorAll(".info");
            infoBars[0].textContent = Tasks.getUncompletedTasks("inbox").length;
            infoBars[1].textContent = Tasks.getCompletedTasks().length;
            
            DOMSideGenerator.createTodos();
            ButtonAssigner.assignCompleteTask();
            ButtonAssigner.assignDeleteTask();
            DOMSideGenerator.createProjects();
            return;
        }

        if (todosListMain.parentElement.classList.contains("activitypage")) {
            todosListMain.innerHTML = "";
            todosListMain.appendChild(ObjectCreator.createCompleteTasks());
            todosListSide.innerHTML = "";

            let infoBars = document.querySelectorAll(".info");

            DOMSideGenerator.createTodos();
            ButtonAssigner.assignCompleteTask();
            ButtonAssigner.assignDeleteTask();
            ButtonAssigner.assignUndoActivityTask();

            infoBars[0].textContent = String(Tasks.getLastTaskActivity(true)).length > 0 ? TimeConverter.getHourAndMinute(Tasks.getLastTaskActivity(true)) : "No activity";
            infoBars[1].textContent = Tasks.getCompletedTasks().length;
            DOMSideGenerator.createProjects();
            return;
        } 
        
        if (todosListMain.parentElement.classList.contains("project-todos")) {
            todosListMain.innerHTML = "";
            todosListMain.appendChild(ObjectCreator.createTodayList("project"));
            todosListSide.innerHTML = "";
            DOMSideGenerator.createTodos();

            ButtonAssigner.assignCompleteTask();
            ButtonAssigner.assignDeleteTask();
            ButtonAssigner.assignUndoActivityTask();
            DOMSideGenerator.createProjects();
            return;
        } 

        if (todosListMain.parentElement.classList.contains("single-project-todos")) {
            todosListMain.innerHTML = "";
            let projectName = document.querySelector(".project-name").textContent;
            let project = Projects.projectsArray.find(project => project.projectName == projectName);
            let projectId = project.projectId;
            todosListMain.appendChild(ObjectCreator.createProjectTasks(projectId));
            todosListSide.innerHTML = "";
            DOMSideGenerator.createTodos();

            let infoBars = document.querySelectorAll(".info");
            infoBars[1].textContent = Tasks.getCompletedTasksByProject(projectId).length;
            infoBars[2].textContent = project["assignedTasks"].length;

            ButtonAssigner.assignCompleteTask();
            ButtonAssigner.assignDeleteTask();
            ButtonAssigner.assignUndoActivityTask();
            DOMSideGenerator.createProjects();
            return;
        }

        todosListMain.innerHTML = "";
        todosListMain.appendChild(ObjectCreator.createTodayList("today"));

        todosListSide.innerHTML = "";
        DOMSideGenerator.createTodos();

        let infoBars = document.querySelectorAll(".info");
        infoBars[0].textContent = Tasks.getUncompletedTasks("today").length;
        infoBars[1].textContent = Tasks.getCompletedTasks("today").length;

        DOMSideGenerator.createProjects();
        ButtonAssigner.assignDeleteTask();
        updateTagsList();
        ButtonAssigner.assignCompleteTask();
    }


    const updateTagsList = function () {
        let tagsContainer = document.querySelector(".tags-container");
        tagsContainer.innerHTML = "";
        
        Tags.tagsArray.forEach(tag => {
            let tagElement = document.createElement("div");
            let imgHolder = document.createElement("div");
            let tagName = document.createElement("p");
            let tagNumber = document.createElement("p");

            tagElement.classList.add("tag-element");
            tagElement.id = `t${tag["tagId"]}`;

            imgHolder.classList.add("img-holder");
            imgHolder.style.background = tag["color"];
            Tags.countTagUsage(tag["tagName"], tag);
            tagName.textContent = tag["tagName"];

            tagNumber.classList.add("number");

            let count = 0;
            Tasks.tasksArray.forEach(task => {
                if (tag["appendedTasks"].includes(task["taskId"]) && task.status != "done") { count++ }
            })

            tagNumber.textContent = count;

            tagElement.appendChild(imgHolder);
            tagElement.appendChild(tagName);
            tagElement.appendChild(tagNumber);

            tagsContainer.appendChild(tagElement);
        })

        if (document.querySelector(".tags-assigner")) {
            let tagsAssigner = document.querySelectorAll(".tags-assigner");
            tagsAssigner.forEach(tagContainer => {
                tagContainer.innerHTML = "";
                Tags.tagsArray.forEach(tag => {
                    let tagElement = document.createElement("input");
                    let tagLabel = document.createElement("label");
        
                    tagElement.type = "checkbox";
                    tagElement.id = tag.tagName;
                    tagElement.name = tag.tagName;
                    tagElement.value = tag.tagId;
        
                    tagLabel.htmlFor = tag.tagName;
                    tagLabel.textContent = tag.tagName;
                    tagLabel.style.background = `${tag.color}20`;
                    tagLabel.style.color = tag.color;
        
                    tagContainer.appendChild(tagElement);
                    tagContainer.appendChild(tagLabel);
                })
            });
    
        }

        Tags.saveToLocalStorage();
    }

    return { updateTodayList, updateTagsList };
})();