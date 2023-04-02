class TaskCreation {
  constructor(
    title,
    description,
    dateString,
    tags = [],
    priority,
    add,
    content = "",
    taskId
  ) {
    this.id = taskId || new Date().getTime().toString();
    this.title = title;
    this.description = description;
    this.tags = tags || [];
    this.priority = priority || 1;
    this.add = add || false;
    this.completed = false;
    this.content = content;
    this.createdDate = dateString || new Date().toISOString();
  }
}

export default TaskCreation;
