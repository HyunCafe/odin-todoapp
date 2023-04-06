"use strict";

import { isValid, formatDistance, parseISO } from "date-fns";
import { WebStorageAPI, deleteTaskFromLocalStorage } from "./local-storage";
import { updateTaskCounters } from "./taskcategory.js";
import { createTaskFromObject } from "./taskcreationclass";

// <------------------------ Task Column Helper Function ------------------------> //

export const getTaskColumn = (columnName) => {
  const columns = {
    todo: document.querySelector(".main__column--todo"),
    "in-progress": document.querySelector(".main__column--in-progress"),
    completed: document.querySelector(".main__column--completed"),
    trash: document.querySelector(".main__column--trash"),
  };
  return columns[columnName];
};

// <------------------------ Create Task Element ------------------------> //
const createTaskElementHTML = (taskCard) => {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task__container", "task");
  taskElement.setAttribute("data-task-id", taskCard.id);

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task__header");

  const taskTitle = document.createElement("h4");
  taskTitle.classList.add("task__title");
  taskTitle.textContent = taskCard.title;

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("task__delete-icon", "material-icons");
  deleteIcon.textContent = "delete";

  const taskDescription = document.createElement("p");
  taskDescription.classList.add("task__description");
  taskDescription.textContent = taskCard.description;

  const taskFooter = document.createElement("div");
  taskFooter.classList.add("task__footer");

  const taskTags = document.createElement("span");
  taskTags.classList.add("task__tags");
  taskTags.textContent = taskCard.tags;

  const taskDueDate = document.createElement("span");
  taskDueDate.classList.add("task__due-date");

  if (typeof taskCard.dueDate === "string") {
    taskCard.dueDate = parseISO(taskCard.dueDate);
  }

  if (isValid(taskCard.dueDate)) {
    const formattedDueDate = formatDistance(taskCard.dueDate, new Date(), {
      addSuffix: true,
    });
    taskDueDate.textContent = `Due: ${formattedDueDate}`;
  }

  taskHeader.append(taskTitle);
  taskHeader.append(deleteIcon);
  taskElement.append(taskHeader);
  taskElement.append(taskDescription);
  taskFooter.append(taskDueDate);
  taskFooter.append(taskTags);
  taskElement.append(taskFooter);

  // Add the click event listener to the task Card
  return taskElement;
};

// <------------------------ Append Task to Column ------------------------> //
const addButtons = document.querySelectorAll(".main__column-title__button");
const submitBtn = document.querySelector(".project-form__btn-save");

const appendTaskToColumn = (taskCard, columnName) => {
  // Get the appropriate column element
  const columnElement = getTaskColumn(columnName);
  const taskCardElement = createTaskElementHTML(taskCard);

  // For example, attaching the delete event listener to the delete icon
  const deleteIcon = taskCardElement.querySelector(".task__delete-icon");
  deleteIcon.addEventListener("click", () => {
    deleteTaskFromLocalStorage(taskCard.id);
    taskCardElement.remove();
    updateTaskCounters();
  });

  // Append the task element to the column
  columnElement.append(taskCardElement);
};
// <---------------------- Add Event Listener for Create and Append----------------------> //

const createNewTask = () => {
  const taskData = {
    title: "Enter Title",
    description: "Enter Description",
    tags: "#Tag #Tag2",
    priority: "low",
    taskId: new Date().getTime().toString(),
    dueDate: new Date(),
    content: "Content",
  };
  const taskCard = createTaskFromObject(taskData);

  return taskCard;
};

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const columnElement = button.closest(".main__column");
    // Get the column name from the column element's class
    const columnName = Array.from(columnElement.classList)
      .find((className) => className.startsWith("main__column--"))
      .split("--")[1]; // Updated this line to extract the correct column name

    const taskCard = createNewTask();
    appendTaskToColumn(taskCard, columnName);
  });
});

submitBtn.addEventListener("click", () => {
  const taskCard = createNewTask();
  const columnName = "";
  appendTaskToColumn(taskCard, columnName);
});
// <------------------------ Delete and Move to Trash ------------------------> //

// <------------------------ Update Task Display------------------------> //

// <------------------------ Sortable Task Column Initialization------------------------> //
