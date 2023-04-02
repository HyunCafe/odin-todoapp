"use strict";

import Sortable from "sortablejs";
import {
  saveCategories,
  loadCategories,
  deleteTaskFromLocalStorage,
  populateTasksFromLocalStorage,
} from "./local-storage";

let taskId = 1;

// <------------------------ Creation and Append Task Cards to Columns ------------------------> //

export const getTaskColumn = (columnName) => {
  const columns = {
    todo: document.querySelector(".main__column--todo"),
    "in-progress": document.querySelector(".main__column--in-progress"),
    completed: document.querySelector(".main__column--completed"),
  };
  return columns[columnName];
};

export const appendTask = (task, categoryElement, callback) => {
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
  const formattedDate = formatDateAgo(task.createdDate || new Date());
  taskCreatedDate.textContent = formattedDate;

  // Delete icon click listener
  deleteIcon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent triggering the taskElement click event
    removeTaskFromDisplay(taskElement);
  });

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

  // Assign border color based on priority level
  if (task.priority === "Urgent") {
    taskElement.classList.add("task--urgent");
  } else if (task.priority === "High") {
    taskElement.classList.add("task--high");
  } else {
    taskElement.classList.add("task--low");
  }

  // Check if categoryElement is defined before appending taskElement
  if (categoryElement) {
    console.log(
      `Appending task to ${categoryElement.classList[1]} column: ${task.title}`
    );

    categoryElement.append(taskElement);
    if (callback && typeof callback === "function") {
      callback(taskElement);
    }
    // Save the categories to local storage
    saveCategories(
      document.querySelector(".main__column--todo"),
      document.querySelector(".main__column--in-progress"),
      document.querySelector(".main__column--completed")
    );
  }
  // Add a event listener to the task element for Complete Color Code
  let taskCompleted = false;
  const completedColumn = document.querySelector(".main__column--completed");

  taskElement.addEventListener("dragend", (event) => {
    const taskContainer = event.target.closest(".task__container");
    const isInCompletedColumn = completedColumn.contains(taskContainer);

    if (isInCompletedColumn) {
      taskContainer.classList.add("task--completed");
    } else {
      taskContainer.classList.remove("task--completed");
    }
    // Save the categories to local storage
    saveCategories(
      document.querySelector(".main__column--todo"),
      document.querySelector(".main__column--in-progress"),
      document.querySelector(".main__column--completed")
    );
  });

  taskId++;
};

// <------------------------ Custom Helper Date Function ------------------------> //

function formatDateAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const monthsDifference = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  return monthsDifference > 1
    ? `${monthsDifference} Months Ago`
    : monthsDifference === 1
    ? "1 Month Ago"
    : "Less than a Month Ago";
}

// <------------------------ Append New Form Submission Cards  ------------------------> //

const form = document.querySelector(".resource-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the input values
  const title = event.target.elements.title.value;
  const description = event.target.elements.description.value;
  const tags = event.target.elements.tags.value;
  const priority = event.target.elements.priority.value;

  // Create the task object
  const task = {
    title,
    description,
    tags,
    priority,
  };

  // Call the appendTask function with the task object and the categoryElement
  const categoryElement = document.querySelector(".main__column--todo");
  appendTask(task, categoryElement);

  // Save the task to local storage
  const todoColumnElement = document.querySelector(".main__column--todo");
  const inProgressColumnElement = document.querySelector(
    ".main__column--in-progress"
  );
  const completedColumnElement = document.querySelector(
    ".main__column--completed"
  );
  saveCategories(
    todoColumnElement,
    inProgressColumnElement,
    completedColumnElement
  );
});

// <------------------------ Update Task Display------------------------> //

export const updateTaskDisplay = (taskElement, task) => {
  // Update the display of a task element based on the task object's properties
};

const removeTaskFromDisplay = (taskElement) => {
  const taskId = taskElement.getAttribute("data-task-id");

  // Remove the task container from the DOM
  taskElement.remove();

  // Remove the task from local storage
  deleteTaskFromLocalStorage(taskId);
};

export const showTaskDetails = (task) => {
  // Create a modal or a pop-up to display task details
  // Populate the modal with task details (title, description, date, etc.)
  // Add event listeners to close the modal
};

// <------------------------ Sortable Task Column Initialization------------------------> //

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
      });
    });
  }
  populateTasksFromLocalStorage();
});
