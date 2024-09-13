import { Projects } from "./projects";

export const Tags = (function() {
    let tagsArray = [];
    let projectsArray = Projects.projectsArray;

    const tagTemplate = {   
        "tagId": 0,
        "tagName": "",
        "color": "",
        "appendedProjects": [],
    }

    const tagsColors = {
        "dark-blue": "#5577FF",
        "light-blue": "#49CCF9",
        "red": "#FD71AF", 
        "green": "#00B884", 
        "purple": "#7B68EE", 
        "yellow": "#FFC800", 
    }

    const countTagUsage = function(tag) {
        let tagsCount = 0;
        let appendedProjects = [];

        projectsArray.forEach(project => {
            if (project["tags"].includes(tag)) {
                appendedProjects.push(project["projectId"]);
            }
        })

        return appendedProjects;
    }

    const createTag = function(array, tagName, color) {
        let newTag = { ...tagTemplate };
        
        newTag.tagId = tagsArray.length + 1;
        newTag.tagName = tagName;
        newTag.color = color;
        newTag.appendedProjects = countTagUsage(newTag.tagName);

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

    return { tagsArray, createTag, createFirstLoadTasks };
})();