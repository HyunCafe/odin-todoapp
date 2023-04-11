"use strict";

import { createTaskFromObject } from "./modules/taskcreationclass.js";
import {
  appendTaskToColumn,
  getTaskColumn,
} from "./modules/dom-manipulation.js";
import { WebStorageAPI } from "./modules/local-storage";
import { updateTaskCounters } from "./modules/sorting";
import { tagTracker, updateTagDisplay } from "./modules/tagtracker";
import { applyFilter } from "./modules/filter-tasks";
import { getAllTasks } from "./modules/calender.js";
import { calenderDisplay } from "./modules/calender.js";
import { trashDisplay } from "./modules/trash-display.js";

const todayFilter = document.getElementById("todayFilter");
const next7DaysFilter = document.getElementById("next7DaysFilter");
const allTasksFilter = document.getElementById("allTasksFilter");

todayFilter.addEventListener("click", () => applyFilter("today"));
next7DaysFilter.addEventListener("click", () => applyFilter("next7Days"));
allTasksFilter.addEventListener("click", () => applyFilter("all"));

export const loadTasks = () => {
  const tasks = WebStorageAPI.load();

  for (const columnName in tasks) {
    const columnTasks = tasks[columnName];
    const columnElement = getTaskColumn(columnName);
    columnTasks.forEach((taskData) => {
      const task = createTaskFromObject(taskData);
      appendTaskToColumn(taskData, columnName);
    });
  }
  const sortedTagCount = tagTracker();
  updateTaskCounters();
  updateTagDisplay(sortedTagCount);

  const calendar = calenderDisplay();
  const allTasks = getAllTasks();
  calendar.renderCalendar(allTasks);
};

const calendarFilter = document.getElementById("calendarFilter");
calendarFilter.addEventListener("click", () => applyFilter("calendar"));

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  
  // Call the calenderDisplay function after loading tasks
  calenderDisplay();
});
