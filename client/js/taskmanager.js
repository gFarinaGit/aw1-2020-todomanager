"use strict";

import Task from "./task.js";
import Project from "./project.js";
import * as Api from "./api.js"
import Filters from "./filters.js";

class TaskManager{

    static currentID;

    constructor() {
        // Create filter manager
        this.filters = new Filters();

        // take points where append html nodes
        this.taskElem = document.getElementById("taskList");
        this.projectElem = document.getElementById("projectList");

        // create Task list
        Api.getTasks().then( (res) => {
            res.forEach( (t) => this.createTaskHTML(t))
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

        // checkbox input
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        if(t.important)
            checkbox.className = "custom-control-input important"
        else
            checkbox.className = "custom-control-input";
        checkbox.id = "checkbox" + t.id;
        if(t.completed) checkbox.checked = true;
        // set checkbox listener
        checkbox.addEventListener('click', () => Api.taskCompleted(t.id));
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

        let edit = document.createElement('a');
        edit.className = "link";
        edit.id = "edit" + t.id;
        edit.href = '#';
        edit.insertAdjacentHTML("beforeend", `<svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                </svg>`);
        edit.addEventListener('click', () => this.editForm(t.id) );
        li.append(edit);

        let trashcan = document.createElement('a');
        trashcan.className = "link";
        trashcan.id = "delete" + t.id;
        trashcan.href = '#';
        trashcan.insertAdjacentHTML("beforeend", `<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                </svg>`);
        trashcan.addEventListener('click',  () => {
            Api.deleteTask(t.id).then( (ok) => {
                if(ok) this.deleteTaskHTML(t.id);
            });
        });
        li.append(trashcan);

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

    deleteTaskHTML(id) {
        document.getElementById("task" + id).remove();
    }

    async editForm(id){
        $('#addModal').modal("toggle");
        // ask data to sever
        const task = await Api.getTask(id);
        // show task data into the form
        const form = document.getElementById("new-task");
        form.elements["form_description"].value = task.description;
        if(task.project) form.elements["form_project"].value =  task.project;
        if(task.important) form.elements["form_important"].checked = true;
        else form.elements["form_important"].checked = false;
        if(task.privateTask) form.elements["form_private"].checked = true;
        else form.elements["form_private"].checked = false;
        if(task.deadline) {
            form.elements["form_date"].value = task.deadline.format("YYYY-MM-DD");
            form.elements["form_time"].value = task.deadline.format("HH:mm");
        }
        // set name to distinguish case 'post' and 'put'
        form.name = "put";
        TaskManager.currentID = id;
    }

    updateTaskHTML(task){

    }
}

export default TaskManager;