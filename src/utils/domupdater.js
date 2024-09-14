import { Tasks } from "../tasks";
import { ObjectCreator } from "./objectcreator.js";
import { DOMSideGenerator } from "../domgenerator.js";

export const DomUpdater = (function() {
    const updateTodayList = function () {
        let todosListMain = document.querySelector(".todos-list");
        let todosListSide = document.querySelector(".todos-container");

        todosListMain.innerHTML = "";
        todosListMain.appendChild(ObjectCreator.createTodayList());

        todosListSide.innerHTML = "";
        DOMSideGenerator.createTodos();
    }

    return { updateTodayList };
})();