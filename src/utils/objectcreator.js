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

            todosList.appendChild(taskElement);
        })

        return todosList;
    }

    const createNewTaskInput = function() {
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
                            <input type="text" name="taskname" id="taskname" required placeholder="+     Add task to Today List">
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
                                <div class="tags-assigner">
                                </div>
                                <input id="date" value="${year}-${month}-${day}"type="date"/>
                            </div>
                            <input type="submit" id="submit-task" value="" style="display: none"/>`;

        return taskForm;
    }

    const changeCalendarDay = function(day) {
        let calendar = document.querySelector("#date");

        let date = new Date();

        let daynum = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        if (`${month}`.length == 1) {
            month = `0${month}`;
        }
        
        if (day == "today") {
            calendar.value = `${year}-${month}-${daynum}`;
        } else {
            calendar.value = `${year}-${month}-${daynum + 1}`;
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

    return { 
        createTodayList, 
        createNewTaskInput, 
        changeCalendarDay,
        createNewTagInput
     }
})();