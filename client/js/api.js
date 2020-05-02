"use strict";

import Task from "./task.js";
import Project from "./project.js";

async function getTasks() {
    // call REST API: GET /tasks
    const response = await fetch('/tasks');
    const tasks_json = await response.json();
    if(response.ok)
        return tasks_json.map( (json) => Task.createTask(json) );
    else
        throw tasks_json;
}

async function getTask(id) {
    // call REST API: GET /tasks
    const response = await fetch('/tasks/' + id);
    const tasks_json = await response.json();
    if(response.ok)
        return Task.createTask(tasks_json);
    else
        throw tasks_json;
}

async function getProjects() {
    // call REST API: GET /projects
    const response = await fetch('/projects');
    const projects_json = await response.json();
    if(response.ok)
        return projects_json.map( (json) => Project.createProject(json) );
    else
        throw projects_json;
}

async function filter(name) {
    // call REST API: GET /filter/<name>
    const response = await fetch('/filter/' + name);
    const filter_json = await response.json();
    if(response.ok)
        return filter_json;
    else
        throw filter_json;
}

async function projectFilter(name) {
    // call REST API: GET /projects/<name>
    const response = await fetch('/projects/' + name);
    const projectFilter_json = await response.json();
    if(response.ok)
        return projectFilter_json;
    else
        throw projectFilter_json;
}

async function addTask(task) {
    // call REST API: POST /tasks
    return new Promise((resolve, reject) => {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then( (response) => {
            if(response.ok) {
                resolve(response.json());
            } else {
                // analyze the cause of error
                response.json()
                    .then( (obj) => {reject(obj);} ) // error msg in the response body
                    .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function taskCheck(id) {
    // call REST API: PUT /tasks/<id>/completed
    const response = await fetch('/tasks/' + id + "/check",
                                { method: 'PUT',});
    if(response.ok) return response;
    else return null;
}

async function deleteTask(id) {
    // call REST API: DELETE /tasks/<id>
    const response = await fetch('/tasks/' + id, { method: 'DELETE',});
    if(response.ok) return true;
    else return false;
}

async function updateTask(task, id) {
    // call REST API: PUT /tasks/<id>
    return new Promise((resolve, reject) => {
        fetch('/tasks/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then( (response) => {
            if(response.ok) {
                resolve(response.json());
            } else {
                // analyze the cause of error
                response.json()
                    .then( (obj) => {reject(obj);} ) // error msg in the response body
                    .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}


export { getTasks, getTask, getProjects, filter, projectFilter, addTask, taskCheck, deleteTask, updateTask };