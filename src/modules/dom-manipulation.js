"use strict";

import { isValid, formatDistance, parseISO } from "date-fns";
import Sortable from "sortablejs";
import {
  saveCategories,
  loadCategories,
  deleteTaskFromLocalStorage,
  populateTasksFromLocalStorage,
} from "./local-storage";
import { TaskCreation, createTaskFromObject } from "./taskcreationclass.js";
import { updateTaskCounters } from "./taskcategory.js";
import {
  showTaskDetails,
  addTaskElementClickListener,
} from "./showtaskdetails";

let taskId = 1;

// <------------------------ Task Column Helper Function ------------------------> //

export const getTaskColumn = (columnName) => {
  const columns = {
    todo: document.querySelector(".main__column--todo"),
    "in-progress": document.querySelector(".main__column--in-progress"),
    completed: document.querySelector(".main__column--completed"),
    trash: document.querySelector(".main__column--trash"),
  };
  return columns[columnName];
};

// <------------------------ Create Task Element ------------------------> //

function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task__container", "task");
  taskElement.setAttribute("data-task-id", taskId);

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task__header");

  const taskTitle = document.createElement("h4");
  taskTitle.classList.add("task__title");
  taskTitle.textContent = task.title;

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("task__delete-icon", "material-icons");
  deleteIcon.textContent = "delete";

  const taskDescription = document.createElement("p");
  taskDescription.classList.add("task__description");
  taskDescription.textContent = task.description;

  const taskFooter = document.createElement("div");
  taskFooter.classList.add("task__footer");

  const taskTags = document.createElement("span");
  taskTags.classList.add("task__tags");
  taskTags.textContent = task.tags;

  const taskDueDate = document.createElement("span");
  taskDueDate.classList.add("task__due-date");

  if (typeof task.dueDate === "string") {
    task.dueDate = parseISO(task.dueDate);
  }

  if (isValid(task.dueDate)) {
    const formattedDueDate = formatDistance(task.dueDate, new Date(), {
      addSuffix: true,
    });
    taskDueDate.textContent = `Due: ${formattedDueDate}`;
  } else {
  }

  taskHeader.append(taskTitle);
  taskHeader.append(deleteIcon);
  taskElement.append(taskHeader);
  taskElement.append(taskDescription);
  taskFooter.append(taskDueDate);
  taskFooter.append(taskTags);
  taskElement.append(taskFooter);

  return taskElement;
}

// <------------------------ Delete and Move to Trash ------------------------> //
function addDeleteIconEventListener(deleteIcon, taskElement) {
  deleteIcon.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent triggering the taskElement click event

    // Load tasks from local storage, parse them into an object
    const tasksData = JSON.parse(localStorage.getItem("tasks"));
    const taskId = taskElement.dataset.taskId;
    const currentColumn =
      taskElement.closest(".main__column").dataset.columnName;

    // Find the task in the tasksData object
    const taskIndex = tasksData[currentColumn].findIndex(
      (task) => task.taskId === taskId
    );

    // Remove the task from its current column
    const task = tasksData[currentColumn].splice(taskIndex, 1)[0];
    removeTaskFromDisplay(taskElement);

    // Move the task to the Trash column if it's not already there
    const trashColumn = document.querySelector(".main__column--trash");
    if (currentColumn !== "trash") {
      appendTask(task, trashColumn, (newTaskElement) => {
        // Re-apply the saved taskId to the taskElement in the trash column
        newTaskElement.dataset.taskId = taskId;

        // Copy the classes from the original task element
        newTaskElement.className = taskElement.className;
      });
    }
    saveCategories();

    // Update the tasksData object and save it back to local storage
    localStorage.setItem("tasks", JSON.stringify(tasksData));

    updateTaskCounters();
  });
}

// <------------------------ Append Task to Column ------------------------> //

export const appendTask = (task, categoryElement, callback) => {
  const taskElement = createTaskElement(task);
  const deleteIcon = taskElement.querySelector(".task__delete-icon");

  addDeleteIconEventListener(deleteIcon, taskElement);
  addTaskElementClickListener(taskElement);

  // Assign border color based on priority level
  if (task.priority === "Urgent") {
    taskElement.classList.add("task--urgent");
  } else if (task.priority === "High") {
    taskElement.classList.add("task--high");
  } else if (task.priority === "completed") {
    taskElement.classList.add("task--completed");
  } else {
    taskElement.classList.add("task--low");
  }

  taskElement.__data = task;

  // Check if categoryElement is defined before appending taskElement
  if (categoryElement) {
    categoryElement.append(taskElement);
    if (callback && typeof callback === "function") {
      callback(taskElement);
    }
    // Save the categories to local storage
    saveCategories(
      document.querySelector(".main__column--todo"),
      document.querySelector(".main__column--in-progress"),
      document.querySelector(".main__column--completed"),
      document.querySelector(".main__column--trash")
    );
  }

  // Add a event listener to the task element for Complete Color Code
  let taskCompleted = false;
  const completedColumn = document.querySelector(".main__column--completed");
  const trashColumn = document.querySelector(".main__column--trash");

  taskElement.addEventListener("dragend", (event) => {
    const taskContainer = event.target.closest(".task__container");
    const isInCompletedColumn = completedColumn.contains(taskContainer);

    if (isInCompletedColumn) {
      taskContainer.classList.add("task--completed");
    } else if (
      !completedColumn.contains(taskContainer) &&
      !trashColumn.contains(taskContainer)
    ) {
      taskContainer.classList.remove("task--completed");
    }
    // Save the categories to local storage
    saveCategories(
      document.querySelector(".main__column--todo"),
      document.querySelector(".main__column--in-progress"),
      document.querySelector(".main__column--completed"),
      document.querySelector(".main__column--trash")
    );
  });

  taskId++;
};

// <------------------------ Update Task Display------------------------> //

export const updateTaskDisplay = (taskElement, task) => {
  // Update the display of a task element based on the task object's properties
};

const removeTaskFromDisplay = (taskElement) => {
  const taskId = taskElement.getAttribute("data-task-id");
  taskElement.remove();
  deleteTaskFromLocalStorage(taskId);
};

// <------------------------ Sortable Task Column Initialization------------------------> //

document.addEventListener("DOMContentLoaded", () => {
  const taskColumns = document.querySelectorAll(".main__column");

  if (taskColumns.length) {
    taskColumns.forEach((column) => {
      const sortable = new Sortable(column, {
        animation: 150,
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        group: {
          name: column.getAttribute("data-column-name"),
          pull: true,
          put: true,
        },
        draggable: ".task__container",
      });
    });
  }
});
populateTasksFromLocalStorage();
