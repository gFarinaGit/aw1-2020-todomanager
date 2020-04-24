"use strict";

class Filters {
    constructor(tasks, projectList) {
        this.tasks = tasks;
        this.projectList = projectList;
        this.projectFilters = [];

        this.title = document.getElementById("title");
        this.all = document.getElementById("all");
        this.important = document.getElementById("important");
        this.today = document.getElementById("today");
        this.next7days = document.getElementById("next-7-days");
        this.privato = document.getElementById("private");
        this.shared = document.getElementById("shared");
        this.last = this.all;

        this.showAll();
        this.showImportant();
        this.showToday();
        this.showNext7days();
        this.showPrivate();
        this.showShared();
        this.showProject();
    }

    showAll(){
        this.all.addEventListener('click', () => {
            // Title Update
            this.title.textContent = "ALL";
            // Selection Update
            this.last.parentElement.className = "";
            this.last = this.all;
            this.all.parentNode.className = "active";
            // Task Update
            this.tasks.forEach( (t, id) => {
                let task = document.getElementById(id);
                task.className = "list-group-item shadow d-inline-flex";
            })
        });
    }

    showImportant(){
        this.important.addEventListener('click', () => {
            // Title Update
            this.title.textContent = "IMPORTANT";
            // Selection Update
            this.last.parentElement.className = "";
            this.last = this.important;
            this.important.parentNode.className = "active";
            // Task Update
            this.tasks.forEach( (t, id) => {
                let task = document.getElementById(id);
                if(t.urgent === "true")
                    task.className = "list-group-item shadow d-inline-flex";
                else task.className = "list-group-item shadow d-none";
            })
        });
    }

    showToday(){
        this.today.addEventListener('click', () => {
            // Title Update
            this.title.textContent = "TODAY ";
            // Selection Update
            this.last.parentElement.className = "";
            this.last = this.today;
            this.today.parentNode.className = "active";
            // Task Update
            this.tasks.forEach( (t, id) => {
                let task = document.getElementById(id);
                if(t.deadline != null && t.deadline.isSame(moment(), 'day'))
                    task.className = "list-group-item shadow d-inline-flex";
                else task.className = "list-group-item shadow d-none";
            })
        });
    }

    showNext7days(){
        this.next7days.addEventListener('click', () => {
            // Title Update
            this.title.textContent = "NEXT 7 DAYS";
            // Selection Update
            this.last.parentElement.className = "";
            this.last = this.next7days;
            this.next7days.parentNode.className = "active";
            // Task Update
            this.tasks.forEach( (t, id) => {
                let task = document.getElementById(id);
                if(t.deadline != null
                    && t.deadline.isBetween(moment(), moment().add(7, 'd'),
                        'd', '(]'))
                    task.className = "list-group-item shadow d-inline-flex";
                else task.className = "list-group-item shadow d-none";
            })
        });
    }

    showPrivate(){
        this.privato.addEventListener('click', () => {
            // Title Update
            this.title.textContent = "PRIVATE";
            // Selection Update
            this.last.parentElement.className = "";
            this.last = this.privato;
            this.privato.parentNode.className = "active";
            // Task Update
            this.tasks.forEach( (t, id) => {
                let task = document.getElementById(id);
                if(t.shared === "false")
                    task.className = "list-group-item shadow d-inline-flex";
                else task.className = "list-group-item shadow d-none";
            })
        });
    }

    showShared(){
        this.shared.addEventListener('click', () => {
            // Title Update
            this.title.textContent = "SHARED WITH...";
            // Selection Update
            this.last.parentElement.className = "";
            this.last = this.shared;
            this.shared.parentNode.className = "active";
            // Task Update
            this.tasks.forEach( (t, id) => {
                let task = document.getElementById(id);
                if(t.shared === "true")
                    task.className = "list-group-item shadow d-inline-flex";
                else task.className = "list-group-item shadow d-none";
            })
        });
    }

    showProject(){
        this.projectList.forEach( (p, id) => this.addProject(p, id) );
    }

    addProject(p, id) {
        this.projectFilters.push(document.getElementById("project" + id));
        this.projectFilters[id].addEventListener("click", () => {
            // Title Update
            this.title.textContent = p;
            // Selection Update
            this.last.parentElement.className = "";
            this.last = this.projectFilters[id];
            this.projectFilters[id].parentNode.className = "active";
            // Task Update
            this.tasks.forEach( (t, id) => {
                let task = document.getElementById(id);
                if(t.project === p)
                    task.className = "list-group-item shadow d-inline-flex";
                else task.className = "list-group-item shadow d-none";
            })
        })
    }
}
