import { Projects } from "./projects";
import { Tasks } from "./tasks.js";

export const Tags = (function() {
    let tagsArray = [];
    let tasksArray = Tasks.tasksArray;
    let projectsArray = Projects.projectsArray;

    const tagTemplate = {   
        "tagId": 0,
        "tagName": "",
        "color": "",
        "appendedProjects": [],
        "appendedTasks": [],
    }

    const tagsColors = {
        "dark-blue": "#5577FF",
        "light-blue": "#49CCF9",
        "red": "#FD71AF", 
        "green": "#00B884", 
        "purple": "#7B68EE", 
        "yellow": "#FFC800", 
    }

    const countTagUsage = function(tagName, tag) {
        let appendedProjects = [];
        let appendedTasks = [];

        projectsArray.forEach(project => {
            if (project["tags"].includes(tagName)) {
                appendedProjects.push(project["projectId"]);
            }
        })

        tasksArray.forEach(task => {
            if (task["tags"].includes(tagName)) {
                appendedTasks.push(task["taskId"]);
            }
        })

        if (tag) {
            tag.appendedProjects = appendedProjects;
            tag.appendedTasks = appendedTasks;
        }

        return [ appendedProjects, appendedTasks ];
    }

    const createTag = function(array, tagName, color) {
        let newTag = { ...tagTemplate };

        newTag.tagId = tagsArray.length + 1;
        newTag.tagName = tagName;
        newTag.color = color;

        let projectAndTaskTagCount = countTagUsage(newTag.tagName);
        newTag.appendedProjects = projectAndTaskTagCount[0];
        newTag.appendedTasks = projectAndTaskTagCount[1];

        array.push(newTag);
        saveToLocalStorage();
    }

    const saveToLocalStorage = function() {
        localStorage.setItem("tagsArray", JSON.stringify(tagsArray));
    }

    const createFirstLoadTasks = (function() {
        if (!localStorage.getItem("tagsArray")) {
            createTag(
                tagsArray,
                "Economic",
                tagsColors["purple"]                
            );

            createTag(
                tagsArray,
                "Finance",
                tagsColors["green"]                
            );

            createTag(
                tagsArray,
                "Selfcare",
                tagsColors["red"]                
            );

            createTag(
                tagsArray,
                "Shopping",
                tagsColors["purple"]
            )
        } else {
            tagsArray = JSON.parse(localStorage.getItem("tagsArray"));
        }
    })();

    return { 
        tagsArray, 
        createTag, 
        createFirstLoadTasks,
        tagsColors,
        countTagUsage,
        saveToLocalStorage
     };
})();