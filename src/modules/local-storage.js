"use strict";

import TaskCreation from "./taskcreationclass.js";
import { appendTask, getTaskColumn } from "./dom-manipulation.js";
import { defaultTasks, updateTaskCounters } from "../index.js";

// <------------------------ Save to Local Storage ------------------------> //
export const saveCategories = (
  todoColumnElement,
  inProgressColumnElement,
  completedColumnElement
) => {
  const columns = [
    todoColumnElement,
    inProgressColumnElement,
    completedColumnElement,
  ];
  const tasksData = {};

  columns.forEach((column) => {
    const columnName = column.dataset.columnName;
    const taskElements = column.querySelectorAll(".task__container");
    const tasks = [];

    taskElements.forEach((taskElement) => {
      const taskId = taskElement.dataset.taskId;
      const title = taskElement.querySelector(".task__title").textContent;
      const description =
        taskElement.querySelector(".task__description").textContent;
      const tags = taskElement.querySelector(".task__tags").textContent;
      const createdDate = taskElement.querySelector(
        ".task__created-date"
      ).textContent;
      const priority = taskElement.classList.contains("task--completed")
        ? "task--completed"
        : taskElement.classList.contains("task--urgent")
        ? "Urgent"
        : taskElement.classList.contains("task--high")
        ? "High"
        : "Low";
      const classList = [...taskElement.classList];

      tasks.push({
        taskId,
        title,
        description,
        tags,
        createdDate,
        priority,
        taskClasses: Array.from(taskElement.classList),
      });
    });

    tasksData[columnName] = tasks;
  });

  localStorage.setItem("tasks", JSON.stringify(tasksData));
};

// <------------------------ Load from Local Storage ------------------------> //
export function loadCategories() {
  const tasksData = JSON.parse(localStorage.getItem("tasks")) || {};

  return tasksData;
}

export const populateTasksFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    Object.keys(tasks).forEach((columnName) => {
      const taskList = tasks[columnName];
      if (Array.isArray(taskList)) {
        taskList.forEach((task) => {
          const taskObj = new TaskCreation(
            task.title,
            task.description,
            task.createdDate,
            task.tags,
            task.priority
          );
          const columnElement = getTaskColumn(columnName);
          appendTask(taskObj, columnElement, (taskElement) => {
            // Apply saved class names to the task container
            taskElement.className = "";
            task.taskClasses.forEach((cls) => taskElement.classList.add(cls));
          });
        });
      }
    });
  }
};

// <------------------------ Delete from Local Storage ------------------------> //

export const deleteTaskFromLocalStorage = (taskId) => {
  const categories = loadCategories();

  Object.keys(categories).forEach((category) => {
    categories[category] = categories[category].filter(
      (task) => task.taskId !== taskId
    );
  });

  localStorage.setItem("tasks", JSON.stringify(categories));
};

// <------------------------ Update to Local Storage ------------------------> //

export function updateCategory(
  todoColumnElement,
  inProgressColumnElement,
  completedColumnElement,
  taskId
) {}

// <------------------------ Tag Counting Feature ------------------------> //
let tagCount = {};

export const tagTracker = () => {
  const categories = loadCategories();
  Object.keys(categories).forEach((columnName) => {
    const taskList = categories[columnName];
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
