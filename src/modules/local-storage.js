"use strict";

const LOCAL_STORAGE_KEY = "KanbanBoard";

// <------------------------ Save to Local Storage ------------------------> //

export const WebStorageAPI = {
  load() {
    const kanbanBoard = localStorage.getItem(LOCAL_STORAGE_KEY);

    return JSON.parse(kanbanBoard);
  },

  save(kanbanBoard) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(kanbanBoard));

  },
};
WebStorageAPI.load();
// localStorage.clear();
// <------------------------ Delete from Local Storage ------------------------> //

// <------------------------ Update to Local Storage ------------------------> //
export const updateTasks = (columns) => {
  const tasks = { todo: [], "in-progress": [], completed: [], trash: [] };
  Object.entries(columns).forEach(([columnKey, column]) => {
    const taskElements = column.querySelectorAll(".task__container");
    tasks[columnKey] = Array.from(taskElements).map((taskElement) => {
      const dataPriority = taskElement.dataset.priority;
      return {
        taskId: taskElement.dataset.id,
        title: taskElement.querySelector(".task__title").textContent,
        description: taskElement.querySelector(".task__description").textContent,
        dueDate: new Date(taskElement.querySelector(".task__due-date").dataset.dueDate),
        tags: taskElement.querySelector(".task__tags").textContent,
        priority: taskElement.__data.priority,
        dataPriority: dataPriority,
        completed: taskElement.classList.contains("task__container--completed"),
      }
    });
  });
  return tasks;
};
