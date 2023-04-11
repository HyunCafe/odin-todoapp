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
  const tasksView = document.getElementById("tasks-view"); 
<<<<<<< HEAD
  const calendarView = document.getElementById("calendar-view"); 
  let tasksToDisplay;

  if (filter === "calendar") {
    tasksView.style.display = "none";
    calendarView.style.display = "block";
    const calendar = calenderDisplay();
    const allTasks = getAllTasks();
    calendar.renderCalendar(allTasks);
    return; 
=======
  const calendarView = document.getElementById("calendar-view");
  let tasksToDisplay;

  if (filter === "calendar") {
    tasksView.style.display = "none"; 
    calendarView.style.display = "block"; 
    const calendar = calenderDisplay();
    const allTasks = getAllTasks();
    calendar.renderCalendar(allTasks);
    return; // Exit the function, as the calendar view has been handled
>>>>>>> f9bbc1e (Feat: Added calender logic and some basic styling)
  } else {
    tasksView.style.display = "block"; 
    calendarView.style.display = "none"; 

    if (filter === "all") {
<<<<<<< HEAD
      tasksToDisplay = WebStorageAPI.load();
    } else {
      tasksToDisplay = filterTasksByDueDate(filter); 
=======
      tasksToDisplay = WebStorageAPI.load(); // Load all tasks from local storage
    } else {
      tasksToDisplay = filterTasksByDueDate(filter); // Filter tasks based on the due date
>>>>>>> f9bbc1e (Feat: Added calender logic and some basic styling)
    }
  }
  
  updateTaskDisplay(tasksToDisplay);
  updateTaskCounters(); 
<<<<<<< HEAD
};
=======
};
>>>>>>> f9bbc1e (Feat: Added calender logic and some basic styling)
