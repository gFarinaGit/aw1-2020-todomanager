"use strict";

class Project {
    static cnt = 1;
    constructor(name) {
        this.id = Project.cnt++;
        this.name = name;0
    }
}