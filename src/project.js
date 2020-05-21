"use strict";

class Project {
    static cnt = 1;
    constructor(name) {
        this.id = Project.cnt++;
        this.name = name;
    }
    static createProject(json){
        return new Project(json.project);
    }
}

export default Project;