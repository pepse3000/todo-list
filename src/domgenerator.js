import { Projects } from "./projects.js";
import { ProjectTasks } from "./tasks.js";
import { Tags } from "./tags.js";

export const DOMSideGenerator = (function() {
    const projectsArray = Projects.projectsArray;
    const tagsArray = Tags.tagsArray;
    const tasksArray = ProjectTasks.tasksArray;
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
                projectNumber.innerText = project["assignedTasks"].length;

                projectElement.appendChild(imgHolder);
                projectElement.appendChild(projectName);
                projectElement.appendChild(projectNumber);

                projectContainer.appendChild(projectElement);
            });
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
                tagNumber.textContent = tag["appendedProjects"].length;

                tagElement.appendChild(imgHolder);
                tagElement.appendChild(tagName);
                tagElement.appendChild(tagNumber);

                tagsContainer.appendChild(tagElement);
            })
        }
    })();

    const createTodos = (function() {

    })();

    const createNotes = (function() {

    })


    return { createProjects };
})();