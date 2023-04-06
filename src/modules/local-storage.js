"use strict";

import { handleFormSubmit } from "./showtaskdetails";
import {} from "./showtaskdetails";


  // console.log("Tasks data:", Tasks);
// <------------------------ Save to Local Storage ------------------------> //

export const WebStorageAPI = {
  load() {
    const Tasks = localStorage.getItem("Tasks");
    // console.log("Tasks data:", Tasks);
    return JSON.parse(Tasks);
  },

  save(Tasks) {
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
  },
};

// localStorage.clear();
// <------------------------ Delete from Local Storage ------------------------> //

export const deleteTaskFromLocalStorage = (taskId) => {
  const Tasks = WebStorageAPI.load();

  Object.keys(Tasks).forEach((columnName) => {
    Tasks[columnName] = Tasks[columnName].filter(
      (task) => task.taskId !== taskId
    );
  });

  WebStorageAPI.save(Tasks);
};

// <------------------------ Update to Local Storage ------------------------> //
export const updateTasks = (columns, tasks) => {
  console.log("Before updating tasks:", JSON.stringify(tasks));

  for (const columnName in columns) {
    const columnElement = columns[columnName];
    const taskElements = columnElement.querySelectorAll(".task__container");
    const updatedTasks = [];

    taskElements.forEach((taskElement) => {
      const taskId = taskElement.dataset.taskId;

      // Search for the task in all categories
      let task = null;
      for (const key in tasks) {
        const foundTask = tasks[key].find((t) => t.taskId === taskId);
        if (foundTask) {
          task = foundTask;
          break;
        }
      }

      if (task) {
        console.log("Task found:", JSON.stringify(task));
        updatedTasks.push(task);
      } else {
        console.log("Task not found for taskId:", taskId);
      }
    });

    console.log(`Updated tasks for ${columnName}:`, JSON.stringify(updatedTasks));
    tasks[columnName] = updatedTasks;
  }

  console.log("After updating tasks:", JSON.stringify(tasks));
  WebStorageAPI.save(tasks);
};


// <------------------------ Tag Counting Feature ------------------------> //
let tagCount = {};

export const tagTracker = () => {
  let tasks = WebStorageAPI.load() || {};

  Object.keys(tasks).forEach((columnName) => {
    const taskList = tasks[columnName];
    taskList.forEach((task) => {
      const tags = task.tags.split(" #");
      tags.forEach((tag) => {
        // Remove the '#' sign from the tag
        const cleanTag = tag.replace("#", "");
        if (!tagCount[cleanTag]) {
          tagCount[cleanTag] = 0;
        }
        tagCount[cleanTag]++;
      });
    });
  });

  const sortedTagCount = Object.fromEntries(
    Object.entries(tagCount).sort((a, b) => b[1] - a[1])
  );

  return sortedTagCount;
};


export const updateTagDisplay = (sortedTagCount, maxTags = 10) => {
  const tagContainer = document.querySelector(".sidebar__tags");
  tagContainer.textContent = "";

  let displayedTags = 0;
  for (const [tag, count] of Object.entries(sortedTagCount)) {
    if (displayedTags >= maxTags) {
      break;
    }

    const tagElement = document.createElement("span");
    tagElement.classList.add("tag");
    tagElement.textContent = `${count} ${tag}`;
    tagContainer.append(tagElement);
    displayedTags++;
  }
};
