import { Projects } from "./projects.js";
import { Tasks } from "./tasks.js";
import { Tags } from "./tags.js";
import { DOMSideGenerator } from "./domgenerator.js";
import { TimeConverter } from "./utils/timeconverter.js";
import { ObjectCreator } from "./utils/objectcreator.js";
import { ButtonAssigner } from "./buttonassigner.js";

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
        let taskForm = ObjectCreator.createNewTaskInput();
        taskForm.classList.add("new-task");

        let todosList = ObjectCreator.createTodayList(tasksArray);

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

        ButtonAssigner.assignCreateNewTask();
        ButtonAssigner.assignShowSetInfo();
        ButtonAssigner.assingSetInfoDayPickers();
    }

    const openNext7DaysPage = function() {
        changeButtonActivityStatus(btnsArray, 1);
    }

    const openInboxPage = function() {
        changeButtonActivityStatus(btnsArray, 2);
    }

    const openActivityPage = function() {
        changeButtonActivityStatus(btnsArray, 3);
    }

    const openProjectsPage = function() {
        changeButtonActivityStatus(btnsArray, 4);
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

    const showSetInfo = function(status) {
        let setInfoDiv = document.querySelector(".set-info");

        if (status == "open") {
            if (setInfoDiv.classList.contains("hidden")) {
                return;
            }
            
            setInfoDiv.classList.add("hidden");
            return;
        }

        if (setInfoDiv.classList.contains("hidden")) {
            setInfoDiv.classList.remove("hidden");
        } else {
            setInfoDiv.classList.add("hidden");
        }
    }

    return { 
        openTodayPage,
        openNext7DaysPage,
        openInboxPage,
        openActivityPage,
        openProjectsPage,
        showSetInfo
     }
})();