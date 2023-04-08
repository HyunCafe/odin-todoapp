"use strict";



// <------------------------ Save to Local Storage ------------------------> //

export const WebStorageAPI = {
  load() {
    const kanbanBoard = localStorage.getItem("KanbanBoard");
    return JSON.parse(kanbanBoard);
  },

  save(kanbanBoard) {
    localStorage.setItem("KanbanBoard", JSON.stringify(kanbanBoard));
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
        isCompleted: taskElement.__data.isCompleted,
      };
    });
  });
  return tasks;
};

// <------------------------ Tag Counting Feature ------------------------> //
