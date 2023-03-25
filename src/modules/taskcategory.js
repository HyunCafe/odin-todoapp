"use strict";


class TaskCategory {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
  
    addTask(task) {
        this.tasks.push(task);
    }
  
    removeTask(index) {
        this.tasks.splice(index, 1);
    }
  }
  