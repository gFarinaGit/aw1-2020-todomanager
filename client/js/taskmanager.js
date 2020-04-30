"use strict";

import Task from "./task.js";
import Project from "./project.js";
import * as Api from "./api.js"
import Filters from "./filters.js";

class TaskManager{
    constructor() {
        // Create filter manager
        this.filters = new Filters();

        // take points where append html nodes
        this.taskElem = document.getElementById("taskList");
        this.projectElem = document.getElementById("projectList");

        // create Task list
        Api.getTasks().then( (res) => {
            res.forEach( (t) =>{
                const task = new Task(t.id, t.description, t.project, t.important, t.private, t.deadline, t.completed);
                this.createTaskHTML(task);
            })
        })
            .catch( (err) => console.log(err) );

        // create Project list
        this.projects = [];
        Api.getProjects().then( (res) => {
            res.forEach( (p) =>{
                this.projects.push(new Project(p.project));
                this.createProjectHTML(this.projects[this.projects.length - 1]);
                this.filters.setProjectListener(this.projects[this.projects.length - 1])
            })

        })
            .catch( (err) => console.log(err) );
   }

    createTaskHTML(t){
        // list entry creation
        let li = document.createElement('li');
        li.className = "list-group-item shadow d-inline-flex";
        li.id = "task" + t.id;
        this.taskElem.append(li);

        // checkbox creation
        let div = document.createElement('div');
        div.className = "custom-control custom-checkbox";
        li.append(div);

        // chechbox input
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        if(t.important)
            checkbox.className = "custom-control-input important"
        else
            checkbox.className = "custom-control-input";
        checkbox.id = "checkbox" + t.id;
        div.append(checkbox);

        // checkbox label
        let label = document.createElement('label');
        label.className = "custom-control-label";
        label.htmlFor = "checkbox" + t.id;
        label.textContent = t.description;
        div.append(label);

        // project label if present
        if(t.project){
            let project = document.createElement('span');
            project.className = "label bg-secondary text-white"
            project.textContent = t.project;
            li.append(project);
        }

        // private
        if(!t.privateTask){
            li.insertAdjacentHTML("beforeend", `<svg class="bi bi-people-circle user-image" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
                    <path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd"/>
                    </svg> `);
        }

        // deadline if present
        if(t.deadline){
            let deadline = document.createElement('p');
            deadline.className = "deadline"
            deadline.textContent = t.deadline.format("dddd Do MMMM YYYY") +
                " at " + t.deadline.format("HH:mm");
            deadline.id = "deadline" + t.id;
            li.append(deadline);
            // setting timeout and its callback
            const now = moment();
            setTimeout( (task) => {
                let elem = document.getElementById("deadline" + task.id);
                elem.className = "deadline text-danger";
            }, t.deadline.diff(now), t);
        }
    }

    createProjectHTML(p){
        let li = document.createElement('li');

        let a = document.createElement('a');
        a.id = "project" + p.id;
        a.textContent = p.name;

        this.projectElem.append(li);
        li.append(a);
    }

    addTask(task){
        this.createTaskHTML(task);
        if(this.projects.filter( p => p.name === task.project ).length === 0
            && task.project !== undefined ){
            this.projects.push(new Project(task.project));
            this.createProjectHTML(this.projects[this.projects.length - 1]);
            this.filters.setProjectListener(this.projects[this.projects.length - 1]);
        }
        this.filters.showAll();
    }
}

export default TaskManager;