"use strict";

import {
  TaskCreation,
  createTaskFromObject,
} from "./modules/taskcreationclass.js";
import { appendTask, appendTaskToColumn } from "./modules/dom-manipulation.js";
import {
  tagTracker,
  updateTagDisplay,
  WebStorageAPI,
} from "./modules/local-storage";
import { defaultTasks } from "./modules/default-tasks.js";
import { updateTaskCounters } from "./modules/taskcategory"

// Get the To-Do column element
const todoColumn = document.querySelector(".main__column--todo");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("Tasks"));

// If there are no tasks in local storage, use default tasks
if (!tasks) {
  tasks = defaultTasks;
  localStorage.setItem("Tasks", JSON.stringify(tasks));
}

// Function to load and display tasks from local storage
export const loadTasks = () => {
  const tasks = WebStorageAPI.load();

  // Iterate over the tasks object and create the task elements
  Object.keys(tasks).forEach((columnName) => {
    const taskList = tasks[columnName];

    taskList.forEach((taskData) => {
      const taskCard = createTaskFromObject(taskData);
      appendTaskToColumn(taskCard, columnName);
    });
  });
};

// Update tag display based on tag count
const sortedTagCount = tagTracker();
updateTagDisplay(sortedTagCount, 7);

// Load tasks when the application starts
loadTasks();
updateTaskCounters();
