import Task from "./task";
import Project from "./project"

async function getTasks() {
    // call REST API: GET /tasks
    const response = await fetch('/tasks');
    const tasks_json = await response.json();
    if(response.ok)
        return tasks_json.map( (json) => Task.createTask(json) );
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

async function filterTasks(filter){
    if(isNaN(filter.id)){   // if id is not a number => is a filter name
        // call REST API: GET /filter/<name>
        const response = await fetch('/filter/' + filter.id);
        const filter_json = await response.json();
        if(response.ok)
            return filter_json.map( json => Task.createTask(json) );
        else
            throw filter_json;
    }
    else {  // if id is a number => is a project id
        // call REST API: GET /projects/<name>
        const response = await fetch('/projects/' + filter.name);
        const projectFilter_json = await response.json();
        if(response.ok)
            return projectFilter_json.map( json => Task.createTask(json));
        else
            throw projectFilter_json;
    }
}

async function deleteTask(id) {
    // call REST API: DELETE /tasks/<id>
    const response = await fetch('/tasks/' + id, { method: 'DELETE',});
    return response.ok;
}

async function addOrUpdateTask(values) {
    let deadline = undefined;
    if (values.date !== undefined && values.time !== undefined)
        deadline = values.date + " " + values.time;
    else if (values.date !== undefined)
        deadline = values.date;

    const task = {
        description: values.description,
        project: values.project,
        important: values.important,
        private: values.privateTask,
        deadline: deadline
    };

    if(values.id) await updateTask(task, values.id) // if id exists => update
    else await addTask(task); // if id does not exist => add
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
                    .catch( () => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( () => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
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
                    .catch( () => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( () => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function checkTask(id) {
    // call REST API: PUT /tasks/<id>/check
    const response = await fetch('/tasks/' + id + "/check",
        { method: 'PUT',});
    if(response.ok) return response;
    else return null;
}


const API = { getTasks, getProjects, filterTasks, deleteTask, addOrUpdateTask, checkTask };
export default API;