import Task from "./task";

let tasks = [
    new Task(1, "Watch Mr. Robot", "Personal", 0, 1, "2020-05-24 17:00", 1),
    new Task(2, "Go for a walk", "Personal", 1, 1, "2020-04-18 08:00", 0),
    new Task(3, "Organize a party", "Personal", 0, 0, "2021-03-21 17:00", 0),
    new Task(4, "Watch the Express videolecture", "WebApp I", 1, 1, "2020-04-24 23:59", 0),
];

let projects = [
    { id: 1, name: "WebApp I" },
    { id: 2, name: "Personal" },
];

async function getTasks() {
    return tasks;
}
async function getProjects() {
    return projects;
}

async function filterTasks(filter){
    switch(filter.id) {
        case "all":
            return tasks;
        case "important":
            return tasks.filter( (t) => t.important );
        case "today":
            return [];
        case "next7days":
            return [];
        case "private":
            return tasks.filter( (t) => t.privateTask );
        case "shared":
            return tasks.filter( (t) => !t.privateTask );
        default:
            return tasks.filter( (t) => (t.project === filter.name));
    }
}

function deleteTask (id){
    tasks = tasks.filter( (t) => t.id !== id );
}

function updateTask(values) {
    const id = values.id || (tasks.length+1);
    tasks = tasks.filter( (t) =>  t.id !== values.id );

    let deadline = undefined;
    if (values.date !== "" && values.time !== "")
        deadline = values.date + " " + values.time;
    else if (values.date !== "")
        deadline = values.date;

    tasks.push(new Task (id, values.description, values.project, values.important, values.privateTask, deadline, 0));
}

const API = { getTasks, getProjects, filterTasks, deleteTask, updateTask };
export default API;