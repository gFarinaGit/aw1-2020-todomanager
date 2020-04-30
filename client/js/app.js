"use strict";

import TaskManager from "./taskmanager.js";;
import Task from "./task.js";
import * as Api from "./api.js"

class App {
    constructor() {
        // create new task manager
        this.taskManager = new TaskManager();

        // new task form management
        this.formManagement();
    }

    formManagement() {
        // custom validation for deadline input
        const date = document.getElementById("form_date");
        const time = document.getElementById("form_time");
        time.addEventListener("input", () => {
            if(time.value !== "") { // if there is time, date is needed
                if (date.value === "") {
                    date.setCustomValidity("Please, specify the date!");
                    date.classList.add("invalid");
                }
            } else {    // if time removed, date is no longer needed
                date.setCustomValidity("");
                date.classList.remove("invalid");
            }
        });
        date.addEventListener("input", () => {
            if(date.value !== "")   // if date is specified, no errors
                date.setCustomValidity("");
        });

        // submit managment
        const form = document.getElementById("new-task");
        form.addEventListener("submit", (event) =>{
            event.preventDefault();

            const description = form.elements["form_description"].value;

            let project = form.elements["form_project"].value;
            if(project === "") project = undefined;

            const important = form.elements["form_important"].checked;

            const privateTask = form.elements["form_private"].checked;

            let deadline = undefined;
            if (date.value !== "" && time.value !== "")
                deadline = date.value + " " + time.value;
            else if (date.value !== "")
                deadline = date.value;

            // Inviare i dati al server con API addTask
            Api.addTask({
                description: description,
                project: project,
                important: important,
                private: privateTask,
                deadline: deadline,
                completed: 0,
            }).then( (id) => {
                this.taskManager.addTask(
                    new Task(id, description, project, important, privateTask, deadline, 0)
            )})
                .catch( (err) => console.log(err) );

            document.getElementById("new-task").reset();
            document.getElementById("closeModal").click();
        });
    };
}

export default App ;