"use strict";

import {
  createTaskFromObject,
} from "./modules/taskcreationclass.js";
import { appendTaskToColumn, getTaskColumn } from "./modules/dom-manipulation.js";
import {
  WebStorageAPI,
} from "./modules/local-storage";
import { updateTaskCounters } from "./modules/sorting"
import { tagTracker, updateTagDisplay } from "./modules/tagtracker";


export const loadTasks = () => {
  const tasks = WebStorageAPI.load();
  console.log("Tasks in trash column:", tasks.trash);

  for (const columnName in tasks) {
    const columnTasks = tasks[columnName];
    // console.log(`Loading column: ${columnName}`);
    const columnElement = getTaskColumn(columnName);
    columnTasks.forEach((taskData) => {
      const task = createTaskFromObject(taskData);
      // console.log(`Appending task to ${columnName} column:`, taskData);
      appendTaskToColumn(taskData, columnName);
    });
  }
  const sortedTagCount = tagTracker();
  updateTaskCounters();
  updateTagDisplay(sortedTagCount);
};


document.addEventListener("DOMContentLoaded", loadTasks);
