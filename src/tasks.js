import { Projects } from "./projects.js";

export const Tasks = (function() {
    let tasksArray = [];
    const projectArray = Projects.projectsArray;

    const taskTemplate = {   
        "taskId": 0,
        "appendProjectName": "",
        "appendProject": "",
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

        if (appendProjectId) {
            newTask.appendProjectName = projectArray[appendProjectId - 1]["projectName"];
            newTask.appendProject = projectArray[appendProjectId - 1];
            newTask.appendProjectId = appendProjectId;
        }

        newTask.taskName = taskName;
        newTask.priority = priority;
        newTask.createDate = createDate;
        newTask.dueDate = dueDate;
        newTask.tags = tags;
        newTask.status = status;

        newTask.taskId = array.length + 1; 
    
        array.push(newTask);
        saveToLocalStorage();
    }

    const appendTasksFirstLoad = function() {
        tasksArray.forEach(task => {
            let project = projectArray.find(proj => proj.projectId === task.appendProjectId);

            if (project && !project.assignedTasks.includes(task)) {
                project.assignedTasks.push(task);
            }
        });
    };

    const saveToLocalStorage = function() {
        localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
    }

    const getCompletedTasks = function() {
        return tasksArray.filter(task => task.status == "done");
    }

    const getUncompletedTasks = function() {
        return tasksArray.filter(task => task.status == "open" || task.status == "in_progress");
    }

    const createFirstLoadTasks = (function() {
        if (!localStorage.getItem("tasksArray")) {
            createTask(
                tasksArray,          
                1,                      
                "Set up multiplayer",    
                ["Selfcare"], 
                "medium",                
                "2024-09-15",            
                "2024-11-01",            
                "in_progress"             
            );

            createTask(
                tasksArray,           
                1,                      
                "Set up multiplayer",    
                ["Economic", "Shopping"], 
                "medium",                
                "2024-09-15",            
                "2024-11-01",            
                "done"             
            );

            createTask(
                tasksArray,           
                2,                      
                "Get solution",    
                ["Selfcare"], 
                "high",                
                "2024-09-15",            
                "2024-11-01",            
                "open"             
            );

            createTask(
                tasksArray,   
                "",                      
                "Pay $1 to Odin Project",    
                ["Finance"], 
                "medium",                
                "2024-09-15",            
                "2024-11-01",            
                "open"             
            );

            appendTasksFirstLoad();
        } else {
            tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
            appendTasksFirstLoad();
        }
    })();

    return { 
        tasksArray, 
        createFirstLoadTasks, 
        appendTasksFirstLoad, 
        createTask, 
        saveToLocalStorage,
        getCompletedTasks,
        getUncompletedTasks,
    }
})();