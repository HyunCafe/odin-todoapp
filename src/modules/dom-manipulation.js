"use strict";

import Sortable from "sortablejs";
import {
  saveCategories,
  loadCategories,
  updateCategory,
} from "./local-storage";

let taskId = 1;

export function appendTask(task, categoryElement, callback) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task__container");
  taskElement.setAttribute("data-task-id", taskId);

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

  const taskTags = document.createElement("span");
  taskTags.classList.add("task__tags");
  taskTags.textContent = task.tags;

  const taskCreatedDate = document.createElement("span");
  taskCreatedDate.classList.add("task__created-date");
  taskCreatedDate.textContent = `${task.formattedCreatedDate()}`;

  // Assign border color based on priority level
  if (task.priority === "Urgent") {
    taskElement.classList.add("task--urgent");
  } else if (task.priority === "High") {
    taskElement.classList.add("task--high");
  } else {
    taskElement.classList.add("task--low");
  }

  // Add a click event listener to the task element
  taskElement.addEventListener("click", () => {
    showTaskDetails(task);
  });

  taskHeader.append(taskTitle);
  taskHeader.append(deleteIcon);
  taskElement.append(taskHeader);
  taskElement.append(taskDescription);
  taskFooter.append(taskCreatedDate);
  taskFooter.append(taskTags);
  taskElement.append(taskFooter);

  // Check if categoryElement is defined before appending taskElement
  if (categoryElement) {
    categoryElement.append(taskElement);
    if (callback) {
      callback();
    }
  }

  taskId++;
}
export function updateTaskDisplay(taskElement, task) {
  // Update the display of a task element based on the task object's properties
}

export function removeTaskFromDisplay(taskElement) {
  // Remove a task element from the DOM
}

export function showTaskDetails(task) {
  // Create a modal or a pop-up to display task details
  // Populate the modal with task details (title, description, date, etc.)
  // Add event listeners to close the modal
}

document.addEventListener("DOMContentLoaded", () => {
  const taskColumns = document.querySelectorAll(".main__column");

  if (taskColumns.length) {
    taskColumns.forEach((column) => {
      const sortable = new Sortable(column, {
        animation: 150,
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        group: {
          name: column.getAttribute("data-column-name"),
          pull: true,
          put: true,
        },
        draggable: ".task__container",
        onEnd: () => {
          // Call the loadCategories function to get the current categories
          const todoColumnElement = document.querySelector(
            ".main__column--todo"
          );
          const inProgressColumnElement = document.querySelector(
            ".main__column--in-progress"
          );
          const completedColumnElement = document.querySelector(
            ".main__column--completed"
          );

          // Call the saveCategories function with the updated categories
          saveCategories(
            todoColumnElement,
            inProgressColumnElement,
            completedColumnElement
          );
        },
      });
    });
  }
});
