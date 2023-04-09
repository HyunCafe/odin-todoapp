"use strict";
import Sortable from "sortablejs";
import { WebStorageAPI, updateTasks } from "./local-storage";
import { loadTasks } from "../index";
import { getTaskDataById } from "./expanded-card-details";
import { markTaskAsCompleted } from "./dom-manipulation";


let tasks = WebStorageAPI.load();

export const columns = {
  todo: document.querySelector(".main__column--todo"),
  "in-progress": document.querySelector(".main__column--in-progress"),
  completed: document.querySelector(".main__column--completed"),
};

const columnsCount = {
  todoCount: document.querySelector(".main__column-title__taskcount--todo"),
  inProgressCount: document.querySelector(
    ".main__column-title__taskcount--inprogress"
  ),
  completedCount: document.querySelector(
    ".main__column-title__taskcount--completed"
  ),
};

const sortableOptions = {
  group: "shared",
  onEnd: (e) => {
    const taskId = e.item.getAttribute("data-id");
    const taskData = getTaskDataById(taskId);
    const newColumnName = e.to.getAttribute("data-column-name");
    const isMovedToCompleted = newColumnName === "completed";

    taskData.isCompleted = isMovedToCompleted;
    e.item.setAttribute("data-completed", isMovedToCompleted ? "true" : "false");

    // Call markTaskAsCompleted here
    console.log("Task ID from sortableOptions:", taskId);
    markTaskAsCompleted(e.item, taskId);

    updateTaskCounters();

    // Save the updated tasks to the local storage
    tasks = updateTasks(columns);
    WebStorageAPI.save(updateTasks(columns));

  },
  draggable: ".task__container:not(.no-drag)",
};


const sortableColumns = Object.entries(columns).reduce((acc, [key, value]) => {
  acc[key] = new Sortable(value, sortableOptions);
  return acc;
}, {});

export const updateTaskCounters = () => {
  const columnKeys = Object.keys(columns);
  const columnCountMap = {
    todo: "todoCount",
    "in-progress": "inProgressCount",
    completed: "completedCount",
  };

  columnKeys.forEach((column) => {
    const taskCount =
      columns[column].querySelectorAll(".task__container").length;
    const columnCountKey = columnCountMap[column];
    columnsCount[columnCountKey].textContent = taskCount;
  });
};
