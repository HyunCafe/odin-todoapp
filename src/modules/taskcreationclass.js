export class TaskCreation {
  constructor(
    title,
    description,
    tags = [],
    priority,
    add,
    content = "",
    taskId,
    dueDate
  ) {
    this.id = taskId || new Date().getTime().toString();
    this.title = title;
    this.description = description;
    this.tags = tags || [];
    this.priority = priority || 1;
    this.add = add || false;
    this.completed = false;
    this.content = content;
    this.dueDate = dueDate ? new Date(dueDate) : new Date();

  }
}

export const createTaskFromObject = (task) => {
  return new TaskCreation(
    task.title,
    task.description,
    task.tags.split(","),
    task.priority,
    task.add,
    task.content,
    task.taskId,
    task.dueDate
  );
}
