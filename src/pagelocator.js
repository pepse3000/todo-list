import { Projects } from "./projects.js";
import { Tasks } from "./tasks.js";
import { Tags } from "./tags.js";
import { DOMSideGenerator } from "./domgenerator.js";

export const PageLocator = (function() {
    const tagsArray = Tags.tagsArray;
    const tasksArray = Tasks.tasksArray;
    const projectsArray = Projects.projectsArray;

    const openTodayPage = function() {
        // main document
        let mainContainer = document.querySelector(".main-container");
        mainContainer.innerHTML = "";

        let contentContainer = document.createElement("div");
        contentContainer.classList.add("content-container");

        // background gradient
        let gradientContainer = document.createElement("div");
        gradientContainer.classList.add("gradient-container");
        contentContainer.appendChild(gradientContainer);

        // header
        let mainHeader = document.createElement("div");
        mainHeader.classList.add("main-header");

        let iconHolder = document.createElement("div");
        iconHolder.classList.add("icon-holder");

        let headerName = document.createElement("h2");
        headerName.textContent = "Today tasks"

        mainHeader.appendChild(iconHolder);
        mainHeader.appendChild(headerName);
        contentContainer.appendChild(mainHeader);

        // page info
        let gradientInfo = document.createElement("div");
        gradientInfo.classList.add("gradient-info");

        let mainText = document.createElement("p");
        mainText.textContent = "If you cannot do great things, do small things in a great way.";
        gradientInfo.appendChild(mainText);

        // total info cards
        let cardText = ["Today tasks", "Today completed", "Heaviest project"];

        let cardContent = [Tasks.getUncompletedTasks().length, Tasks.getCompletedTasks().length, Projects.sortProjectsByTasks()[0].projectName];

        for (let i = 0; i < 3; i++) {
            let totalInfo = document.createElement("div");
            totalInfo.classList.add("total-info");

            let infoHeader = document.createElement("p");
            infoHeader.classList.add("info-header");
            infoHeader.textContent = cardText[i];

            let info = document.createElement("p");
            info.classList.add("info");
            info.textContent = cardContent[i];

            totalInfo.appendChild(infoHeader);
            totalInfo.appendChild(info);
            gradientInfo.appendChild(totalInfo);
        }

        contentContainer.appendChild(gradientInfo);

        // todos
        let todosList = document.createElement("div");
        todosList.classList.add("todos-list");

        tasksArray.filter(task => task.status != "done").forEach(task => {
            let taskElement = document.createElement("div");
            taskElement.classList.add("task-element");

            let todoStatus = document.createElement("div");
            todoStatus.classList.add("todo-status");
            taskElement.appendChild(todoStatus);

            let todoName = document.createElement("p");
            todoName.textContent = task.taskName;
            taskElement.appendChild(todoName);

            let projectDiv = document.createElement("div");

            if (task.appendProject) {
                projectDiv.classList.add("project-assign");
                projectDiv.style.background = task.appendProject.background;
                projectDiv.style.padding = "2px 6px 2px 0px";

                let projectImgHolder = document.createElement("div");
                let projectName = document.createElement("p");

                projectImgHolder.classList.add("img-holder");
                projectImgHolder.style.background = task.appendProject.avatar;
                projectImgHolder.style.backgroundSize = "cover";

                projectName.textContent = task.appendProject.projectName;
                projectName.style.color = "#F5FFFC";
                projectName.style.fontSize = "12px";

                projectDiv.appendChild(projectImgHolder);
                projectDiv.appendChild(projectName);
                taskElement.appendChild(projectDiv);
            }

            task.tags.forEach(tag => {
                tagsArray.forEach(tagElement => {
                    if (tagElement.tagName == tag) {
                        let tagDiv = document.createElement("div");
                        tagDiv.classList.add("tag");
                        tagDiv.textContent = tagElement.tagName;
                        tagDiv.style.background = tagElement.color + "30";
                        tagDiv.style.color = tagElement.color;

                        taskElement.appendChild(tagDiv);
                    }
                })
            })

            let priorityDiv = document.createElement("div");
            let span = document.createElement("span");

            priorityDiv.appendChild(span);
            priorityDiv.classList.add("priority");
            priorityDiv.title = "Priority";

            if (task.priority == "high") {
                priorityDiv.classList.add("max");
                span.textContent = "!!";
            } else if (task.priorty == "medium") {
                priorityDiv.classList.add("medium");
                span.textContent = "!";
            } else {
                priorityDiv.classList.add("low");
                priorityDiv.classList.add("relative");
                span.textContent = "↓";
            }

            taskElement.appendChild(priorityDiv);
            todosList.appendChild(taskElement);
        })

        contentContainer.appendChild(todosList);
        mainContainer.appendChild(contentContainer);
    }

    const openNext7DaysPage = function() {
        
    }

    const openInboxPage = function() {
        
    }

    const openActivityPage = function() {
        
    }

    const openProjectsPage = function() {
        
    }

    const changeButtonActivityStatus = function(btn) {

    }

    return { openTodayPage }
})();