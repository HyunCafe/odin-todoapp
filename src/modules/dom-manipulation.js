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

export const appendTaskToColumn = (taskCard, columnName) => {
  // Get the appropriate column element
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
  // console.log(task.taskId);

  const taskCard = createTaskFromObject(task);

  return taskCard;
};

// Load tasks from local storage when the application starts
let tasks = WebStorageAPI.load();

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const columnElement = button.closest(".main__column");
    const columnName = Array.from(columnElement.classList)
      .find((className) => className.startsWith("main__column--"))
      .split("--")[1];

    const taskCard = createNewTask({}); // Create a new empty task card

    // Append the task card to the column
    appendTaskToColumn(taskCard, columnName);
    WebStorageAPI.save(tasks);
  });
});

submitBtn.addEventListener("click", () => {
  const taskCard = createNewTask();
  const columnName = "";
  appendTaskToColumn(taskCard, columnName);
  WebStorageAPI.save(tasks);
});

// <------------------------ Delete and Move to Trash ------------------------> //
function addDeleteIconEventListener(deleteIcon, taskElement) {
  deleteIcon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent triggering the taskElement click event

    // Load tasks from local storage, parse them into an object
    let tasksData = JSON.parse(localStorage.getItem("tasks"));
    const taskId = taskElement.dataset.taskId;
    const currentColumn =
      taskElement.closest(".main__column").dataset.columnName;

    // Find the task in the tasksData object
    const taskIndex = tasksData[currentColumn].findIndex(
      (task) => task.taskId === taskId
    );

    // If the task is in the Trash column, remove it from tasksData object and local storage
    if (currentColumn === "trash") {
      tasksData[currentColumn].splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(tasksData));
      removeTaskFromDisplay(taskElement);
    } else {
      // Remove the task from its current column and move it to the Trash column
      const task = tasksData[currentColumn].splice(taskIndex, 1)[0];
      const trashColumn = document.querySelector(".main__column--trash");
      appendTask(task, trashColumn, (newTaskElement) => {
        newTaskElement.dataset.taskId = taskId;
        newTaskElement.className = taskElement.className;
      });
      saveCategories();
      updateTaskCounters();

      // Save the updated tasksData object to local storage
      localStorage.setItem("tasks", JSON.stringify(tasksData));
      removeTaskFromDisplay(taskElement);
    }
  });
}

// <------------------------ Update Task Display------------------------> //

// <------------------------ Sortable Task Column Initialization------------------------> //
