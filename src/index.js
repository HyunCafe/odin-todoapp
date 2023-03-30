"use strict";
import TaskCreation from "./modules/taskcreationclass.js";
import { appendTask } from "./modules/dom-manipulation.js";
import {
  saveCategories,
  loadCategories,
  updateCategory,
} from "./modules/local-storage";
import { updateTaskCounters } from "./modules/taskcategory.js";
import { populateTasksFromLocalStorage } from "./modules/local-storage.js";

const categoryElement = document.querySelector(".main__column--todo");

export const defaultTasks = {
  todo: [
    {
      title: "Learn a new programming language",
      description:
        "Choose a programming language and start learning its syntax and best practices.",
      date: "2022-12-31",
      tags: "#learning #self-improvement",
      priority: "Low",
      add: true,
    },
    {
      title: "Finish building a to-do app",
      description:
        "Complete the final touches on the to-do app, such as adding a due date feature or enabling drag and drop functionality.",
      date: "2022-11-30",
      tags: "#project #organization",
      priority: "Urgent",
      add: true,
    },
    {
      title: "Read a programming book",
      description:
        "Choose a programming book and aim to read at least one chapter per day.",
      date: "2022-12-15",
      tags: "#reading #self-improvement",
      priority: "High",
      add: true,
    },
    {
      title: "Contribute to an open source project",
      description:
        "Find an open source project that interests you and make a contribution, such as fixing a bug or implementing a new feature.",
      date: "2022-11-01",
      tags: "#open-source #contribution",
      priority: "High",
      add: true,
    },
  ],
  "in-progress": [],
  completed: [],
};


const todoColumn = document.querySelector(".main__column--todo");
const inProgressColumn = document.querySelector(".main__column--in-progress");
const completedColumn = document.querySelector(".main__column--completed");


// To re add the default tasks
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

let tasksData = JSON.parse(localStorage.getItem("tasks"));
if (!tasksData) {
  tasksData = {
    todo: defaultTasks,
    "in-progress": [],
    completed: [],
  };
}

console.log("Tasks data before saving:", tasksData);

localStorage.setItem("tasks", JSON.stringify(tasksData));

// Load the categories from local storage and update the task counters on the page
loadCategories();
updateCategory();