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

        if (projectName.length > 20) {
            return "length>20";
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

    const createFirstLoadProjects = (function() {
        if (!localStorage.getItem("projectsArray")) {
            createProject(
                projectsArray,
                "Gamer Boy",
                "A gaming project targeting young gamers",
                ["Shopping"],
                "high",
                "Gamer Boy is an online multiplayer gaming platform designed to engage young gamers with a variety of mini-games and competitive tournaments.",
                "2024-09-13",
                "2024-12-31",
            );
    
            createProject(
                projectsArray,
                "Eco Solutions",
                "A project focused on sustainable environmental solutions",
                [],
                "medium",
                "Eco Friendly Solutions aims to develop and promote innovative solutions for reducing carbon footprint through green energy initiatives, recycling technologies, and environmental awareness programs.",
                "2024-09-13",
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
        sortProjectsByTasks
     }
})();