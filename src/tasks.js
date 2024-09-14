import { Projects } from "./projects.js";
import { TimeConverter } from "./utils/timeconverter.js";

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
        dueDate,
        status,
    ) {
        let newTask = { ...taskTemplate };

        if (appendProjectId) {
            newTask.appendProjectName = projectArray[appendProjectId - 1]["projectName"];
            newTask.appendProjectId = appendProjectId;
        }

        newTask.taskName = taskName;
        newTask.priority = priority;
        newTask.dueDate = dueDate;
        newTask.tags = tags;
        newTask.status = status;
        newTask.createDate = new Date();

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
                TimeConverter.convertStringToDate("tomorrow"),            
                "in_progress"             
            );

            createTask(
                tasksArray,           
                1,                      
                "Set up multiplayer",    
                ["Economic", "Shopping"], 
                "medium",                       
                TimeConverter.convertStringToDate("tomorrow"),            
                "done"             
            );

            createTask(
                tasksArray,           
                2,                      
                "Get solution",    
                ["Selfcare"], 
                "high",                         
                TimeConverter.convertStringToDate("today"),            
                "open"             
            );

            createTask(
                tasksArray,   
                "",                      
                "Pay $1 to Odin Project",    
                ["Finance"], 
                "medium",                          
                TimeConverter.convertStringToDate("2024-09-10"),             
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