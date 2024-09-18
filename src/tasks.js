import { Projects } from "./projects.js";
import { TimeConverter } from "./utils/timeconverter.js";
import { Tags } from "./tags.js";

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
        "completeDate": ""
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

        newTask.taskName = taskName;
        newTask.priority = priority;
        newTask.dueDate = dueDate;
        newTask.tags = tags;
        newTask.status = status;
        newTask.createDate = new Date();

        newTask.taskId = array.length + 1; 

        if (appendProjectId) {
            Projects.projectsArray.find(project => project.projectId == appendProjectId).assignedTasks.push(newTask.taskId)
            newTask.appendProjectName = projectArray[appendProjectId - 1]["projectName"];
            newTask.appendProjectId = appendProjectId;
            Projects.saveToLocalStorage();
        }

        array.push(newTask);
        saveToLocalStorage();
    }

    // const appendTasksFirstLoad = function() {
    //     tasksArray.forEach(task => {
    //         let project = projectArray.find(proj => proj.projectId === task.appendProjectId);

    //         if (project && !project.assignedTasks.includes(task)) {
    //             project.assignedTasks.push(task);
    //         }
    //     });
    // };

    const saveToLocalStorage = function() {
        localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
    }

    const getCompletedTasks = function(status) {
        if (status == "today") {
            return tasksArray.filter(task => task.status == "done" && new Date(task.completeDate).getDate() == new Date().getDate());
        }

        if (status == "7days") {
            return tasksArray
            .filter(task => task.status == "done")
            .filter(task => new Date(task.completeDate).getDate() < new Date().getDate() + 7 && new Date(task.completeDate).getMonth() <= new Date().getMonth() && new Date(task.completeDate).getDate() < new Date().getDate() + 7)
        }

        return tasksArray.filter(task => task.status == "done");
    }

    const getCompletedTasksByProject = function(projectId) {
        return tasksArray.filter(task => task.appendProjectId == projectId && task.status == "done");
    }

    const getUncompletedTasks = function(status) {
        if (status == "today") {
            return tasksArray
            .filter(task => task.status != "done")
            .filter(task => new Date(task.dueDate).getDate() <= new Date().getDate() && new Date(task.dueDate).getMonth() <= new Date().getMonth())
        }

        if (status == "7days") {
            return tasksArray
            .filter(task => task.status != "done")
            .filter(task => new Date(task.dueDate).getDate() > new Date().getDate() && new Date(task.dueDate).getMonth() <= new Date().getMonth() && new Date(task.dueDate).getDate() < new Date().getDate() + 7)
        }

        if (status == "inbox") {
            return tasksArray.filter(task => !task.appendProjectName && task.status == "open");
        }

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
                2,                      
                "Set up multiplayer",    
                ["Selfcare"], 
                "medium",                          
                TimeConverter.convertStringToDate("tomorrow"),            
                "in_progress"             
            );

            createTask(
                tasksArray,          
                2,                      
                "Set up multiplayer",    
                ["Selfcare"], 
                "medium",                          
                TimeConverter.convertStringToDate("tomorrow"),            
                "in_progress"             
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
                "2024-09-10",             
                "open"             
            );

        } else {
            tasksArray = JSON.parse(localStorage.getItem("tasksArray"));
        }
    })();

    const completeTask = function(taskElement) {
        let taskId = "";

        if (!taskElement.parentElement.id) {
            taskId = taskElement.parentElement.parentElement.id;
        } else {
            taskId = taskElement.parentElement.id;
        }

        let task = tasksArray.find(task => {
            return +task.taskId == +taskId.slice(4);
        });

        let taskDom = document.querySelectorAll(`#${taskId}`);
        taskDom.forEach(task => task.classList.add("checked", "hide"));
        
        task.status = "done";
        task.completeDate = new Date();

        saveToLocalStorage();
    }

    const undoLastCompletedTask = function(taskElement) {
        if (taskElement) {
            let taskId = "";

            if (!taskElement.parentElement.id) {
                taskId = taskElement.parentElement.parentElement.id;
            } else {
                taskId = taskElement.parentElement.id;
            }
    
            let task = tasksArray.find(task => {
                return +task.taskId == +taskId.slice(4);
            });

            let taskDom = document.querySelectorAll(`#${taskId}`);
            taskDom.forEach(task => task.classList.remove("checked", "hide"));

            task.status = "open";
            task.completeDate = "";
    
            saveToLocalStorage();
            return;
        }

        let completedTasks = tasksArray
        .filter(task => task.status === "done")
        .sort((a, b) => new Date(a.completeDate) - new Date(b.completeDate)).reverse();

        let taskId = completedTasks[0].taskId;

        tasksArray.forEach(task => { 
            if (+task.taskId === +taskId) {
                 task.status = "open" 
                 task.completeDate = "";
                }
            });

        saveToLocalStorage();
    }

    const getLastTaskActivity = function(includeDate) {
        if (tasksArray.filter(task => task.completeDate).length == 0) {
            return [];
        }

        if (!includeDate) {
            return tasksArray.filter(task => task.status == "done").sort((a, b) => new Date(b.completeDate) - new Date(a.completeDate))[0];
        }

        return tasksArray.filter(task => task.status == "done").sort((a, b) => new Date(b.completeDate) - new Date(a.completeDate))[0].completeDate;
    }

    const getTaskState = function(taskId) {
        return tasksArray.filter(task => task.taskId == +taskId)[0].status;
    }
    return { 
        tasksArray, 
        createFirstLoadTasks,  
        createTask, 
        saveToLocalStorage,
        getCompletedTasks,
        getUncompletedTasks,
        completeTask,
        undoLastCompletedTask,
        getCompletedTasksByProject,
        getLastTaskActivity,
        getTaskState
    }
})();