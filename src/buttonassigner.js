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
            console.log(priority)

            let tags = document.querySelectorAll("input[type='checkbox']:checked");
            let tagsNames = [];
            tags.forEach(tag => {
                tagsNames.push(tag.name);
            })
            
            let date = document.querySelector("#date").value;
            
            Tasks.createTask(
                Tasks.tasksArray,
                "",
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
        })
    }

    const assignCompleteTask = function() {
        let allBtns = document.querySelectorAll(".todo-status");

        allBtns.forEach(btn => {
            btn.addEventListener("click", e => {
                Tasks.completeTask(e.target)
                setTimeout(DomUpdater.updateTodayList, 1500);
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

    return { 
        assignMenuButtons, 
        assignShowSetInfo, 
        assingSetInfoDayPickers, 
        assignCreateNewTask,
        assignCompleteTask,
        assignShowCreateTagForm,
        assignCreateNewTag
     }
})();