"use strict";

import {
  TaskCreation,
  createTaskFromObject,
} from "./modules/taskcreationclass.js";
import { appendTask, appendTaskToColumn, getTaskColumn } from "./modules/dom-manipulation.js";
import {
  tagTracker,
  updateTagDisplay,
  WebStorageAPI,
} from "./modules/local-storage";
import { defaultTasks } from "./modules/default-tasks.js";
import { updateTaskCounters } from "./modules/sorting"


export const loadTasks = () => {
  const tasks = WebStorageAPI.load();
  for (const columnName in tasks) {
    const columnTasks = tasks[columnName];
    const columnElement = getTaskColumn(columnName);
    columnTasks.forEach((taskData) => {
      const task = createTaskFromObject(taskData);
      appendTaskToColumn(task, columnName);
    });
  }
};
document.addEventListener("DOMContentLoaded", loadTasks);
