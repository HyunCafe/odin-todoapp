"use strict";
import Sortable from "sortablejs";
import { WebStorageAPI, updateTasks } from "./local-storage";

 const columns = {
  "todo": document.querySelector(".main__column--todo"),
  "in-progress": document.querySelector(".main__column--in-progress"),
  "completed": document.querySelector(".main__column--completed")
};

const columnsCount = {
  'todoCount': document.querySelector('.main__column-title__taskcount--todo'),
  'inProgressCount': document.querySelector('.main__column-title__taskcount--inprogress'),
  'completedCount': document.querySelector('.main__column-title__taskcount--completed')
};

let tasks = WebStorageAPI.load();

const sortableOptions = {
  group: "shared",
  onEnd: (evt) => {
    updateTasks(columns, tasks);
    updateTaskCounters();
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
    'todo': 'todoCount',
    'in-progress': 'inProgressCount',
    'completed': 'completedCount',
  };

  columnKeys.forEach(column => {
    const taskCount = columns[column].querySelectorAll(".task__container").length;
    const columnCountKey = columnCountMap[column];
    columnsCount[columnCountKey].textContent = taskCount;
  });
};
