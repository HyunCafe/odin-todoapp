"use strict";
import TaskCreation from "./modules/taskcreationclass.js";
import { appendTask } from "./modules/dom-manipulation.js";
import {
  saveCategories,
  loadCategories,
  updateCategory,
  tagTracker,
  updateTagDisplay,
} from "./modules/local-storage";
import { updateTaskCounters } from "./modules/taskcategory.js";
import { populateTasksFromLocalStorage } from "./modules/local-storage.js";
import { defaultTasks } from "./modules/default-tasks.js";

const categoryElement = document.querySelector(".main__column--todo");
const todoColumn = document.querySelector(".main__column--todo");
const inProgressColumn = document.querySelector(".main__column--in-progress");
const completedColumn = document.querySelector(".main__column--completed");
const trashColumn = document.querySelector(".main__column--trash");

let tasksData = JSON.parse(localStorage.getItem("tasks"));
if (!tasksData) {
  tasksData = {
    todo: defaultTasks,
    "in-progress": [],
    completed: [],
    trash: [],
  };
}

localStorage.setItem("tasks", JSON.stringify(tasksData));

// Load the categories from local storage and update the task counters on the page
loadCategories();
updateCategory();

const sortedTagCount = tagTracker();
updateTagDisplay(sortedTagCount, 7);

// <------------------------ to Re-Add default tasks to local storage  ------------------------> //
// defaultTasks.todo.forEach((task) => {
//   const newTask = new TaskCreation(
//     task.title,
//     task.description,
//     task.date,
//     task.tags.split(","),
//     task.priority,
//     task.add
//   );

//   appendTask(newTask, todoColumn);
// });
