"use strict";

import { isValid, formatDistance, parseISO } from "date-fns";
import { WebStorageAPI, deleteTaskFromLocalStorage } from "./local-storage";
import { updateTaskCounters } from "./taskcategory.js";

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
function createTaskElement(taskCard) {
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
}

// <------------------------ Append Task to Column ------------------------> //
const handleTaskDragEnd = (taskElement, categoryElement, columnName) => {
  const completedColumn = document.querySelector(".main__column--completed");
  const trashColumn = document.querySelector(".main__column--trash");
  const taskContainer = taskElement.closest(".task__container");
  const isInCompletedColumn = completedColumn.contains(taskContainer);

  if (isInCompletedColumn) {
    taskContainer.classList.add("task--completed");
  } else if (
    !completedColumn.contains(taskContainer) &&
    !trashColumn.contains(taskContainer)
  ) {
    taskContainer.classList.remove("task--completed");
  }

  // Update the Tasks in memory
  const Tasks = WebStorageAPI.load();
  Tasks[columnName] = Array.from(categoryElement.children).map(
    (element) => element.__data
  );

  // Save the updated Tasks to local storage
  WebStorageAPI.save(Tasks);
};

export const appendTask = (task, categoryElement, callback) => {
  const taskElement = createTaskElement(task);
  const deleteIcon = taskElement.querySelector(".task__delete-icon");
  addDeleteIconEventListener(deleteIcon, taskElement);

  // Assign border color based on priority level
  if (task.priority === "Urgent") {
    taskElement.classList.add("task--urgent");
  } else if (task.priority === "High") {
    taskElement.classList.add("task--high");
  } else if (task.priority === "completed") {
    taskElement.classList.add("task--completed");
  } else {
    taskElement.classList.add("task--low");
  }

  taskElement.__data = task;
  categoryElement.append(taskElement);

  if (callback && typeof callback === "function") {
    callback(taskElement);
  }

  // Update the Tasks for the current category
  const Tasks = WebStorageAPI.load();
  const columnName = categoryElement.dataset.columnName;
  console.log("Before push to Tasks:", Tasks);

  // Check if the task with the same taskId already exists in the Tasks object
  if (!Tasks[columnName].find((t) => t.taskId === task.taskId)) {
    Tasks[columnName].push(task);

    // Save the updated Tasks to local storage
    WebStorageAPI.save(Tasks);
  }

  // Add an event listener to the task element for the Complete Color Code
  taskElement.addEventListener("dragend", () =>
    handleTaskDragEnd(taskElement, categoryElement, columnName)
  );
};

// <------------------------ Delete and Move to Trash ------------------------> //
function addDeleteIconEventListener(deleteIcon, taskElement) {
  deleteIcon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent triggering the taskElement click event

    // Load tasks from local storage, parse them into an object
    const Tasks = JSON.parse(localStorage.getItem("Tasks"));
    const taskId = taskElement.dataset.taskId;
    const currentColumn =
      taskElement.closest(".main__column").dataset.columnName;

    // Find the task in the Tasks object
    const taskIndex = Tasks[currentColumn].findIndex(
      (task) => task.taskId === taskId
    );

    // Remove the task from its current column
    const task = Tasks[currentColumn].splice(taskIndex, 1)[0];
    removeTaskFromDisplay(taskElement);

    // Move the task to the Trash column if it's not already there
    const trashColumn = document.querySelector(".main__column--trash");
    if (currentColumn !== "trash") {
      appendTask(task, trashColumn, (newTaskElement) => {
        // Re-apply the saved taskId to the taskElement in the trash column
        newTaskElement.dataset.taskId = taskId;

        // Copy the classes from the original task element
        newTaskElement.className = taskElement.className;
      });
    }
    WebStorageAPI.save(Tasks);

    // Update the Tasks object and save it back to local storage
    localStorage.setItem("Tasks", JSON.stringify(Tasks));

    updateTaskCounters(Tasks);
  });
}

// <------------------------ Update Task Display------------------------> //

const removeTaskFromDisplay = (taskElement) => {
  const taskId = taskElement.getAttribute("data-task-id");
  taskElement.remove();
  deleteTaskFromLocalStorage(taskId);
};

// <------------------------ Sortable Task Column Initialization------------------------> //
document.addEventListener("DOMContentLoaded", () => {
  const Tasks = WebStorageAPI.load();

  Object.entries(Tasks).forEach(([columnName, tasks]) => {
    tasks.forEach((task) => {
      appendTask(task, getTaskColumn(columnName));
    });
  });
});
