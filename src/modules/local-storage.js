import TaskCreation from "./taskcreationclass.js";
import { appendTask, getTaskColumn } from "./dom-manipulation.js";
import { defaultTasks, updateTaskCounters } from "../index.js";

// <------------------------ Save to Local Storage ------------------------> //
export function saveCategories(
  todoColumnElement,
  inProgressColumnElement,
  completedColumnElement
) {

  const columns = [todoColumnElement, inProgressColumnElement, completedColumnElement];
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
      const priority = taskElement.classList.contains("task--urgent")
        ? "Urgent"
        : taskElement.classList.contains("task--high")
        ? "High"
        : "Low";

      tasks.push({ taskId, title, description, tags, createdDate, priority });
    });

    tasksData[columnName] = tasks;
  });

  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

// <------------------------ Load from Local Storage ------------------------> //
export function loadCategories() {
  const tasksData = JSON.parse(localStorage.getItem("tasks")) || {};

  return tasksData;
}

export function populateTasksFromLocalStorage() {
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
          appendTask(taskObj, getTaskColumn(columnName));
        });
      }
    });
  }
}

// <------------------------ Delete from Local Storage ------------------------> //

export function deleteTaskFromLocalStorage(taskId) {
  const categories = loadCategories();

  Object.keys(categories).forEach((category) => {
    categories[category] = categories[category].filter(
      (task) => task.taskId !== taskId
    );
  });

  localStorage.setItem("tasks", JSON.stringify(categories));
}

// <------------------------ Update to Local Storage ------------------------> //

export function updateCategory(todoColumnElement, inProgressColumnElement, completedColumnElement, taskId) {

}
