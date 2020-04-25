"use strict";

class Filters {
    constructor(tasks, projects) {
        this.tasks = tasks;
        this.projects = projects;

        // Take title
        this.title = document.getElementById("title");

        // set filters listeners
        this.setFiltersListeners();

        // set projects listeners
        this.setProjectsListeners();
    }

    hideAll(){
        document.querySelector("#sidebar li.active").classList.remove("active");
        this.tasks.forEach( (t) => {
            let task = document.getElementById("task" + t.id);
            task.className = "list-group-item shadow d-none";
        })
    }

    setFiltersListeners(){
        // All filter listener
        const all = document.getElementById("all");
        all.addEventListener('click', () => {
            document.querySelector("#sidebar li.active").classList.remove("active");
            this.title.textContent = "ALL";
            all.parentElement.className = "active";
            this.tasks.forEach( (t) => {
                let task = document.getElementById("task" + t.id);
                task.className = "list-group-item shadow d-inline-flex";
            });
        });

        // Important filter listener
        const important = document.getElementById("important");
        important.addEventListener('click', () => {
            this.hideAll();
            this.title.textContent = "IMPORTANT";
            important.parentNode.className = "active";
            this.tasks.filter( (t) => t.important )
                .forEach( (t) => {
                let task = document.getElementById("task" + t.id);
                task.className = "list-group-item shadow d-inline-flex";
            });
        });

        // Today filter listener
        const today = document.getElementById("today");
        today.addEventListener('click', () => {
            this.hideAll();
            this.title.textContent = "TODAY ";
            today.parentNode.className = "active";
            this.tasks.filter( (t) => t.deadline && t.deadline.isSame(moment(), 'day') )
                .forEach( (t) => {
                    let task = document.getElementById("task" + t.id);
                    task.className = "list-group-item shadow d-inline-flex";
            });
        });

        // Next 7 Days filter listener
        const next7days = document.getElementById("next-7-days");
        next7days.addEventListener('click', () => {
            this.hideAll();
            this.title.textContent = "NEXT 7 DAYS";
            next7days.parentNode.className = "active";
            this.tasks.filter( (t) => t.deadline &&
                t.deadline.isBetween(moment(), moment().add(7, 'd'), 'd', '(]') )
                .forEach( (t) => {
                    let task = document.getElementById("task" + t.id);
                    task.className = "list-group-item shadow d-inline-flex";
            });
        });

        // Private filter listener
        const priv = document.getElementById("private");
        priv.addEventListener('click', () => {
            this.hideAll();
            this.title.textContent = "PRIVATE";
            priv.parentNode.className = "active";
            this.tasks.filter( (t) => t.privateTask)
                .forEach( (t) => {
                    let task = document.getElementById("task" + t.id);
                    task.className = "list-group-item shadow d-inline-flex";
            })
        });

        // Shared filter listener
        const shared = document.getElementById("shared");
        shared.addEventListener('click', () => {
            this.hideAll();
            this.title.textContent = "SHARED WITH...";
            shared.parentNode.className = "active";
            this.tasks.filter( (t) => !t.privateTask)
                .forEach( (t) => {
                    let task = document.getElementById("task" + t.id);
                    task.className = "list-group-item shadow d-inline-flex";
            })
        });
    }

    setProjectsListeners(){
        this.projects.forEach( (p) => {
            const project = document.getElementById("project" + p.id);
            project.addEventListener("click", () => {
                this.hideAll();
                this.title.textContent = p.name.toUpperCase();
                project.parentNode.className = "active";
                this.tasks.filter( (t) => t.project === p.name )
                    .forEach( (t) => {
                        let task = document.getElementById("task" + t.id);
                        task.className = "list-group-item shadow d-inline-flex";
                })
            });
        })
    }
}
