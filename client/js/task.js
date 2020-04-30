"use strict";

class Task {
    constructor(id, description, project, important, privateTask, deadline, completed) {
        this.id = id;
        this.description = description;
        this.important = important;
        this.privateTask = privateTask;
        if(project) // can be undefined
            this.project = project;
        if(deadline) // can be undefined
            this.deadline =  moment(deadline);
        this.completed = completed;
    }
}

export default Task;

// Timeout setted during html node creation in taskmanager.js (with callback)