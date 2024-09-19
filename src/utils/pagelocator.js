import { Projects } from "../classes/projects.js";
import { Tasks } from "../classes/tasks.js";
import { Tags } from "../classes/tags.js";
import { DOMSideGenerator } from "./domgenerator.js";
import { TimeConverter } from "./timeconverter.js";
import { ObjectCreator } from "./objectcreator.js";
import { ButtonAssigner } from "./buttonassigner.js";
import { DomUpdater } from "./domupdater.js";

export const PageLocator = (function() {
    const tagsArray = Tags.tagsArray;
    const tasksArray = Tasks.tasksArray;
    const projectsArray = Projects.projectsArray;
    const btnsArray = document.querySelectorAll(".side-btn")

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

        let cardContent = [Tasks.getUncompletedTasks("today").length, Tasks.getCompletedTasks("today").length, Projects.sortProjectsByTasks()[0].projectName];

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
        let taskForm = ObjectCreator.createNewTaskInput();
        taskForm.classList.add("new-task");

        let todosList = ObjectCreator.createTodayList("today");

        changeButtonActivityStatus(btnsArray, 0);
        contentContainer.appendChild(taskForm);
        contentContainer.appendChild(todosList);
        mainContainer.appendChild(contentContainer);

        let tagsAssigner = document.querySelector(".tags-assigner");

        tagsArray.forEach(tag => {
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

            tagsAssigner.appendChild(tagElement);
            tagsAssigner.appendChild(tagLabel);
        })

        let projectAssigner = document.querySelector(".project-assigner");

        projectsArray.forEach(project => {
            let projectElement = document.createElement("input");
            let projectLabel = document.createElement("label");

            projectElement.type = "radio";
            projectElement.id = project.projectName;
            projectElement.name = "project";
            projectElement.value = project.projectId;

            projectLabel.htmlFor = project.projectName;
            projectLabel.textContent = project.projectName;
            projectLabel.style.background = project.background;
            projectLabel.style.color = "white";

            projectAssigner.appendChild(projectElement);
            projectAssigner.appendChild(projectLabel);
        })

        ButtonAssigner.assignCreateNewTask();
        ButtonAssigner.assignShowSetInfo();
        ButtonAssigner.assingSetInfoDayPickers();

        DomUpdater.updateTodayList();
        DOMSideGenerator.createTodos();
        ButtonAssigner.assignCompleteTask();
        ButtonAssigner.assignDeleteTask();
        ButtonAssigner.assignOpenProject(true);
    }

    const openNext7DaysPage = function() {
        // main document
        let mainContainer = document.querySelector(".main-container");
        mainContainer.innerHTML = "";

        let contentContainer = document.createElement("div");
        contentContainer.classList.add("content-container", "days7page");

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
        headerName.textContent = "Next 7 Days Tasks"

        mainHeader.appendChild(iconHolder);
        mainHeader.appendChild(headerName);
        contentContainer.appendChild(mainHeader);

        // page info
        let gradientInfo = document.createElement("div");
        gradientInfo.classList.add("gradient-info", "days7");

        let mainText = document.createElement("p");
        mainText.textContent = "The future is something which everyone reaches at the rate of sixty minutes an hour, whatever he does, whoever he is.";
        gradientInfo.appendChild(mainText);

        // total info cards
        let cardText = ["Next 7 Days Tasks", "Completed in 7 days", "Heaviest project"];

        let cardContent = [Tasks.getUncompletedTasks("7days").length, Tasks.getCompletedTasks("7days").length, Projects.sortProjectsByTasks()[0].projectName];

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

        let todosList = ObjectCreator.createTodayList("7days");

        changeButtonActivityStatus(btnsArray, 1);
        contentContainer.appendChild(todosList);
        mainContainer.appendChild(contentContainer);
        DOMSideGenerator.createTodos();
        ButtonAssigner.assignOpenProject(true);
        ButtonAssigner.assignDeleteTask();
        ButtonAssigner.assignCompleteTask();
    }

    const openInboxPage = function() {
        let mainContainer = document.querySelector(".main-container");
        mainContainer.innerHTML = "";

        let contentContainer = document.createElement("div");
        contentContainer.classList.add("content-container", "inboxpage");

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
        headerName.textContent = "Inbox"

        mainHeader.appendChild(iconHolder);
        mainHeader.appendChild(headerName);
        contentContainer.appendChild(mainHeader);

        // page info
        let gradientInfo = document.createElement("div");
        gradientInfo.classList.add("gradient-info", "inbox");

        let mainText = document.createElement("p");
        mainText.textContent = "If we all did the things we are capable of doing, we would literally astound ourselves.";
        gradientInfo.appendChild(mainText);

        // total info cards
        let cardText = ["Inbox count", "Total tasks", "Heaviest project"];

        let cardContent = [Tasks.getUncompletedTasks("inbox").length, Tasks.getCompletedTasks().length, Projects.sortProjectsByTasks()[0].projectName];

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

        let taskForm = ObjectCreator.createNewTaskInput("inbox");
        taskForm.classList.add("new-task");

        let todosList = ObjectCreator.createTodayList("inbox");

        contentContainer.appendChild(taskForm);
        contentContainer.appendChild(todosList);
        mainContainer.appendChild(contentContainer);

        let tagsAssigner = document.querySelector(".tags-assigner");

        tagsArray.forEach(tag => {
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

            tagsAssigner.appendChild(tagElement);
            tagsAssigner.appendChild(tagLabel);
        })

        let input = document.querySelector("#taskname");
        input.placeholder = "+     Add task to Inbox List";

        ButtonAssigner.assignCreateNewTask();
        ButtonAssigner.assignShowSetInfo();
        ButtonAssigner.assingSetInfoDayPickers();
        
        DOMSideGenerator.createTodos();
        ButtonAssigner.assignCompleteTask();
        ButtonAssigner.assignDeleteTask();
        ButtonAssigner.assignOpenProject(true);

        changeButtonActivityStatus(btnsArray, 2);
    }

    const openActivityPage = function() {
        let mainContainer = document.querySelector(".main-container");
        mainContainer.innerHTML = "";

        let contentContainer = document.createElement("div");
        contentContainer.classList.add("content-container", "activitypage");

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
        headerName.textContent = "Activity"

        mainHeader.appendChild(iconHolder);
        mainHeader.appendChild(headerName);
        contentContainer.appendChild(mainHeader);

        // page info
        let gradientInfo = document.createElement("div");
        gradientInfo.classList.add("gradient-info", "inbox");

        let mainText = document.createElement("p");
        mainText.textContent = "To achieve greatness, start where you are, use what you have, and do what you can.";
        gradientInfo.appendChild(mainText);

        // total info cards
        let cardText = ["Last Activity", "Completed Tasks", "Heaviest project"];

        let cardContent = [String(Tasks.getLastTaskActivity(true)).length > 0 ? TimeConverter.getHourAndMinute(Tasks.getLastTaskActivity(true)) : "No activity", Tasks.getCompletedTasks().length, Projects.sortProjectsByTasks()[0].projectName];

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

        let todosList = ObjectCreator.createCompleteTasks("activity");

        contentContainer.appendChild(todosList);
        mainContainer.appendChild(contentContainer);

        ButtonAssigner.assignUndoActivityTask();
        DOMSideGenerator.createTodos();
        ButtonAssigner.assignCompleteTask();
        ButtonAssigner.assignDeleteTask();
        ButtonAssigner.assignOpenProject(true);

        changeButtonActivityStatus(btnsArray, 3);
    }

    const openProjectsPage = function() {
        let mainContainer = document.querySelector(".main-container");
        mainContainer.innerHTML = "";

        let todosAndProjectsDiv = document.createElement("div");
        todosAndProjectsDiv.classList.add("todos-and-projects", "project-todos");

        // Todos header
        let todosHeader = document.createElement("div");
        todosHeader.classList.add("header");

        let iconHolder = document.createElement("div");
        iconHolder.classList.add("icon-holder");
        let todoHeader = document.createElement("h2");
        todoHeader.textContent = "Projects Todos";

        todosHeader.appendChild(iconHolder);
        todosHeader.appendChild(todoHeader);
        todosAndProjectsDiv.appendChild(todosHeader);

        let todosContainer = document.createElement("div");
        todosContainer.classList.add("todos-list");
        todosContainer.appendChild(ObjectCreator.createTodayList("project"));
        todosAndProjectsDiv.appendChild(todosContainer);

        let projectsHeader = document.createElement("div");
        projectsHeader.classList.add("header");

        let projectIconHolder = document.createElement("div");
        projectIconHolder.classList.add("icon-holder");
        let projectHeader = document.createElement("h2");
        projectHeader.textContent = "Latest Projects";

        projectsHeader.appendChild(projectIconHolder);
        projectsHeader.appendChild(projectHeader);
        todosAndProjectsDiv.appendChild(projectsHeader);

        let projectList = document.createElement("div");
        projectList.classList.add("projects-list");

        projectsArray.forEach(project => {
            let projectElement = ObjectCreator.createProjectFolder(project);
            projectList.appendChild(projectElement);
        });

        todosAndProjectsDiv.appendChild(projectList);
        mainContainer.appendChild(todosAndProjectsDiv);

        ButtonAssigner.assignUndoActivityTask();

        DOMSideGenerator.createTodos();
        ButtonAssigner.assignCompleteTask();
        ButtonAssigner.assignDeleteTask();
        ButtonAssigner.assignOpenProject(true);

        changeButtonActivityStatus(btnsArray, 4);
    }

    const openSingleProjectPage = function(project) {
        let mainContainer = document.querySelector(".main-container");
        mainContainer.innerHTML = "";

        let contentContainer = document.createElement("div");
        contentContainer.classList.add("content-container", "single-project");

        // header
        let mainHeader = document.createElement("div");
        mainHeader.classList.add("main-header");

        let iconHolder = document.createElement("div");
        iconHolder.classList.add("icon-holder");
        iconHolder.style.background = project.background;
        iconHolder.style.borderRadius = "5px";

        let headerName = document.createElement("h2");
        headerName.textContent = project.projectName;
        headerName.style.fontSize = "18px";

        mainHeader.appendChild(iconHolder);
        mainHeader.appendChild(headerName);
        contentContainer.appendChild(mainHeader);

        // page info
        let gradientInfo = document.createElement("div");
        gradientInfo.classList.add("gradient-info");
        gradientInfo.style.background = project.gradient;
        gradientInfo.style.backgroundSize = "cover";

        let mainText = document.createElement("div");
        mainText.classList.add("main-text");
        let imgHolder = document.createElement("div");
        imgHolder.classList.add("img-holder");
        imgHolder.style.background = project.avatar;
        imgHolder.style.backgroundColor = project.background;
        imgHolder.style.backgroundSize = "cover";
        imgHolder.style.width = "45px";
        imgHolder.style.height = "45px";
        imgHolder.style.flexShrink = 0;

        let projectTextContent = document.createElement("div");
        let projectName = document.createElement("h4");
        projectName.classList.add("project-name");
        projectName.textContent = project.projectName;
        projectName.style.fontSize = "16px";
        projectName.style.fontWeight = "bold";

        let projectDescription = document.createElement("p");
        projectDescription.textContent = project.small_desc;
        projectDescription.style.fontSize = "14px";
        projectDescription.style.fontWeight = "400";

        mainText.appendChild(imgHolder);

        projectTextContent.appendChild(projectName);
        projectTextContent.appendChild(projectDescription);
        mainText.style.display = "flex";
        mainText.style.alignItems = "center";
        mainText.style.gap = "10px";
        mainText.appendChild(projectTextContent);
        gradientInfo.appendChild(mainText);

        // total info cards
        let cardText = ["Created", "Completed Tasks", "Total Tasks"];

        let cardContent = [TimeConverter.convertDateToString(project.created), Tasks.getCompletedTasksByProject(project.projectId).length, project.assignedTasks.filter(task => task.status != "done").length];

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
        contentContainer.appendChild(ObjectCreator.createProjectInfo(project));
        mainContainer.appendChild(contentContainer);

        // Tasks
        let projectTasksContainer = document.createElement("div");
        projectTasksContainer.classList.add("project-tasks", "single-project-todos");

        let projectHeader = document.createElement("h2");
        projectHeader.textContent = "Project Tasks";

        projectTasksContainer.appendChild(projectHeader);
        projectTasksContainer.appendChild(ObjectCreator.createProjectTasks(project.projectId))
        
        mainContainer.appendChild(projectTasksContainer);
        ButtonAssigner.assignUndoActivityTask();
        ButtonAssigner.assignCompleteTask();
        ButtonAssigner.assignDeleteTask();
    }

    const changeButtonActivityStatus = function(btnsArray, id) {
        if (btnsArray[id].classList.contains("active")) {
            return;
        } else {
            btnsArray.forEach(btn => {
                if (btn.classList.contains("active")) {
                    btn.classList.remove("active");
                }
            })

            btnsArray[id].classList.add("active");
        }
    }

    const showInfo = function(element, status) {
        let showDiv = document.querySelector(element);

        let hideDiv = function() {
            showDiv.classList.add("hidden");
        }

        if (status == "open") {
            if (showDiv.classList.contains("hidden")) {
                return;
            }

            showDiv.classList.add("hidden");
            return;
        }

        if (status == "show") {
            if (showDiv.classList.contains("hidden")) {
                showDiv.classList.remove("hidden");
                setTimeout(hideDiv, 3000);
                return;
            }
        }

        if (showDiv.classList.contains("hidden")) {
            showDiv.classList.remove("hidden");
        } else {
            showDiv.classList.add("hidden");
        }
    }

    return { 
        openTodayPage,
        openNext7DaysPage,
        openInboxPage,
        openActivityPage,
        openProjectsPage,
        openSingleProjectPage,
        changeButtonActivityStatus,
        showInfo
     }
})();