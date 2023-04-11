"use strict";

import { calenderDisplay } from "./calender";
import { WebStorageAPI } from "./local-storage";
import { updateTaskDisplay } from "./dom-manipulation";
import { updateTaskCounters } from "./sorting";

export const filterTasksByDueDate = (dateFilter) => {
  const allTasks = WebStorageAPI.load();
  const filteredTasks = {};

  for (const columnName in allTasks) {
    if (columnName === "trash") continue;

    filteredTasks[columnName] = allTasks[columnName].filter((task) => {
      const dueDate = new Date(task.dueDate);
      const currentDate = new Date();
      const weekAhead = new Date();
      weekAhead.setDate(weekAhead.getDate() + 7);

      if (dateFilter === "today") {
        return dueDate <= currentDate;
      } else if (dateFilter === "next7Days") {
        return dueDate <= weekAhead;
      } else {
        return true;
      }
    });
  }

  return filteredTasks;
};

export const applyFilter = (filter) => {
  const tasksView = document.getElementById("tasks-view"); // Get the tasks view element
  const calendarView = document.getElementById("calendar-view"); // Get the calendar view element
  let tasksToDisplay;

  if (filter === "calendar") {
    tasksView.style.display = "none"; // Hide the tasks view
    calendarView.style.display = "block"; // Show the calendar view
    const calendar = calenderDisplay();
    const allTasks = getAllTasks();
    calendar.renderCalendar(allTasks);
    return; // Exit the function, as the calendar view has been handled
  } else {
    tasksView.style.display = "block"; // Show the tasks view
    calendarView.style.display = "none"; // Hide the calendar view

    if (filter === "all") {
      tasksToDisplay = WebStorageAPI.load(); // Load all tasks from local storage
    } else {
      tasksToDisplay = filterTasksByDueDate(filter); // Filter tasks based on the due date
    }
  }
  
  updateTaskDisplay(tasksToDisplay);
  updateTaskCounters(); // Update task counters after updating the task display
};
