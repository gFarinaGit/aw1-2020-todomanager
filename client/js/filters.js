"use strict";

import * as Api from "./api.js"

class Filters {
    constructor() {
        // Take title
        this.title = document.getElementById("title");

        // set filters listeners
        this.setFiltersListeners();
    }

    async hideAll(){
        document.querySelector("#sidebar li.active").classList.remove("active");
        const ids = await Api.filter("all");
        ids.forEach( (o) => {
            let task = document.getElementById("task" + o.id);
            task.className = "list-group-item shadow d-none";
        })
    }

    async showAll(){
        document.querySelector("#sidebar li.active").classList.remove("active");
        const all = document.getElementById("all");
        this.title.textContent = "ALL";
        all.parentElement.className = "active";
        const ids = await Api.filter("all");
        this.showTasks(ids);
    }

    showTasks(ids){
        ids.forEach( (o) => {
            let task = document.getElementById("task" + o.id);
            task.className = "list-group-item shadow d-inline-flex";
        })
    }

    setFiltersListeners(){
        // All filter listener
        const all = document.getElementById("all");
        all.addEventListener('click', () => this.showAll() );

        // Important filter listener
        const important = document.getElementById("important");
        important.addEventListener('click', async () => {
            this.hideAll();
            this.title.textContent = "IMPORTANT";
            important.parentNode.className = "active";
            const ids = await Api.filter("important");
            this.showTasks(ids);
        });

        // Today filter listener
        const today = document.getElementById("today");
        today.addEventListener('click', async () => {
            this.hideAll();
            this.title.textContent = "TODAY ";
            today.parentNode.className = "active";
            const ids = await Api.filter("today");
            this.showTasks(ids);
        });

        // Next 7 Days filter listener
        const next7days = document.getElementById("next-7-days");
        next7days.addEventListener('click', async () => {
            this.hideAll();
            this.title.textContent = "NEXT 7 DAYS";
            next7days.parentNode.className = "active";
            const ids = await Api.filter("next7days");
            this.showTasks(ids);
        });

        // Private filter listener
        const priv = document.getElementById("private");
        priv.addEventListener('click', async() => {
            this.hideAll();
            this.title.textContent = "PRIVATE";
            priv.parentNode.className = "active";
            const ids = await Api.filter("private");
            this.showTasks(ids);
        });

        // Shared filter listener
        const shared = document.getElementById("shared");
        shared.addEventListener('click', async () => {
            this.hideAll();
            this.title.textContent = "SHARED WITH...";
            shared.parentNode.className = "active";
            const ids = await Api.filter("shared");
            this.showTasks(ids);
        });
    }

    setProjectListener(p){
        const project = document.getElementById("project" + p.id);
        project.addEventListener("click", async () => {
            this.hideAll();
            this.title.textContent = p.name.toUpperCase();
            project.parentNode.className = "active";
            const ids = await Api.projectFilter(p.name);
            this.showTasks(ids);
        });
    }
}

export default Filters;
