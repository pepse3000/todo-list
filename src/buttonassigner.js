import { Projects } from "./projects.js";
import { Tasks } from "./tasks.js";
import { Tags } from "./tags.js";
import { DOMSideGenerator } from "./domgenerator.js";
import { PageLocator } from "./pagelocator.js";

export const ButtonAssigner = (function() {
    const assignProjectButtons = function() {

    }

    const assignTagButtons = function() {

    }

    const assignMenuButtons = function() {
        let allBtns = document.querySelectorAll(".side-btn");

        allBtns[0].addEventListener("click", PageLocator.openTodayPage);
        console.log(allBtns)
    }

    return { assignMenuButtons }
})();