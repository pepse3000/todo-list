import { Projects } from "./projects.js";
import { Tasks } from "./tasks.js";

export const DOMSideGenerator = (function() {
    const projectsArray = Projects.projectsArray;
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

                projectElement.id = project["projectId"];
                projectElement.classList.add("project-element");

                imgHolder.classList.add("img-holder");
                imgHolder.style.background = project["avatar"];
                imgHolder.style.backgroundColor = project["background"];
                imgHolder.style.backgroundSize = "cover";

                projectName.innerText = project["projectName"];

                projectNumber.classList.add("number");
                projectNumber.innerText = project["assignedTasks"].length;

                projectElement.appendChild(imgHolder);
                projectElement.appendChild(projectName);
                projectElement.appendChild(projectNumber);

                projectContainer.appendChild(projectElement);
            });
        }
    });

    const createTags = (function() {

    })();

    const createTodos = (function() {

    })();

    const createNotes = (function() {

    })


    return { createProjects };
})();