"use strict";
import {
  TaskCreation,
  createTaskFromObject,
} from "./modules/taskcreationclass.js";
import { appendTask } from "./modules/dom-manipulation.js";
import { tagTracker, updateTagDisplay, WebStorageAPI } from "./modules/local-storage";
import { defaultTasks } from "./modules/default-tasks.js";

const todoColumn = document.querySelector(".main__column--todo");

let Tasks = JSON.parse(localStorage.getItem("Tasks"));
// if (!Tasks) {
//   Tasks = {
//     todo: defaultTasks,
//     "in-progress": [],
//     completed: [],
//     trash: [],
//   };
// }

localStorage.setItem("Tasks", JSON.stringify(Tasks));

// Load the categories from local storage and update the task counters on the page

const sortedTagCount = tagTracker();
updateTagDisplay(sortedTagCount, 7);

