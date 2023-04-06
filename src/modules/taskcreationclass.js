export class TaskCreation {
  constructor(
    title,
    description,
    tags = [],
    priority = 1,
    add = false,
    content = "",
    taskId = '',
    dueDate = null
  ) {
    this.id = taskId || new Date().getTime().toString();
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
    task.taskId, 
    task.dueDate
  );
  return newTask;
};
