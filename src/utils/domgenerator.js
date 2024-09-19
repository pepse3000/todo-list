import { Projects } from "../classes/projects.js";
import { Tasks } from "../classes/tasks.js";
import { Tags } from "../classes/tags.js";
import { TimeConverter } from "./timeconverter.js";
import { ButtonAssigner } from "./buttonassigner.js";
import { DomUpdater } from "./domupdater.js";

export const DOMSideGenerator = (function() {
    const projectsArray = Projects.projectsArray;
    const tagsArray = Tags.tagsArray;
    const tasksArray = Tasks.tasksArray;
    const avatarBackgroundColors = Projects.avatarBackgroundColors;

    const createProjects = (function() {
        if (projectsArray) {
            let projectContainer = document.querySelector(".projects-container");
            projectContainer.innerHTML = "";

            projectsArray.forEach(project => {
                let projectElement = document.createElement("div");
                let imgHolder = document.createElement("div");
                let projectName = document.createElement("p");
                let projectNumber = document.createElement("p");

                projectElement.id = `p${project["projectId"]}`;
                projectElement.classList.add("project-element");

                imgHolder.classList.add("img-holder");
                imgHolder.style.background = project["avatar"];
                imgHolder.style.backgroundColor = project["background"];
                imgHolder.style.backgroundSize = "cover";
                imgHolder.style.backgroundRepeat = "no-repeat";
                imgHolder.style.backgroundPosition = "center";

                projectName.innerText = project["projectName"];

                projectNumber.classList.add("number");
                projectNumber.innerText = project["assignedTasks"].filter(task => Tasks.getTaskState(task) != "done").length;

                projectElement.appendChild(imgHolder);
                projectElement.appendChild(projectName);
                projectElement.appendChild(projectNumber);

                projectContainer.appendChild(projectElement);
            });


            ButtonAssigner.assignOpenProjectSide();
        }
    });

    const createTags = (function() {
        if (tagsArray) {
            let tagsContainer = document.querySelector(".tags-container");
            tagsContainer.innerHTML = "";

            tagsArray.forEach(tag => {
                let tagElement = document.createElement("div");
                let imgHolder = document.createElement("div");
                let tagName = document.createElement("p");
                let tagNumber = document.createElement("p");

                tagElement.classList.add("tag-element");
                tagElement.id = `t${tag["tagId"]}`;

                imgHolder.classList.add("img-holder");
                imgHolder.style.background = tag["color"];

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
        }

        ButtonAssigner.assignShowCreateTagForm();
        ButtonAssigner.assignCreateNewTag();
        
    });

    const createTodos = (function() {
        if (tasksArray) {
            let todosContainer = document.querySelector(".todos-container");
            todosContainer.innerHTML = "";

            let sortedTasksArray = [ ...tasksArray ].sort((a, b) => {
                return new Date(a.dueDate) - new Date(b.dueDate);
            })

            sortedTasksArray.forEach(task => {

                if (task.status == "done") {
                    return;
                }

                let todoElement = document.createElement("div");
                todoElement.classList.add("todo-element");
                todoElement.id = `task${task.taskId}`

                // task-main-info
                let taskMainInfo = document.createElement("div");
                let todoStatus = document.createElement("div");
                let todoText = document.createElement("p");
                let projectDiv = document.createElement("div");

                // if task appended to project
                if (task.appendProjectId) {
                    let appendProject = projectsArray[task.appendProjectId - 1];

                    projectDiv.classList.add("project-assign");
                    projectDiv.style.background = appendProject.background;

                    let projectImgHolder = document.createElement("div");
                    let projectName = document.createElement("p");

                    projectImgHolder.classList.add("img-holder");
                    projectImgHolder.style.background = appendProject.avatar;
                    projectImgHolder.style.backgroundSize = "cover";

                    projectName.textContent = appendProject.projectName;
                    projectName.style.color = "#F5FFFC";

                    projectDiv.appendChild(projectImgHolder);
                    projectDiv.appendChild(projectName);
                    
                }
                
                taskMainInfo.classList.add("task-main-info");
                todoStatus.classList.add("todo-status");
                todoText.textContent = task.taskName;
                todoText.classList.add("task-name");

                taskMainInfo.appendChild(todoStatus);
                taskMainInfo.appendChild(todoText);
                taskMainInfo.appendChild(projectDiv);
                
                todoElement.appendChild(taskMainInfo);

                // task-sub-info
                let taskSubInfo = document.createElement("div");

                taskSubInfo.classList.add("task-sub-info");

                //  ----  tags
                task.tags.forEach(tag => {
                    tagsArray.forEach(tagElement => {
                        if (tagElement.tagName == tag) {
                            let tagDiv = document.createElement("div");
                            tagDiv.classList.add("tag");
                            tagDiv.textContent = tagElement.tagName;
                            tagDiv.style.background = tagElement.color + "30";
                            tagDiv.style.color = tagElement.color;

                            taskSubInfo.appendChild(tagDiv);
                        }
                    })
                })

                // -----  priority
                let priorityDiv = document.createElement("div");
                let span = document.createElement("span");

                priorityDiv.appendChild(span);
                priorityDiv.classList.add("priority");
                priorityDiv.title = "Priority";

                if (task.priority == "max") {
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

                // -----  date
                let date = document.createElement("p");

                date.textContent = TimeConverter.convertDateToString(task.dueDate);
                date.classList.add("date");

                if (TimeConverter.checkExpiryDate(task.dueDate) == "expiry") {
                    date.classList.add("expiry");
                }

                taskSubInfo.appendChild(priorityDiv);
                taskSubInfo.appendChild(date);
                todoElement.appendChild(taskSubInfo);
                
                todosContainer.appendChild(todoElement);
            })

            if (document.querySelector(".todos-container").childElementCount == 0) {
                let noTasks = document.createElement("div");
                noTasks.classList.add("no-task");
                noTasks.textContent = "There is no tasks! Great job!";
                todosContainer.appendChild(noTasks); 
            }

        }
    });

    const createNotes = (function() {

    })


    return { createProjects, createTags, createTodos };
})();