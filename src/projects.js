import avatar1 from './proj_avatars/1.png';
import avatar2 from './proj_avatars/2.png';
import avatar3 from './proj_avatars/3.png';
import avatar4 from './proj_avatars/4.png';
import avatar5 from './proj_avatars/5.png';
import avatar6 from './proj_avatars/6.png';
import avatar7 from './proj_avatars/7.png';
import avatar8 from './proj_avatars/8.png';
import avatar9 from './proj_avatars/9.png';
import avatar10 from './proj_avatars/10.png';

import gradient1 from './gradients/03.png';
import gradient2 from './gradients/04.png';
import gradient3 from './gradients/16.png';
import gradient4 from './gradients/18.png';
import gradient5 from './gradients/21.png';
import gradient6 from './gradients/22.png';
import gradient7 from './gradients/26.png';
import gradient8 from './gradients/31.png';
import gradient9 from './gradients/88.png';

export const Projects = (function() {
    let projectsArray = [];

    const projectTemplate = {
        "projectId": 0,
        "projectName": "",
        "small_desc": "",
        "tags": [],
        "priority": "",
        "describtion": "",
        "created": "",
        "deadline": "",
        "avatar": "",
        "background": "",
        "assignedTasks": []
    }

    const avatarUrls = [
        avatar1,
        avatar2,
        avatar3,
        avatar4,
        avatar5,
        avatar6,
        avatar7,
        avatar8,
        avatar9,
        avatar10
    ]

    const gradientUrls = [
        `url(${gradient1})`,
        `url(${gradient2})`,
        `url(${gradient3})`,
        `url(${gradient4})`,
        `url(${gradient5})`,
        `url(${gradient6})`,
        `url(${gradient7})`,
        `url(${gradient8})`,
        `url(${gradient9})`,
    ]

    const avatarBackgroundColors = [
        "#009edd", // blue
        "#e83d56", // red
        "#0f1120", // black
        "#4d515c", // gray
    ]

    const saveToLocalStorage = function() {
        localStorage.setItem("projectsArray", JSON.stringify(projectsArray));
    }

    const createProject = function(
        array,
        projectName,
        small_desc,
        tags,
        priority,
        describtion,
        created,
        deadline,
    ) {
        let newProject = { ...projectTemplate };

        if (projectName.length > 30) {
            return "length>30";
        }

        newProject.projectName = projectName;
        newProject.small_desc = small_desc;
        newProject.priority = priority;
        newProject.describtion = describtion;
        newProject.created = created;
        newProject.deadline = deadline;
        newProject.tags = tags;

        newProject.projectId = array.length + 1;
        newProject.assignedTasks = [];

        let imageUrl = avatarUrls[Math.floor(Math.random()*avatarUrls.length)];
        newProject.avatar = `url(${imageUrl})`;
        let backgroundColor = avatarBackgroundColors[Math.random() * avatarBackgroundColors.length | 0];
        newProject.background = backgroundColor;
        let gradient = gradientUrls[Math.random() * gradientUrls.length | 0];
        newProject.gradient = gradient;
        
        array.push(newProject);
        saveToLocalStorage();

    }

    const redactVariable = function(projectId, variable, value) {
        let findArray = projectsArray.filter(project => {
            project["projectId"] == projectId;
        })

        if (findArray) {
            findArray[variable] == value;
        }

        return false;
    }

    const sortProjectsByTasks = function() {
        let arrayToSort = [ ...projectsArray ];
        return arrayToSort.sort((a, b) => b.assignedTasks.length - a.assignedTasks.length);
    }

    const getProjectById = function(projectId) {
        let returnProject = projectsArray.find(project => project.projectId == projectId)
        return returnProject ? returnProject : null;
    }

    const createFirstLoadProjects = (function() {
        if (!localStorage.getItem("projectsArray")) {
            createProject(
                projectsArray,
                "Gamer Boy",
                "A gaming project targeting young gamers",
                ["Shopping"],
                "high",
                "Gamer Boy is an online multiplayer gaming platform designed to engage young gamers with a variety of mini-games and competitive tournaments.",
                new Date(),
                "2024-12-31",
            );
    
            createProject(
                projectsArray,
                "Eco Solutions",
                "A project focused on sustainable environmental solutions",
                [],
                "medium",
                "Eco Friendly Solutions aims to develop and promote innovative solutions for reducing carbon footprint through green energy initiatives, recycling technologies, and environmental awareness programs.",
                new Date(),
                "2025-03-01",
            )

            createProject(
                projectsArray,
                "Test Your Project!",
                "Test your project with the following commands and features!",
                ["Economic", "Finance"],
                "medium",
                "Eco Friendly Solutions aims to develop and promote innovative solutions for reducing carbon footprint through green energy initiatives, recycling technologies, and environmental awareness programs.",
                new Date(),
                "2025-03-01",
            )
        } else {
            projectsArray = JSON.parse(localStorage.getItem("projectsArray"));
        }
    })();

    return { 
        createProject, 
        redactVariable, 
        avatarBackgroundColors, 
        projectsArray,
        saveToLocalStorage,
        sortProjectsByTasks,
        gradientUrls,
        getProjectById
     }
})();