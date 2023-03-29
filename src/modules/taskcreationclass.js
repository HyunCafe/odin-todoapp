class TaskCreation {
  constructor(
    title,
    description,
    dateString,
    tags = [],
    priority,
    add,
    content = ""
  ) {
    this.id = new Date().getTime().toString(); // generate task ID using timestamp
    this.title = title;
    this.description = description;
    this.tags = tags || [];
    this.priority = priority || 1;
    this.add = add || false;
    this.completed = false;
    this.content = content;
  }
}

export default TaskCreation;
