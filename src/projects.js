import avatar1 from './proj_avatars/1.png';
import avatar2 from './proj_avatars/2.png';

export const Projects = (function() {
    const projectsArray = [];

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
        "assignedTasks": []
    }

    const avatarUrls = [
        avatar1,
        avatar2,
    ]

    const avatarBackgroundColors = [
        "#009edd", // blue
        "#e83d56", // red
        "#0f1120", // black
        "#4d515c", // gray
    ]

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
    
        array.push(newProject);
    }

    const redactVariable = function(projectId, variable, value) {
        let findArray = projectsArray.filter(project => {
            project["projectId"] == projectId;
        })

        if (findArray) {
            findArray[variable] == value;
            return console.log("redacted");
        }

        return false;
    }

    const createFirstLoadProjects = (function() {
        if (!localStorage.getItem("projectArray")) {
            createProject(
                projectsArray,
                "Gamer Boy",
                "A gaming project targeting young gamers",
                [],
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
            projectsArray = JSON.parse(localStorage.getItem("projectArray"));
        }
    })();

    return { createProject, redactVariable, avatarBackgroundColors, projectsArray }
})();