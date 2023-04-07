"use strict";

import { isValid, formatDistance, parseISO } from "date-fns";
import {
  WebStorageAPI,
  deleteTaskFromLocalStorage,
  updateTasks,
} from "./local-storage";
import { columns } from "./sorting";
import { createTaskFromObject } from "./taskcreationclass";
import { tagTracker, updateTagDisplay } from "./tagtracker";
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
  taskElement.classList.add("task__container");
  taskElement.setAttribute("data-task-id", taskCard.id);

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task__header");

  const taskTitle = document.createElement("h4");
  taskTitle.classList.add("task__title");
  taskTitle.textContent = taskCard.title;

  const taskPriority = document.createElement("span");
  taskElement.setAttribute("data-priority", taskCard.priority);

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

  const formattedDueDate = formatDistance(taskCard.dueDate, new Date(), {
    addSuffix: true,
  });
  taskDueDate.textContent = `Due: ${formattedDueDate}`;
  taskDueDate.setAttribute("data-due-date", taskCard.dueDate);

  taskHeader.append(taskTitle);
  taskHeader.append(deleteIcon);
  taskElement.append(taskHeader);
  taskElement.append(taskDescription);
  taskFooter.append(taskDueDate);
  taskFooter.append(taskTags);
  taskFooter.append(taskPriority);
  taskElement.append(taskFooter);

  return taskElement;
};

// <------------------------ Append Task to Column ------------------------> //
const addButtons = document.querySelectorAll(".main__column-title__button");
const submitBtn = document.querySelector(".project-form__btn-save");

export const appendTaskToColumn = (taskCard, columnName) => {
  const columnElement = getTaskColumn(columnName);
  const taskCardElement = createTaskElementHTML(taskCard);

  // Assign border color based on priority level
  if (taskCard.priority === "Urgent") {
    taskCardElement.classList.add("task--urgent");
  } else if (taskCard.priority === "High") {
    taskCardElement.classList.add("task--high");
  } else if (taskCard.priority === "completed") {
    taskCardElement.classList.add("task--completed");
  } else {
    taskCardElement.classList.add("task--low");
  }

  // Add an event listener to the task element for Complete Color Code
  taskCardElement.addEventListener("dragend", (event) => {
    const taskContainer = event.target.closest(".task__container");
    markTaskAsCompleted(taskContainer);
  });

  taskCardElement.__data = taskCard;
  // attaching the delete event listener to the delete icon
  const deleteIcon = taskCardElement.querySelector(".task__delete-icon");
  deleteIcon.addEventListener("click", () => {
    deleteTaskFromLocalStorage(taskCard.id);
    taskCardElement.remove();
    updateTaskCounters();
  });
  columnElement.append(taskCardElement);
};

addButtons.forEach((button) => {
  let tasks = WebStorageAPI.load();
  button.addEventListener("click", () => {
    const columnElement = button.closest(".main__column");
    const columnName = Array.from(columnElement.classList)
      .find((className) => className.startsWith("main__column--"))
      .split("--")[1];
    const taskCard = createNewTask({});

    // Append the task card to the column
    appendTaskToColumn(taskCard, columnName);
    const sortedTagCount = tagTracker();
    updateTagDisplay(sortedTagCount);
    tasks = updateTasks(columns);
    WebStorageAPI.save(tasks);
  });
});

// <------------------------ Mark as Completed Logic------------------------> //

const markTaskAsCompleted = (taskContainer) => {
  const completedColumn = document.querySelector(".main__column--completed");
  const isInCompletedColumn = completedColumn.contains(taskContainer);

  if (isInCompletedColumn) {
    taskContainer.classList.add("task--completed");
  } else {
    taskContainer.classList.remove("task--completed");
  }
};

// <---------------------- Add Event Listener for Create and Append----------------------> //

const createNewTask = (taskData) => {
  const defaultTaskData = {
    title: "Enter Title",
    description: "Enter Description",
    tags: "#Tag #Tag2",
    priority: "low",
    taskId: new Date().getTime().toString(),
    dueDate: new Date(),
    content: "Content",
  };

  const task = { ...defaultTaskData, ...taskData };

  const taskCard = createTaskFromObject(task);

  return taskCard;
};

// <------------------------ Delete and Move to Trash ------------------------> //


