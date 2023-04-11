'use strict';

export const generateTaskId = () => {
  const taskId = `${Date.now()}`;
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
    taskId = '',
    dueDate = null,
    dataCompleted = false,
    strikethrough = false
  ) {
    this.taskId = taskId || generateTaskId();
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.priority = priority;
    this.add = add;
    this.content = content;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.strikethrough = strikethrough; 
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
    task.taskId,
    task.dueDate,
    task.strikethrough
  );
  return newTask;
};

