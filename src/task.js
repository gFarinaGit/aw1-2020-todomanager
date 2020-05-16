"use strict";
import * as moment from 'moment';

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

    static createTask(json){
        return new Task(json.id, json.description, json.project, json.important, json.private, json.deadline, json.completed);
    }

}

export default Task;

// Timeout setted during html node creation in taskmanager.js (with callback)