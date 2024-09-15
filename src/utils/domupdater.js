import { Tasks } from "../tasks";
import { Tags } from "../tags.js";
import { ObjectCreator } from "./objectcreator.js";
import { DOMSideGenerator } from "../domgenerator.js";
import { ButtonAssigner } from "../buttonassigner.js";

export const DomUpdater = (function() {
    const updateTodayList = function () {
        let todosListMain = document.querySelector(".todos-list");
        let todosListSide = document.querySelector(".todos-container");

        if (todosListMain.parentElement.classList.contains("days7page")) {
            todosListMain.innerHTML = "";
            todosListMain.appendChild(ObjectCreator.createTodayList("7days"));
            DOMSideGenerator.createTodos();
            ButtonAssigner.assignCompleteTask();
            return;
        }

        todosListMain.innerHTML = "";
        todosListMain.appendChild(ObjectCreator.createTodayList("today"));

        todosListSide.innerHTML = "";
        DOMSideGenerator.createTodos();

        let infoBars = document.querySelectorAll(".info");
        infoBars[0].textContent = Tasks.getUncompletedTasks("today").length;
        infoBars[1].textContent = Tasks.getCompletedTasks("today").length;

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
            tagNumber.textContent = tag["appendedProjects"].length + tag["appendedTasks"].length;

            tagElement.appendChild(imgHolder);
            tagElement.appendChild(tagName);
            tagElement.appendChild(tagNumber);

            tagsContainer.appendChild(tagElement);
        })

        let tagsAssigner = document.querySelector(".tags-assigner");
        tagsAssigner.innerHTML = "";

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

            tagsAssigner.appendChild(tagElement);
            tagsAssigner.appendChild(tagLabel);
        })

        Tags.saveToLocalStorage();
    }

    return { updateTodayList, updateTagsList };
})();