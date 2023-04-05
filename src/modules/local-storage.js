"use strict";

import { TaskCreation, createTaskFromObject } from "./taskcreationclass.js";
import { handleFormSubmit } from "./showtaskdetails";
import { appendTask, getTaskColumn } from "./dom-manipulation.js";
import { defaultTasks, updateTaskCounters } from "../index.js";
import { populateOffcanvasForm } from "./showtaskdetails";

// <------------------------ Save to Local Storage ------------------------> //

export const WebStorageAPI = {
  keyName: "Tasks",
  save(tasksData) {
    localStorage.setItem(this.keyName, JSON.stringify(tasksData));
  },
  load() {
    const tasksData = JSON.parse(localStorage.getItem(this.keyName)) || {
      todo: [],
      "in-progress": [],
      completed: [],
      trash: [],
    };

    return tasksData;
  },
};
// localStorage.clear()
// <------------------------ Delete from Local Storage ------------------------> //

export const deleteTaskFromLocalStorage = (taskId) => {
  const tasksData = WebStorageAPI.load();

  Object.keys(tasksData).forEach((columnName) => {
    tasksData[columnName] = tasksData[columnName].filter(
      (task) => task.taskId !== taskId
    );
  });

  WebStorageAPI.save(tasksData);
};

// <------------------------ Update to Local Storage ------------------------> //

export const updateTaskElement = (taskElement, task) => {
  // Open the offcanvas element
  const offcanvas = document.querySelector(".offcanvas");
  offcanvas.classList.add("offcanvas--open");

  // Populate the form fields with the current task data
  populateOffcanvasForm(task);

  // Set up a new form submit event listener with the current task data
  const form = document.querySelector(".project-form");
  form.removeEventListener("submit", handleFormSubmit); // Remove previous event listener
  form.addEventListener("submit", (event) =>
    handleFormSubmit(event, taskElement, task)
  );
};

// <------------------------ Tag Counting Feature ------------------------> //
let tagCount = {};

export const tagTracker = () => {
  const tasks = WebStorageAPI.load();

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
