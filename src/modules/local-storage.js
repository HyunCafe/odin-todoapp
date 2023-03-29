import { ca } from "date-fns/locale";
import TaskCreation from "./taskcreationclass.js";
import { appendTask } from "./dom-manipulation.js";
import { defaultTasks } from "../index.js";

// <------------------------ Save to Local Storage ------------------------> //
export function saveCategories(todoColumnElement, inProgressColumnElement, completedColumnElement) {
  const columns = document.querySelectorAll(".main__column");
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
      const priority = taskElement.className.includes("task--urgent")
        ? "Urgent"
        : taskElement.className.includes("task--high")
        ? "High"
        : "Low";

      tasks.push({ taskId, title, description, tags, createdDate, priority });
    });

    tasksData[columnName] = tasks;
  });

  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

function extractTaskFromElement(taskContainer) {
  const taskTitle = taskContainer.querySelector(".task__title").textContent;
  const taskDescription =
    taskContainer.querySelector(".task__description").textContent;
  const taskDate = new Date(
    Date.parse(taskContainer.querySelector(".task__created-date").textContent)
  );
  const taskTags = taskContainer.querySelector(".task__tags").textContent;
  const taskPriority = taskContainer.querySelector(".task__priority");
  const taskAdd = false;
  const taskCompleted = taskContainer.classList.contains(
    "task__container--completed"
  );
  const taskContent = taskContainer.querySelector(".task__content");

  const task = new TaskCreation(
    taskTitle,
    taskDescription,
    taskDate,
    taskTags,
    taskPriority,
    taskAdd,
    taskCompleted,
    taskContent
  );
  return task;
}

// <------------------------ Load to Local Storage ------------------------> //
export function loadCategories(categoryElement) {
  const tasksData = JSON.parse(localStorage.getItem("tasks")) || {};

  Object.keys(tasksData).forEach((columnName) => {
    const categoryElement = document.querySelector(
      `.main__column--${columnName}`
    );
    const tasks = tasksData[columnName];

    tasks.forEach((task) => {
      const taskObj = new TaskCreation(
        task.title,
        task.description,
        task.createdDate,
        task.tags,
        task.priority
      );
      appendTask(taskObj, categoryElement);
    });
  });
}

// <------------------------ Update to Local Storage ------------------------> //

export function updateCategory(category, index) {}
