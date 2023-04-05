export class TaskCreation {
  #id;
  #title;
  #description;
  #tags;
  #priority;
  #add;
  #completed;
  #content;
  #dueDate;

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
    this.#id = taskId || new Date().getTime().toString();
    this.#title = title;
    this.#description = description;
    this.#tags = tags || [];
    this.#priority = priority || 1;
    this.#add = add || false;
    this.#completed = false;
    this.#content = content;
    this.#dueDate = dueDate ? new Date(dueDate) : new Date();
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    this.#title = title;
  }

  get description() {
    return this.#description;
  }

  set description(description) {
    this.#description = description;
  }

  get tags() {
    return this.#tags;
  }

  set tags(tags) {
    this.#tags = tags;
  }

  get priority() {
    return this.#priority;
  }

  set priority(priority) {
    this.#priority = priority;
  }

  get add() {
    return this.#add;
  }

  set add(add) {
    this.#add = add;
  }

  get completed() {
    return this.#completed;
  }

  set completed(completed) {
    this.#completed = completed;
  }

  get content() {
    return this.#content;
  }

  set content(content) {
    this.#content = content;
  }

  get dueDate() {
    return this.#dueDate;
  }

  set dueDate(dueDate) {
    this.#dueDate = dueDate ? new Date(dueDate) : new Date();
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
};
