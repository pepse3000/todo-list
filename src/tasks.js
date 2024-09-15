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

    const getCompletedTasks = function(status) {
        if (status == "today") {
            return tasksArray.filter(task => task.status == "done" && new Date(task.completeDate).getDate() == new Date().getDate());
        }

        return tasksArray.filter(task => task.status == "done");
    }

    const getUncompletedTasks = function(status) {
        if (status == "today") {
            return tasksArray
            .filter(task => task.status != "done")
            .filter(task => new Date(task.dueDate).getDate() <= new Date().getDate() && new Date(task.dueDate).getMonth() <= new Date().getMonth())
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

    const completeTask = function(taskElement) {
        let taskId = "";
        console.log(taskElement);

        if (!taskElement.parentElement.id) {
            taskId = taskElement.parentElement.parentElement.id;
        } else {
            taskId = taskElement.parentElement.id;
        }

        let task = tasksArray.find(task => {
            return +task.taskId == +taskId.slice(4);
        });

        let taskDom = document.querySelectorAll(`#${taskId}`);
        taskDom.forEach(task => task.classList.add("checked"));
        
        task.status = "done";
        task.completeDate = new Date();

        console.log(task)
        saveToLocalStorage();
    }

    return { 
        tasksArray, 
        createFirstLoadTasks, 
        appendTasksFirstLoad, 
        createTask, 
        saveToLocalStorage,
        getCompletedTasks,
        getUncompletedTasks,
        completeTask,
    }
})();