import { ca } from "date-fns/locale";
import TaskCreation from "./taskcreationclass.js";
import { appendTask } from "./dom-manipulation.js";
import { defaultTasks } from "../index.js";

// <------------------------ Save to Local Storage ------------------------> //
export function saveCategories(todoColumnElement, inProgressColumnElement, completedColumnElement) {
  console.log("Saving categories...");

  const categories = [];

  // Create object for each category and add it to the "categories" array
  const todoCategory = { name: "todo", tasks: [] };
  categories.push(todoCategory);

  const inProgressCategory = { name: "inProgress", tasks: [] };
  categories.push(inProgressCategory);

  const completedCategory = { name: "completed", tasks: [] };
  categories.push(completedCategory);

  // Extract tasks from each column element
  const todoTasks = todoColumnElement.querySelectorAll(".task__container:not(.no-drag)");
  const inProgressTasks = inProgressColumnElement.querySelectorAll(".task__container:not(.no-drag)");
  const completedTasks = completedColumnElement.querySelectorAll(".task__container:not(.no-drag)");

  // Loop through tasks in each column and add them to the appropriate category's tasks array
  todoTasks.forEach((taskContainer) => {
    const task = extractTaskFromElement(taskContainer);
    todoCategory.tasks.push(task);
  });

  inProgressTasks.forEach((taskContainer) => {
    const task = extractTaskFromElement(taskContainer);
    inProgressCategory.tasks.push(task);
  });

  completedTasks.forEach((taskContainer) => {
    const task = extractTaskFromElement(taskContainer);
    completedCategory.tasks.push(task);
  });

  // Save the "categories" array to local storage
  localStorage.setItem("categories", JSON.stringify(categories));
}

function extractTaskFromElement(taskContainer) {
  const taskTitle = taskContainer.querySelector(".task__title").textContent;
  const taskDescription = taskContainer.querySelector(".task__description").textContent;
  const taskDate = taskContainer.querySelector(".task__created-date").textContent;
  const taskTags = taskContainer.querySelector(".task__tags").textContent;
  const taskPriority = taskContainer.querySelector(".task__priority");
  const taskAdd = false;
  const taskCompleted = taskContainer.classList.contains("task__container--completed");
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
export function loadCategories() {}

// <------------------------ Update to Local Storage ------------------------> //

export function updateCategory(category, index) {}

