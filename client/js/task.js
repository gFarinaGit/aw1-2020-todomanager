"use strict";

class Task {
    constructor(id, description, project, important, privateTask, deadline) {
        this.id = id;
        this.description = description;
        this.important = important;
        this.privateTask = privateTask;
        if(project) // can be undefined
            this.project = project;
        if(deadline) // can be undefined
            this.deadline =  moment(deadline);
    }
}

// Timeout setted during html node creation in taskmanager.js (with callback)