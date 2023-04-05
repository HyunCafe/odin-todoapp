"use strict";
import {
  TaskCreation,
  createTaskFromObject,
} from "./modules/taskcreationclass.js";
import { appendTask } from "./modules/dom-manipulation.js";
import { tagTracker, updateTagDisplay } from "./modules/local-storage";
import { defaultTasks } from "./modules/default-tasks.js";

const todoColumn = document.querySelector(".main__column--todo");

let tasksData = JSON.parse(localStorage.getItem("Tasks"));
if (!tasksData) {
  tasksData = {
    todo: defaultTasks,
    "in-progress": [],
    completed: [],
    trash: [],
  };
}

localStorage.setItem("Tasks", JSON.stringify(tasksData));

// Load the categories from local storage and update the task counters on the page

const sortedTagCount = tagTracker();
updateTagDisplay(sortedTagCount, 7);

// <------------------------ to Re-Add default tasks to local storage  ------------------------> //
defaultTasks.todo.forEach((task) => {
  const newTask = createTaskFromObject(task);
  appendTask(newTask, todoColumn);
});
