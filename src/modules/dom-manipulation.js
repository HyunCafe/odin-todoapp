"use strict";

export function appendTask(task, categoryElement) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task__header");

  const taskTitle = document.createElement("h4");
  taskTitle.classList.add("task__title");
  taskTitle.textContent = task.title;

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("task__delete-icon", "material-icons");
  deleteIcon.textContent = "delete";

  const taskDescription = document.createElement("p");
  taskDescription.classList.add("task__description");
  taskDescription.textContent = task.description;

  const taskFooter = document.createElement("div");
  taskFooter.classList.add("task__footer");

  const taskDate = document.createElement("span");
  taskDate.classList.add("task__date");
  taskDate.textContent = task.date;

  const taskPriority = document.createElement("span");
  taskPriority.classList.add("task__priority");
  taskPriority.textContent = task.priority;

  taskHeader.append(taskTitle);
  taskHeader.append(deleteIcon);
  taskElement.append(taskHeader);
  taskElement.append(taskDescription);
  taskFooter.append(taskDate);
  taskFooter.append(taskPriority);
  taskElement.append(taskFooter);

  categoryElement.append(taskElement)
}

export function updateTaskDisplay(taskElement, task) {
  // Update the display of a task element based on the task object's properties
}

export function removeTaskFromDisplay(taskElement) {
  // Remove a task element from the DOM
}
