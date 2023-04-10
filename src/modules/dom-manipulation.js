/// Current Issue is one, the save button is not grabbing the right taskid or saving to the right one
// next issue is that the save button is being called multime times each time we save so multiple events called
//

"use strict";

import { formatDistance, parseISO } from "date-fns";
import { WebStorageAPI, updateTasks } from "./local-storage";
import { columns, updateTaskCounters } from "./sorting";
import { createTaskFromObject } from "./taskcreationclass";
import { tagTracker, updateTagDisplay } from "./tagtracker";
import {
  getTaskDataById,
  ExpandedCardDetails,
  openExpandedCard,
  closeExpandedCard,
} from "./expanded-card-details";

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
const createTaskElementHTML = (taskCard) => {

  const taskElement = document.createElement("div");
  taskElement.classList.add("task__container");
  taskElement.setAttribute("data-task-id", taskCard.taskId);

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task__header");

  const taskTitle = document.createElement("h4");
  taskTitle.classList.add("task__title");
  taskTitle.textContent = taskCard.title;

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

  const taskFooter = document.createElement("div");
  taskFooter.classList.add("task__footer");

  const taskTags = document.createElement("span");
  taskTags.classList.add("task__tags");
  taskTags.textContent = taskCard.tags;

  const taskDueDate = document.createElement("span");
  taskDueDate.classList.add("task__due-date");

  //  // Add click event listener to task element
  //  addTaskClickListener(taskElement, taskCard.id);

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

const handleTaskContainerClick = (event) => {
  const taskElement = event.target.closest(".task__container");
  if (!taskElement) {
    return;
  }

  const taskId = taskElement.dataset.taskId;

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
    // console.log(`Task with ID ${taskId} clicked.`);
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
document.addEventListener("click", (event) => {
  handleTaskContainerClick(event);
});