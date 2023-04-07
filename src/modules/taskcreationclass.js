'use strict';

let taskIdCounter = 1;

export const generateTaskId = () => {
  const taskId = `${taskIdCounter}`;
  taskIdCounter++;
  return taskId;
};


export class TaskCreation {
  constructor(
    title,
    description,
    tags = [],
    priority = 1,
    add = false,
    content = "",
    id = '',
    dueDate = null
  ) {
    this.id = id || generateTaskId();
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.priority = priority;
    this.add = add;
    this.completed = false;
    this.content = content;
    this.dueDate = dueDate ? new Date(dueDate) : null;
  }
}

export const createTaskFromObject = (task) => {
  const newTask = new TaskCreation(
    task.title,
    task.description,
    task.tags,
    task.priority,
    task.add, 
    task.content,
    task.id, 
    task.dueDate
  );
  return newTask;
};
