"use strict";

class Task {
    constructor(desc, project, urgent, shared, date) {
        this.description = desc;
        this.project = project;
        if(!(urgent === "false" || urgent === "true")) urgent = "false";
        this.urgent = urgent; // 0 = not urgent, 1 = urgent
        if(!(shared === "false" || shared === "true")) shared = "false";
        this.shared = shared; // 0 = private, 1 = shared
        if(date !=  null){
            this.deadline = moment(date);
            let now = moment();
            let timer = this.deadline - now;
            setTimeout(expiredTask, timer, this);
        }
        else this.deadline = null;
    }
};

class App {
    constructor() {
        // create task list
        this.tasks = [];
        this.tasks.push(new Task("Task 1", "Web Applications I", "false", "false", null));
        this.tasks.push(new Task("Task 2", "Personal", "false", "true", "04/03/2020 14:00"));
        this.tasks.push(new Task("Task 3", null , "true", "false", "04/23/2020"));
        this.tasks.push(new Task("Task 4", "Test", "true", "false", "04/16/2020 20:00"));
        this.tasks.push(new Task("End of quarantine", "Test", "true", "true", "05/03/2020 23:59"));

        // create project list
        this.projectList = [];
        this.projectElem = document.getElementById("projectList");
        this.tasks.filter( (t) => (t.project != null) )
            .forEach( (t) => {
                if(this.projectList.filter( (p) => (p === t.project) ).length === 0) {
                    this.projectList.push(t.project);
                    this.createProjectHTML(this.projectList[this.projectList.length - 1], this.projectList.length - 1);
                }
            })

        // create task html
        this.elem = document.getElementById("taskList");
        this.tasks.forEach( (t, id) => this.createTaskHTML(t, id) );

        // create filter manager
        this.filters = new Filters(this.tasks, this.projectList);

        // new task form management
        this.formManagement();

    }

    createTaskHTML(t, id){
        // The index of the array is used as unique id

        // list entry creation
        let li = document.createElement('li');
        li.className = "list-group-item shadow d-inline-flex";
        li.id = id;
        this.elem.append(li);

        // important or not
        let important = document.createElement('div');
        if(t.urgent === "true") important.className = "important";
        li.append(important);

        // checkbox creation
        let div = document.createElement('div');
        div.className = "custom-control custom-checkbox";
        important.append(div);

        // chechbox input
        let input = document.createElement('input');
        input.type = "checkbox";
        input.className = "custom-control-input";
        input.id = "customCheck" + id;
        div.append(input);

        // checkbox label
        let label = document.createElement('label');
        label.className = "custom-control-label";
        label.htmlFor = "customCheck" + id;
        label.textContent = t.description;
        div.append(label);

        // project label if present
        let project;
        if(t.project != null){
            project = document.createElement('span');
            project.className = "label bg-secondary text-white"
            project.textContent = t.project;
            li.append(project);
        }

        // shared or not
        if(t.shared === "true"){
            li.insertAdjacentHTML("beforeend", `<svg class="bi bi-people-circle user-image" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
                    <path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd"/>
                    </svg> `);
        }

        // deadline if present
        let deadline;
        if(t.deadline != null){
            deadline = document.createElement('p');
            deadline.className = "deadline"
            deadline.textContent = t.deadline.format("dddd Do MMMM YYYY") +
                                        " at " + t.deadline.format("HH:mm");
            deadline.id = "deadline" + id;
            li.append(deadline);
        }
    }

    formManagement() {
        let desc = document.getElementById("description")
        let project = document.getElementById("project");
        let urgent = document.getElementById("important-check");
        let shared = document.getElementById("shared-check")
        let date = document.getElementById("date");
        let time = document.getElementById("time");

        date.min = moment().format("YYYY-MM-DD");;

        document.getElementById("new-task")
                .addEventListener('submit', event => {
            event.preventDefault();

            // let deadline;
            // if(document.getElementById("deadlineSwitch").checked)
            //     deadline = date.value + " " + time.value;
            // else deadline = null;

            let project_name;
            if(project.value === "") project_name = null;

            let deadline;
            if(date.value !== "" && time.value !== "")
                deadline = date.value + " " + time.value;
            else if(date.value !== "")
                deadline = date.value;
            else
                deadline = null;


            this.tasks.push(new Task(desc.value, project_name, urgent.checked.toString(), shared.checked.toString(), deadline));
            this.createTaskHTML(this.tasks[this.tasks.length-1], this.tasks.length-1);

            if(this.projectList.filter( p => p === project_name ).length === 0 && project_name != null){
                this.projectList.push(project.value);
                this.createProjectHTML(this.projectList[this.projectList.length - 1], this.projectList.length - 1);
                this.filters.addProject(this.projectList[this.projectList.length - 1], this.projectList.length - 1);
            }


            document.getElementById("new-task").reset();
            document.getElementById("closeModal").click();
        })
    }

    createProjectHTML(p, id){
        let li = document.createElement('li');

        let a = document.createElement('a');
        a.id = "project" + id;
        a.textContent = p;

        this.projectElem.append(li);
        li.append(a);
    }
}

function expiredTask (task){
    for(let [id, t] of app.tasks.entries()){
        if(t === task){
            let elem = document.getElementById("deadline" + id);
            elem.className = "deadline text-danger";
            break;
        }
    }
}