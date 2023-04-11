"use strict";

import { defaultTasks } from "./default-tasks";

let columns;

export const getColumns = () => {
  if (columns) {
    return columns;
  }

  const mainContainer = document.querySelector(".main");
  const trashContainer = document.querySelector(".trash-popup__column");
  const columnElements = mainContainer.querySelectorAll(".main__column");
  columns = {};

  columnElements.forEach((column) => {
    const columnName = column.dataset.columnName;
    columns[columnName] = column;
  });

  // Add the trash column separately
  columns.trash = trashContainer;

  // // Log the call stack to see where getColumns() is called from
  // console.trace('getColumns() called');

  return columns;
};

// <------------------------ Save to Local Storage ------------------------> //
const LOCAL_STORAGE_KEY = "KanbanBoard";

export const WebStorageAPI = {
  load() {
    const kanbanBoard = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!kanbanBoard) {
      return defaultTasks;
    }
    return JSON.parse(kanbanBoard);
  },

  save(kanbanBoard) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(kanbanBoard));
  },
};

// localStorage.clear(); reset the board

// <------------------------ Update to Local Storage ------------------------> //
export const updateTasks = () => {
  const columns = getColumns();
  const tasks = { todo: [], "in-progress": [], completed: [], trash: [] };
  Object.entries(columns).forEach(([columnKey, column]) => {
    const taskElements = column.querySelectorAll(".task__container");
    tasks[columnKey] = Array.from(taskElements).map((taskElement) => {
      const dataPriority = taskElement.dataset.priority;
      return {
        taskId: taskElement.dataset.id,
        title: taskElement.querySelector(".task__title").textContent,
        description:
          taskElement.querySelector(".task__description").textContent,
        dueDate: new Date(
          taskElement.querySelector(".task__due-date").dataset.dueDate
        ),
        tags: taskElement.querySelector(".task__tags").textContent,
        priority: taskElement.__data.priority,
        dataPriority: dataPriority,
        completed: taskElement.classList.contains("task__container--completed"),
      };
    });
  });
  return tasks;
};
