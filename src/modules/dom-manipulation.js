"use strict";

import { formatDistance, parseISO } from "date-fns";
import { WebStorageAPI, updateTasks, getColumns } from "./local-storage";
import { columns, updateTaskCounters } from "./sorting";
import { createTaskFromObject } from "./taskcreationclass";
import { tagTracker, updateTagDisplay } from "./tagtracker";
import {
  ExpandedCardDetails,
  openExpandedCard,
  closeExpandedCard,
} from "./expanded-card-details";
import { getAllTasks } from "./calender";

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
const createTaskElementHTML = (taskCard, strikethrough) => {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task__container");
  taskElement.setAttribute("data-task-id", taskCard.taskId);

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task__header");

  const taskTitle = document.createElement("h4");
  taskTitle.classList.add("task__title");
  taskTitle.textContent = taskCard.title;
  if (strikethrough) {
    taskTitle.classList.add("strikethrough");
  }

  const checkboxIcon = document.createElement("span");
  checkboxIcon.classList.add("task__checkbox-icon", "material-icons");
  checkboxIcon.textContent = "check_box_outline_blank";

  const taskPriority = document.createElement("span");
  taskElement.setAttribute("data-priority", taskCard.priority);

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("task__delete-icon", "material-icons");
  deleteIcon.textContent = "delete";

  const taskDescription = document.createElement("p");
  taskDescription.classList.add("task__description");
  taskDescription.textContent = taskCard.description;
  if (strikethrough) {
    taskTitle.classList.add("strikethrough");
  }

  const taskFooter = document.createElement("div");
  taskFooter.classList.add("task__footer");

  const taskTags = document.createElement("span");
  taskTags.classList.add("task__tags");
  taskTags.textContent = taskCard.tags;
  if (strikethrough) {
    taskTitle.classList.add("strikethrough");
  }

  const taskDueDate = document.createElement("span");
  taskDueDate.classList.add("task__due-date");
  if (strikethrough) {
    taskTitle.classList.add("strikethrough");
  }

  if (typeof taskCard.dueDate === "string") {
    taskCard.dueDate = parseISO(taskCard.dueDate);
  }

  // Time Date Format
  const formattedDueDate = formatDistance(taskCard.dueDate, new Date(), {
    addSuffix: true,
  });

  taskDueDate.textContent = `Due: ${formattedDueDate}`;
  taskDueDate.setAttribute("data-due-date", taskCard.dueDate);

  // Check Box
  checkboxIcon.textContent = taskCard.completed
    ? "check_box"
    : "check_box_outline_blank";

  if (taskCard.completed) {
    taskElement.classList.add("task__container--completed");
  }
  // Check if the task has the strikethrough property set
  if (taskCard.strikethrough) {
    taskTitle.classList.add("strikethrough");
    taskDescription.classList.add("strikethrough");
    taskDueDate.classList.add("strikethrough");
    taskTags.classList.add("strikethrough");
    checkboxIcon.textContent = "check_box";
  } else {
    checkboxIcon.textContent = "check_box_outline_blank";
  }

  taskElement.dataset.id = taskCard.taskId;
  taskHeader.append(taskTitle);
  taskHeader.append(checkboxIcon);
  taskHeader.append(deleteIcon);
  taskElement.append(taskHeader);
  taskElement.append(taskDescription);
  taskFooter.append(taskDueDate);
  taskFooter.append(taskTags);
  taskFooter.append(taskPriority);
  taskElement.append(taskFooter);

  return { taskElement, deleteIcon };
};

// <------------------------ Append Task to Column ------------------------> //

const mainContainer = document.querySelector(".main");

export const appendTaskToColumn = (taskCard, columnName) => {
  const columnElement = getTaskColumn(columnName);
  const { taskElement: taskCardElement, deleteIcon } =
    createTaskElementHTML(taskCard);

  updateTaskPriorityClass(taskCardElement, taskCard.priority);
  taskCardElement.__data = taskCard;
  columnElement.append(taskCardElement);
  WebStorageAPI.save(updateTasks(columns));
  updateTagDisplay(tagTracker());
};

mainContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("main__column-title__button")) {
    const columnElement = event.target.closest(".main__column");
    const columnName = columnElement.classList.value.split("main__column--")[1];
    appendTaskToColumn(createNewTask({}), columnName);
    WebStorageAPI.save(updateTasks(columns));
  }
});

// <------------------------ Update Task Priority Class ------------------------> //
export const updateTaskPriorityClass = (taskElement, priority) => {
  const dataPriority = taskElement.getAttribute("data-priority");
  taskElement.setAttribute("data-priority", priority);
};

// <------------------------ Update Task Display ------------------------> //
export const updateTaskDisplay = (filteredTasks) => {
  const columns = getColumns();
  for (const columnName in filteredTasks) {
    if (columnName === "trash") continue;
    const column = columns[columnName];
    const taskContainers = column.querySelectorAll(".task__container");
    taskContainers.forEach((taskContainer) => {
      taskContainer.remove();
    });

    filteredTasks[columnName].forEach((task) => {
      const { taskElement } = createTaskElementHTML(task, task.strikethrough);
      column.append(taskElement);
    });
  }
};

// <---------------------- Add Event Listener for Create and Append----------------------> //

const createNewTask = (taskData) => {
  const defaultTaskData = {
    id: taskData.id,
    title: "Enter Title",
    description: "Enter Description",
    tags: "#Tag #Tag2",
    priority: "Low",
    dueDate: new Date(),
    content: "Content",
    completed: false,
  };

  const task = { ...defaultTaskData, ...taskData };
  const taskCard = createTaskFromObject(task);

  return taskCard;
};

// <---------------------- Delegate Events Trash, Delete, Checkbox Logic----------------------> //
let currentExpandedCardDetails = null;
const saveButton = document.querySelector(".project-form__btn-save");

const handleCheckboxClick = (taskElement, taskId) => {
  const currentColumn = taskElement.closest(".main__column").dataset.columnName;
  const kanbanBoard = WebStorageAPI.load();
  const taskData = kanbanBoard[currentColumn].find(
    (task) => task.taskId === taskId
  );
  taskData.completed = !taskData.completed;
  taskElement.classList.toggle("task__container--completed");
  taskElement.querySelector(".task__checkbox-icon").textContent =
    taskData.completed ? "check_box" : "check_box_outline_blank";

  // Save the updated task data to the local storage
  WebStorageAPI.save(kanbanBoard);

  updateTaskCounters();
};

const handleCheckboxIconClick = (event) => {
  const taskElement = event.target.closest(".task__container");
  const taskId = taskElement.dataset.taskId;
  const taskTitle = taskElement.querySelector(".task__title");
  const taskDescription = taskElement.querySelector(".task__description");
  const taskDueDate = taskElement.querySelector(".task__due-date");
  const taskTags = taskElement.querySelector(".task__tags");

  if (event.target.textContent === "check_box") {
    event.target.textContent = "check_box_outline_blank";
    taskTitle.classList.remove("strikethrough");
    taskDescription.classList.remove("strikethrough");
    taskDueDate.classList.remove("strikethrough");
    taskTags.classList.remove("strikethrough");
  } else {
    event.target.textContent = "check_box";
    taskTitle.classList.add("strikethrough");
    taskDescription.classList.add("strikethrough");
    taskDueDate.classList.add("strikethrough");
    taskTags.classList.add("strikethrough");
  }

  handleCheckboxClick(taskElement, taskId);
  // Update local storage
  const tasks = updateTasks();
  WebStorageAPI.save(tasks);
};

const handleGlobalClick = (event) => {
  // Handle task container click
  const taskElement = event.target.closest(".task__container");
  if (taskElement) {
    handleTaskContainerClick(event);
  }

  // Handle checkbox icon click
  if (event.target.classList.contains("task__checkbox-icon")) {
    handleCheckboxIconClick(event);
  }
};

// Add the event listener for global click events
document.addEventListener("click", handleGlobalClick);

const handleTaskContainerClick = (event) => {
  const taskElement = event.target.closest(".task__container");
  if (!taskElement) {
    return;
  }
  const taskId = taskElement.dataset.taskId;

  // Do not open the expanded card when trash icon or checkbox icon is clicked
  if (event.target.classList.contains("task__checkbox-icon")) {
    return;
  }

  // Handle task delete
  if (event.target.classList.contains("task__delete-icon")) {
    const taskContainer = event.target.closest(".task__container");
    const taskId = taskContainer.dataset.taskId;
    const kanbanBoard = WebStorageAPI.load();

    const tasksData = kanbanBoard;
    const currentColumn =
      taskContainer.closest(".main__column").dataset.columnName;
    const taskIndex = tasksData[currentColumn].findIndex(
      (task) => task.taskId === taskId
    );
    const removedTask = tasksData[currentColumn].splice(taskIndex, 1)[0];

    if (currentColumn !== "trash") {
      tasksData.trash.push(removedTask);
      taskContainer.remove();
      appendTaskToColumn(removedTask, "trash");
    } else {
      taskContainer.remove();
    }

    // Update the kanbanBoard with the updated tasksData
    kanbanBoard[currentColumn] = tasksData[currentColumn];
    kanbanBoard.trash = tasksData.trash;

    updateTaskCounters();

    // Save the updated tasksData to the local storage here
    WebStorageAPI.save(kanbanBoard);
  } else {
    currentExpandedCardDetails = new ExpandedCardDetails(taskId, taskElement);
    currentExpandedCardDetails.populateFormFields();
    openExpandedCard();

    // Remove existing event listeners before adding a new one
    saveButton.removeEventListener("click", saveButtonHandler);
    saveButton.addEventListener("click", saveButtonHandler);
  }
};

const saveButtonHandler = () => {
  if (!saveButtonHandler.isRunning) {
    saveButtonHandler.isRunning = true;
    currentExpandedCardDetails.saveChanges();
    closeExpandedCard();
    setTimeout(() => {
      saveButtonHandler.isRunning = false;
    }, 100);
  }
};

saveButtonHandler.isRunning = false;
