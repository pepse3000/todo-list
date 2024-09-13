import { Projects } from "./projects.js";

export const Tasks = (function() {
    let tasksArray = [];
    const projectArray = Projects.projectsArray;

    const taskTemplate = {   
        "taskId": 0,
        "appendProjectName": "",
        "appendProjectId": "",
        "taskName": "",
        "tags": [],
        "priority": "",
        "createDate": "",
        "dueDate": "", 
        "status": "",
    }

    const createTask = function(
        array,
        appendProjectId,
        taskName,
        tags,
        priority,
        createDate,
        dueDate,
        status,
    ) {
        let newTask = { ...taskTemplate };

        newTask.appendProjectName = projectArray[appendProjectId - 1]["projectName"];
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

    const appendTasksFirstLoad = function() {
        tasksArray.forEach(task => {
            let project = projectArray.find(proj => proj.projectId === task.appendProjectId);

            if (project && !project.assignedTasks.includes(task)) {
                project.assignedTasks.push(task);
            }
        });
    };

    const createFirstLoadTasks = (function() {
        if (!localStorage.getItem("tasksArray")) {
            createTask(
                tasksArray,          
                1,                      
                "Set up multiplayer",    
                ["networking", "backend"], 
                "medium",                
                "2024-09-15",            
                "2024-11-01",            
                "in_progress"             
            );

            createTask(
                tasksArray,           
                1,                      
                "Set up multiplayer",    
                ["networking", "backend"], 
                "medium",                
                "2024-09-15",            
                "2024-11-01",            
                "done"             
            );

            createTask(
                tasksArray,           
                2,                      
                "Get solution",    
                ["selfcare"], 
                "high",                
                "2024-09-15",            
                "2024-11-01",            
                "open"             
            );

            appendTasksFirstLoad();
        } else {
            tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
        }
    })();

    return { createFirstLoadTasks, appendTasksFirstLoad, createTask, tasksArray }
})();