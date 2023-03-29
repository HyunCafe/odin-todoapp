import { ca } from "date-fns/locale";
import TaskCreation from "./taskcreationclass.js";
import { appendTask } from "./dom-manipulation.js";
import { defaultTasks } from "../index.js";

// <------------------------ Save to Local Storage ------------------------> //
export function saveCategories(todoColumn, inProgressColumn, completedColumn) {

  const categories = [];

  // Create object for each category and add it to the "categories" array
  const todoCategory = { name: "todo", tasks: defaultTasks };
  categories.push(todoCategory);
  

  const inProgressCategory = { name: "inProgress", tasks: [] };
  categories.push(inProgressCategory);

  const completedCategory = { name: "completed", tasks: [] };
  categories.push(completedCategory);

  // Loop through each task container and add it to the appropriate category's tasks array
  const taskContainers = document.querySelectorAll(
    ".task__container:not(.no-drag)"
  );

  taskContainers.forEach((taskContainer) => {
    const taskTitle = taskContainer.querySelector(".task__title").textContent;
    const taskDescription =
      taskContainer.querySelector(".task__description").textContent;
    const taskDate = taskContainer.querySelector(
      ".task__created-date"
    ).textContent;
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

    if (taskContainer.closest(".todo-column")) {
      todoCategory.tasks.push(task);
    } else if (taskContainer.closest(".in-progress-column")) {
      inProgressCategory.tasks.push(task);
    } else if (taskContainer.closest(".completed-column")) {
      completedCategory.tasks.push(task);
    }
  });

  // Save the "categories" array to local storage
  localStorage.setItem("categories", JSON.stringify(categories));
}

// <------------------------ Load to Local Storage ------------------------> //
export function loadCategories() {}

// <------------------------ Update to Local Storage ------------------------> //

export function updateCategory(category, index) {}

saveCategories();
