"use strict";

import {
  loadCategories,
  updateTaskElement,
  saveCategories,
} from "./local-storage.js";

export const populateOffcanvasForm = (task) => {
  const titleInput = document.querySelector(".project-form__title");
  const descriptionInput = document.querySelector("#description-input");
  const statusInput = document.querySelector("#statusGroup");
  const priorityInput = document.querySelector("#priorityGroup");
  const dateInput = document.querySelector("#due-date");
  const tagsInput = document.querySelector("#tags");

  titleInput.textContent = task.title;
  descriptionInput.value = task.description;

  // Set the status
  const statusValue = task.taskClasses.includes("main__column--completed")
    ? "Completed"
    : task.taskClasses.includes("main__column--in-progress")
    ? "In Progress"
    : "To Do";
  statusInput.value = statusValue;
  priorityInput.value = task.priority;
  dateInput.value = task.dueDate ? task.dueDate.substring(0, 10) : "";

  tagsInput.value = task.tags;
};

export const addTaskElementClickListener = (taskElement) => {
  // Add a click event listener to the task element
  taskElement.addEventListener("click", () => {
    showTaskDetails();
  });
};

function getTaskById(taskId) {
  // Load tasks from local storage
  const tasksData = loadCategories();

  // Loop through the tasksData object to find the task with the specified taskId
  for (const column in tasksData) {
    const foundTask = tasksData[column].find((task) => task.taskId === taskId);
    if (foundTask) {
      return foundTask;
    }
  }
  return null;
}

// <------------------------ Show Task Details Logic ------------------------> //
export const showTaskDetails = () => {
  const taskElements = document.querySelectorAll(".task");
  const offcanvas = document.querySelector(".offcanvas");
  const form = document.querySelector(".project-form");

  const handleOutsideClick = (event) => {
    if (!offcanvas.contains(event.target) && !event.target.closest(".task")) {
      offcanvas.style.transform = "translateX(100%)";
      document.removeEventListener("click", handleOutsideClick);
      taskElements.forEach((taskElement) => {
        taskElement.addEventListener("click", taskClickHandler);
      });
    }
  };

  const taskClickHandler = (event) => {
    const taskId = event.currentTarget.dataset.taskId;
    const task = getTaskById(taskId);
    populateOffcanvasForm(task);

    offcanvas.style.transform = "translateX(0)";
    document.addEventListener("click", handleOutsideClick);

    form.removeEventListener("submit", handleFormSubmit);
    form.addEventListener("submit", (event) =>
      handleFormSubmit(event, event.currentTarget, task)
    );

    // Remove click listener from other task elements
    taskElements.forEach((element) => {
      if (element !== event.currentTarget) {
        element.removeEventListener("click", taskClickHandler);
      }
    });
  };

  taskElements.forEach((taskElement) => {
    taskElement.addEventListener("click", taskClickHandler);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  showTaskDetails();
});

// <------------------------ Populate Task Details Logic ------------------------> //
let formSubmitted = false;

export const handleFormSubmit = (event, taskElement, task) => {
  event.preventDefault();

  // Check if the form has already been submitted
  if (formSubmitted) {
    return;
  }

  // Set the formSubmitted flag to true
  formSubmitted = true;

  // Retrieve the updated form data and update the task object
  const titleInput = document.querySelector(".project-form__title");
  task.title = titleInput.textContent;

  const statusInput = document.querySelector("#statusGroup");
  task.status = statusInput.value;

  const dueDateInput = document.querySelector("#due-date");
  task.dueDate = dueDateInput.value
    ? new Date(dueDateInput.value).toISOString()
    : null;

  const priorityInput = document.querySelector("#priorityGroup");
  task.priority = priorityInput.value;

  const tagsInput = document.querySelector("#tags");
  task.tags = tagsInput.value.split(", ");

  const descriptionInput = document.querySelector("#description-input");
  task.description = descriptionInput.value;

  updateTaskElement(taskElement, task);
  updateTaskElementInUI(task.taskId, task);

  // Get all tasks after the update
  const tasks = loadCategories();
  // Save the tasks to localStorage
  saveCategories(tasks);

  // Hide the offcanvas element
  const offcanvas = document.querySelector(".offcanvas");
  offcanvas.classList.remove("offcanvas--open");

  // Reset the formSubmitted flag after a short delay
  setTimeout(() => {
    formSubmitted = false;
  }, 1000);
};

// <------------------------ Submit New Detail changes ------------------------> //

export const updateTaskElementInUI = (taskId, updatedTask) => {
  const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);

  const titleElement = taskElement.querySelector(".task__title");
  titleElement.textContent = updatedTask.title;
  const dueDateElement = taskElement.querySelector(".task__due-date");
  dueDateElement.textContent = new Date(
    updatedTask.dueDate
  ).toLocaleDateString();

  if (updatedTask.dueDate) {
    dueDateElement.textContent = new Date(
      updatedTask.dueDate
    ).toLocaleDateString();
  }

  const descriptionElement = taskElement.querySelector(".task__description");
  descriptionElement.textContent = updatedTask.description;

  const tagsElement = taskElement.querySelector(".task__tags");
  tagsElement.textContent = updatedTask.tags.join(", ");

  taskElement.classList.remove(
    "task--urgent",
    "task--high",
    "task--low",
    "task--completed"
  );

  switch (updatedTask.priority) {
    case "Urgent":
      taskElement.classList.remove(
        "task--high",
        "task--completed",
        "task--low"
      );
      taskElement.classList.add("task--urgent");
      break;
    case "High":
      taskElement.classList.remove(
        "task--urgent",
        "task--completed",
        "task--low"
      );
      taskElement.classList.add("task--high");
      break;
    case "Low":
      taskElement.classList.remove(
        "task--urgent",
        "task--completed",
        "task--high"
      );
      taskElement.classList.add("task--low");
      break;
    case "Completed":
      taskElement.classList.add("task--completed");
      break;
    default:
      break;
  }

  // Update the taskClasses array on the task element
  taskElement.__data.taskClasses = updatedTask.taskClasses;
};
