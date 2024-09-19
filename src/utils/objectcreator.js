import { Tasks } from "../tasks.js";
import { Tags } from "../tags.js";
import { TimeConverter } from "./timeconverter.js";
import { Projects } from "../projects.js";


export const ObjectCreator = (function() {
    const createTodayList = function(day) {

        let filteredArray;
        let tasksArray = Tasks.tasksArray;
        let tagsArray = Tags.tagsArray;
        let projectsArray = Projects.projectsArray;

        let todosList = document.createElement("div");
        todosList.classList.add("todos-list");

        if (day == "today") {
            filteredArray = tasksArray
                .filter(task => task.status != "done")
                .filter(task => new Date(task.dueDate).getDate() <= new Date().getDate() && new Date(task.dueDate).getMonth() <= new Date().getMonth())
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        }

        if (day == "7days") {
            filteredArray = tasksArray
                .filter(task => task.status != "done")
                .filter(task => new Date(task.dueDate).getDate() > new Date().getDate() && new Date(task.dueDate).getMonth() <= new Date().getMonth() && new Date(task.dueDate).getDate() < new Date().getDate() + 7)
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        }

        if (day == "inbox") {
            filteredArray = tasksArray
                .filter(task => !task.appendProjectId && task.status != "done")
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        }

        if (day == "project") {
            filteredArray = tasksArray
            .filter(task => task.appendProjectId != "" && task.status != "done")
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        }


        if (filteredArray.length == 0) {
            let noTasks = document.createElement("div");
            noTasks.classList.add("no-task");
            noTasks.textContent = "There is no tasks! Great job!";
            todosList.appendChild(noTasks); 
        }

        filteredArray.forEach(task => {
            let taskElement = document.createElement("div");
            taskElement.classList.add("task-element");
            taskElement.id = `task${task.taskId}`

            let todoStatus = document.createElement("div");
            todoStatus.classList.add("todo-status");
            taskElement.appendChild(todoStatus);

            let todoName = document.createElement("p");
            todoName.textContent = task.taskName;
            todoName.classList.add("task-name")
            taskElement.appendChild(todoName);

            let projectDiv = document.createElement("div");

            if (task.appendProjectId) {
                let appendProject = projectsArray[task.appendProjectId - 1];

                projectDiv.classList.add("project-assign");
                projectDiv.style.background = appendProject.background;
                projectDiv.style.padding = "2px 6px 2px 0px";

                let projectImgHolder = document.createElement("div");
                let projectName = document.createElement("p");

                projectImgHolder.classList.add("img-holder");
                projectImgHolder.style.background = appendProject.avatar;
                projectImgHolder.style.backgroundSize = "cover";

                projectName.textContent = appendProject.projectName;
                projectName.style.color = "#F5FFFC";
                projectName.style.fontSize = "12px";

                projectDiv.appendChild(projectImgHolder);
                projectDiv.appendChild(projectName);
                taskElement.appendChild(projectDiv);
            }

            task.tags.forEach(tag => {
                tagsArray.forEach(tagElement => {
                    if (tagElement.tagName == tag) {
                        let tagDiv = document.createElement("div");
                        tagDiv.classList.add("tag");
                        tagDiv.textContent = tagElement.tagName;
                        tagDiv.style.background = tagElement.color + "30";
                        tagDiv.style.color = tagElement.color;

                        taskElement.appendChild(tagDiv);
                    }
                })
            })

            let priorityDiv = document.createElement("div");
            let span = document.createElement("span");

            priorityDiv.appendChild(span);
            priorityDiv.classList.add("priority");
            priorityDiv.title = "Priority";

            if (task.priority == "max") {
                priorityDiv.classList.add("max");
                span.textContent = "!!";
            } else if (task.priority == "medium") {
                priorityDiv.classList.add("medium");
                span.textContent = "!";
            } else {
                priorityDiv.classList.add("low");
                priorityDiv.classList.add("relative");
                span.textContent = "↓";
            }

            taskElement.appendChild(priorityDiv);

            // Date
            let date = document.createElement("p");
            date.textContent = TimeConverter.convertDateToString(task.dueDate);
            date.classList.add("date");

            if (TimeConverter.checkExpiryDate(task.dueDate) == "expiry") {
                date.classList.add("expiry");
            }

            taskElement.appendChild(date);

            // Delete button
            let deleteBtn = document.createElement("div");
            deleteBtn.classList.add("delete-btn", "task-delete");
            taskElement.appendChild(deleteBtn);

            todosList.appendChild(taskElement);
        })

        return todosList;
    }

    const createNewTaskInput = function(status) {
        let tasksArray = Tasks.tasksArray;
        let tagsArray = Tags.tagsArray;

        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        if (`${month}`.length == 1) {
            month = `0${month}`;
        }

        let taskForm = document.createElement("form");
        taskForm.innerHTML = `
                            <input type="text" name="taskname" id="taskname" minlength=1 maxlength=64 required placeholder="+     Add task to Today List">
                            <button type="button" id="show-set-info">Set tags and date</button>

                            <div class="set-info hidden">
                                <div class="select-date">
                                    <p>Date:</p>
                                    <input type="radio" title="Today" id="torday" name="date" value="today" checked>
                                    <label class="today-btn" for="torday"> </label>
                                    <input type="radio" title="Tomorrow" id="tmrw" name="date" value="tmrw">
                                    <label class="tomorrow-btn" for="tmrw"> </label>
                                </div>
                                <div class="priority-tags">
                                    <p>Priority: </p>
                                    <input type="radio" class="priority max" id="max" name="priority" value="max">
                                    <label class="priority max" for="max">!!</label>
                                    <input type="radio" class="priority medium" id="medium" name="priority" value="medium" checked>
                                    <label class="priority medium" for="medium">!</label>
                                    <input type="radio" class="priority low" title="Priority" id="low" name="priority" value="low">
                                    <label class="priority low" for="low">~</label>
                                </div>
                                <p>Tags:</p>
                                <div class="tags-assigner">
                                </div>
                                <p>Projects: </p>
                                <div class="project-assigner">
                                </div>
                                <input id="date" value="${year}-${month}-${day}"type="date"/>
                            </div>
                            <input type="submit" id="submit-task" value="" style="display: none"/>`;


        if (status == "inbox") {
            taskForm.innerHTML = `
            <input type="text" name="taskname" id="taskname" minlength=1 maxlength=64 required placeholder="+     Add task to Today List">
            <button type="button" id="show-set-info">Set tags and date</button>

            <div class="set-info hidden">
                <div class="select-date">
                    <p>Date:</p>
                    <input type="radio" title="Today" id="torday" name="date" value="today" checked>
                    <label class="today-btn" for="torday"> </label>
                    <input type="radio" title="Tomorrow" id="tmrw" name="date" value="tmrw">
                    <label class="tomorrow-btn" for="tmrw"> </label>
                </div>
                <div class="priority-tags">
                    <p>Priority: </p>
                    <input type="radio" class="priority max" id="max" name="priority" value="max">
                    <label class="priority max" for="max">!!</label>
                    <input type="radio" class="priority medium" id="medium" name="priority" value="medium" checked>
                    <label class="priority medium" for="medium">!</label>
                    <input type="radio" class="priority low" title="Priority" id="low" name="priority" value="low">
                    <label class="priority low" for="low">~</label>
                </div>
                <p>Tags:</p>
                <div class="tags-assigner">
                </div>
                <input id="date" value="${year}-${month}-${day}"type="date"/>
            </div>
            <input type="submit" id="submit-task" value="" style="display: none"/>`;
        }
        return taskForm;
    }

    const changeCalendarDay = function(day) {
        let calendar = document.querySelector("#date");
        let calendarProject = document.querySelector("#date-proj");

        let date = new Date();

        let daynum = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        if (`${month}`.length == 1) {
            month = `0${month}`;
        }
        
        if (day == "today") {
            calendar.value = `${year}-${month}-${daynum}`;
            calendarProject.value = `${year}-${month}-${daynum}`;
        } else {
            calendar.value = `${year}-${month}-${daynum + 1}`;
            c
        }
        
    }

    const createNewTagInput = function() {
        let tagsList = document.querySelector(".tags-list");
        let forColor = "color";

        for (const [key, value] of Object.entries(Tags.tagsColors)) {
            let colorPicker = document.createElement("input");
            colorPicker.type = "radio";
            colorPicker.id = key;
            colorPicker.name = forColor;
            colorPicker.value = value;

            let colorLabel = document.createElement("label")
            colorLabel.htmlFor = colorPicker.id;
            colorLabel.textContent = key;
            colorLabel.style.background = `${value}30`;
            colorLabel.style.color = value;

            tagsList.appendChild(colorPicker);
            tagsList.appendChild(colorLabel);
        }

    }

    const createCompleteTasks = function() {
        let filteredArray;
        let tasksArray = Tasks.tasksArray;
        let tagsArray = Tags.tagsArray;
        let projectsArray = Projects.projectsArray;

        let todosList = document.createElement("div");
        todosList.classList.add("todos-list");

        
        filteredArray = tasksArray
            .filter(task => task.status == "done")
            .sort((a, b) => new Date(b.completeDate) - new Date(a.completeDate));

        if (filteredArray.length == 0) {
            let noTasks = document.createElement("div");
            noTasks.classList.add("no-task");
            noTasks.textContent = "There is no tasks! Do something!";
            todosList.appendChild(noTasks); 
        }

        filteredArray.forEach(task => {
            let taskElement = document.createElement("div");
            taskElement.classList.add("task-element", "checked");

            taskElement.id = `task${task.taskId}`

            let todoStatus = document.createElement("div");
            todoStatus.classList.add("todo-status", "activity-done");
            taskElement.appendChild(todoStatus);

            let todoName = document.createElement("p");
            todoName.textContent = task.taskName;
            todoName.classList.add("task-name")
            taskElement.appendChild(todoName);

            let projectDiv = document.createElement("div");

            if (task.appendProjectId) {
                let appendProject = projectsArray[task.appendProjectId - 1];

                projectDiv.classList.add("project-assign");
                projectDiv.style.background = appendProject.background;
                projectDiv.style.padding = "2px 6px 2px 0px";

                let projectImgHolder = document.createElement("div");
                let projectName = document.createElement("p");

                projectImgHolder.classList.add("img-holder");
                projectImgHolder.style.background = appendProject.avatar;
                projectImgHolder.style.backgroundSize = "cover";

                projectName.textContent = appendProject.projectName;
                projectName.style.color = "#F5FFFC";
                projectName.style.fontSize = "12px";

                projectDiv.appendChild(projectImgHolder);
                projectDiv.appendChild(projectName);
                taskElement.appendChild(projectDiv);
            }

            task.tags.forEach(tag => {
                tagsArray.forEach(tagElement => {
                    if (tagElement.tagName == tag) {
                        let tagDiv = document.createElement("div");
                        tagDiv.classList.add("tag");
                        tagDiv.textContent = tagElement.tagName;
                        tagDiv.style.background = tagElement.color + "30";
                        tagDiv.style.color = tagElement.color;

                        taskElement.appendChild(tagDiv);
                    }
                })
            })

            let priorityDiv = document.createElement("div");
            let span = document.createElement("span");

            priorityDiv.appendChild(span);
            priorityDiv.classList.add("priority");
            priorityDiv.title = "Priority";

            if (task.priority == "max") {
                priorityDiv.classList.add("max");
                span.textContent = "!!";
            } else if (task.priority == "medium") {
                priorityDiv.classList.add("medium");
                span.textContent = "!";
            } else {
                priorityDiv.classList.add("low");
                priorityDiv.classList.add("relative");
                span.textContent = "↓";
            }

            taskElement.appendChild(priorityDiv);

            // Date
            let date = document.createElement("p");
            date.textContent = `${TimeConverter.convertDateToString(task.completeDate)} ${TimeConverter.getHourAndMinute(task.completeDate)}`;
            date.classList.add("date");

            taskElement.appendChild(date);

            todosList.appendChild(taskElement);
        })

        return todosList;
    }

    const createProjectFolder = function(project) {

        let projectFolder = document.createElement("div");
        projectFolder.classList.add("project-folder");
        projectFolder.id = "proj" + project.projectId;

        let projectGradient = document.createElement("div");
        projectGradient.classList.add("project-gradient");
        projectGradient.style.background = project.gradient;
        projectGradient.style.backgroundSize = "300px";
        projectFolder.appendChild(projectGradient);

        let projectInfo = document.createElement("div");
        projectInfo.classList.add("project-info");
        projectFolder.appendChild(projectInfo);

        let projectImgHolder = document.createElement("div");
        projectImgHolder.classList.add("img-holder");
        projectImgHolder.style.background = project.avatar;
        projectImgHolder.style.backgroundColor = project.background;
        projectImgHolder.style.backgroundSize = "cover";

        let projectText = document.createElement("div");
        projectText.classList.add("project-text");

        let h4 = document.createElement("h4");
        h4.textContent = project.projectName;

        let p = document.createElement("p");
        if (project.small_desc.length > 22) {
            p.textContent = project.small_desc.slice(0, 22) + "...";
        } else {
            p.textContent = project.small_desc;
        }
        

        let iconHolderSettings = document.createElement("div");
        iconHolderSettings.classList.add("icon-holder-settings");

        projectText.appendChild(h4);
        projectText.appendChild(p);
        projectInfo.appendChild(projectImgHolder);
        projectInfo.appendChild(projectText);
        projectInfo.appendChild(iconHolderSettings);

        let tagsList = document.createElement("div");
        tagsList.classList.add("tags-list");

        if (project.tags.length > 0) {
            project.tags.forEach(tag => {
                let tagDiv = document.createElement("div");
                tagDiv.classList.add("tag");

                let tagElement = Tags.tagsArray.find(tagArr => tagArr.tagName == tag);
    
                tagDiv.textContent = tagElement.tagName;
                tagDiv.style.background = tagElement.color + "30";
                tagDiv.style.color = tagElement.color;
    
                tagsList.appendChild(tagDiv);
            });
        }

        projectFolder.appendChild(tagsList);
        return projectFolder;
    }

    const createProjectInfo = function(project) {
        let projectInfo = document.createElement("div");
        projectInfo.classList.add("project-info");

        let projectMainInformation = document.createElement("div");
        projectMainInformation.classList.add("project-main-information");

        let projectSecondaryInformation = document.createElement("div");
        projectSecondaryInformation.classList.add("project-secondary-information");

        // Main information
        console.log(project.createdAt, project.dueDate);
        let infoNames = ["Created At", "Tags", "Priority", "Due Date"];
        let infoValues = [TimeConverter.convertDateToString(project.created), project.tags, project.priority, TimeConverter.convertDateToString(project.deadline)];

        let infoNameContainer = document.createElement("div");
        infoNameContainer.classList.add("name-container");

        for (let i = 0; i < infoNames.length; i++) {
            let infoRow = document.createElement("div");
            infoRow.classList.add("info-row");

            let infoImgHolder = document.createElement("div");
            infoImgHolder.classList.add("icon-holder");

            let infoName = document.createElement("p");
            infoName.classList.add("info-name");
            infoName.textContent = infoNames[i];

            infoRow.appendChild(infoImgHolder);
            infoRow.appendChild(infoName);
            infoNameContainer.appendChild(infoRow);
        }

        projectMainInformation.appendChild(infoNameContainer);

        let infoValueContainer = document.createElement("div");
        infoValueContainer.classList.add("value-container");

        for (let i = 0; i < infoValues.length; i++) {
            if (i == 1) {
                let tagList = document.createElement("div");
                tagList.classList.add("tag-list");

                if (project.tags.length == 0) {
                    let infoValue = document.createElement("p");
                    infoValue.classList.add("info-value");
                    infoValue.textContent = "No tags";
        
                    infoValueContainer.appendChild(infoValue);
                    continue;
                }

                project.tags.forEach(tag => {
                    let tagElement = Tags.tagsArray.find(tagArr => tagArr.tagName == tag);
                    let tagDiv = document.createElement("div");
                    tagDiv.classList.add("tag");
                    tagDiv.textContent = tagElement.tagName;
                    tagDiv.style.background = `${tagElement.color}30`;
                    tagDiv.style.color = tagElement.color;
                    tagList.appendChild(tagDiv);
                });

                infoValueContainer.appendChild(tagList);
                continue;
            };

            if (i == 2) {

                let priorityDiv = document.createElement("div");
                let span = document.createElement("span");
    
                priorityDiv.appendChild(span);
                priorityDiv.classList.add("priority");
                priorityDiv.title = "Priority";
    
                if (project.priority == "high") {
                    priorityDiv.classList.add("max");
                    span.textContent = "High";
                } else if (project.priority == "medium") {
                    priorityDiv.classList.add("medium");
                    span.textContent = "Medium";
                } else {
                    priorityDiv.classList.add("low");
                    priorityDiv.classList.add("relative");
                    span.textContent = "Low";
                }
    
                infoValueContainer.appendChild(priorityDiv);
                continue;
            }

            let infoValue = document.createElement("p");
            infoValue.classList.add("info-value");
            infoValue.textContent = infoValues[i];

            infoValueContainer.appendChild(infoValue);
        }

        projectMainInformation.appendChild(infoValueContainer);

        // Secondary information
        let description = document.createElement("p");
        description.classList.add("description");
        description.textContent = "Description";

        let descriptionContent = document.createElement("div");
        descriptionContent.classList.add("description-content");
        descriptionContent.textContent = project.describtion;

        projectSecondaryInformation.appendChild(description);
        projectSecondaryInformation.appendChild(descriptionContent);

        projectInfo.appendChild(projectMainInformation);
        projectInfo.appendChild(projectSecondaryInformation);

        return projectInfo;
    }



    const createProjectTasks = function(projectId) {

        let filteredArray;
        let tasksArray = Tasks.tasksArray;
        let tagsArray = Tags.tagsArray;
        let projectsArray = Projects.projectsArray;

        let todosList = document.createElement("div");
        todosList.classList.add("todos-list");
        todosList.id = `${projectId}`;

        filteredArray = tasksArray
            .filter(task => task.appendProjectId == projectId && task.status != "done")
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        if (filteredArray.length == 0) {
            let noTasks = document.createElement("div");
            noTasks.classList.add("no-task");
            noTasks.textContent = "There is no tasks! Great job!";
            todosList.appendChild(noTasks); 
        }

        filteredArray.forEach(task => {
            let taskElement = document.createElement("div");
            taskElement.classList.add("task-element");
            taskElement.id = `task${task.taskId}`

            let todoStatus = document.createElement("div");
            todoStatus.classList.add("todo-status");
            taskElement.appendChild(todoStatus);

            let todoName = document.createElement("p");
            todoName.textContent = task.taskName;
            todoName.classList.add("task-name")
            taskElement.appendChild(todoName);

            let projectDiv = document.createElement("div");

            if (task.appendProjectId) {
                let appendProject = projectsArray[task.appendProjectId - 1];

                projectDiv.classList.add("project-assign");
                projectDiv.style.background = appendProject.background;
                projectDiv.style.padding = "2px 6px 2px 0px";

                let projectImgHolder = document.createElement("div");
                let projectName = document.createElement("p");

                projectImgHolder.classList.add("img-holder");
                projectImgHolder.style.background = appendProject.avatar;
                projectImgHolder.style.backgroundSize = "cover";

                projectName.textContent = appendProject.projectName;
                projectName.style.color = "#F5FFFC";
                projectName.style.fontSize = "12px";

                projectDiv.appendChild(projectImgHolder);
                projectDiv.appendChild(projectName);
                taskElement.appendChild(projectDiv);
            }

            task.tags.forEach(tag => {
                tagsArray.forEach(tagElement => {
                    if (tagElement.tagName == tag) {
                        let tagDiv = document.createElement("div");
                        tagDiv.classList.add("tag");
                        tagDiv.textContent = tagElement.tagName;
                        tagDiv.style.background = tagElement.color + "30";
                        tagDiv.style.color = tagElement.color;

                        taskElement.appendChild(tagDiv);
                    }
                })
            })

            let priorityDiv = document.createElement("div");
            let span = document.createElement("span");

            priorityDiv.appendChild(span);
            priorityDiv.classList.add("priority");
            priorityDiv.title = "Priority";

            if (task.priority == "max") {
                priorityDiv.classList.add("max");
                span.textContent = "!!";
            } else if (task.priority == "medium") {
                priorityDiv.classList.add("medium");
                span.textContent = "!";
            } else {
                priorityDiv.classList.add("low");
                priorityDiv.classList.add("relative");
                span.textContent = "↓";
            }

            taskElement.appendChild(priorityDiv);

            // Date
            let date = document.createElement("p");
            date.textContent = TimeConverter.convertDateToString(task.dueDate);
            date.classList.add("date");

            if (TimeConverter.checkExpiryDate(task.dueDate) == "expiry") {
                date.classList.add("expiry");
            }

            // Delete button
            let deleteBtn = document.createElement("div");
            deleteBtn.classList.add("delete-btn", "task-delete");

            taskElement.appendChild(date);
            taskElement.appendChild(deleteBtn);

            todosList.appendChild(taskElement);
        })

        return todosList;
    }

    return { 
        createTodayList, 
        createNewTaskInput, 
        changeCalendarDay,
        createNewTagInput,
        createCompleteTasks,
        createProjectFolder,
        createProjectInfo,
        createProjectTasks
     }
})();