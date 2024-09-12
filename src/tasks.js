import { Projects } from "./projects.js";

export const Tasks = (function() {
    let tasksArray = [];
    const projectArray = Projects.projectsArray;

    const taskTemplate = {   
        "taskId": 0,
        "appendProjectName": "",
        "appendProjectId": "",
        "taskName": "",
        "tags": "",
        "priority": "",
        "createDate": "",
        "dueDate": "", 
        "status": "",
    }

    const createTask = function(
        array,
        appendProjectName,
        appendProjectId,
        taskName,
        tags,
        priority,
        createDate,
        dueDate,
        status,
    ) {
        let newTask = { ...taskTemplate };

        newTask.appendProjectName = appendProjectName;
        newTask.appendProjectId = appendProjectId;
        newTask.taskName = taskName;
        newTask.priority = priority;
        newTask.createDate = createDate;
        newTask.dueDate = dueDate;
        newTask.tags = tags;
        newTask.status = status;

        newTask.taskId = array.length + 1;
    
        array.push(newTask);
    }

    const appendTasks = function() {
        tasksArray.forEach(task => {
            console.log(task);
            let project = projectArray.find(proj => proj.projectId === task.appendProjectId);

            if (project && !project.assignedTasks.includes(task)) {
                project.assignedTasks.push(task);

            }
        });
    };

    const createFirstLoadTasks = (function() {
        if (!localStorage.getItem("projectArray")) {
            createTask(
                tasksArray,
                "Gamer Boy",            
                1,                      
                "Set up multiplayer",    
                ["networking", "backend"], 
                "Medium",                
                "2024-09-15",            
                "2024-11-01",            
                "Pending"             
            );

            createTask(
                tasksArray,
                "Gamer Boy",            
                1,                      
                "Set up multiplayer",    
                ["networking", "backend"], 
                "Medium",                
                "2024-09-15",            
                "2024-11-01",            
                "Pending"             
            );
        } else {
            tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
        }
    })();

    return { createFirstLoadTasks, appendTasks, createTask, tasksArray }
})();