"use strict";

import { isValid, formatDistance, parseISO } from "date-fns";
import { WebStorageAPI, updateTasks } from "./local-storage";
import { columns, updateTaskCounters } from "./sorting";
import { createTaskFromObject } from "./taskcreationclass";
import { tagTracker, updateTagDisplay } from "./tagtracker";
import { addTaskClickListener, getTaskDataById } from "./expanded-card-details";

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
  taskElement.setAttribute("data-task-id", taskCard.id);

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task__header");

  const taskTitle = document.createElement("h4");
  taskTitle.classList.add("task__title");
  taskTitle.textContent = taskCard.title;

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

  if (typeof taskCard.dueDate === "string") {
    taskCard.dueDate = parseISO(taskCard.dueDate);
  }

  const formattedDueDate = formatDistance(taskCard.dueDate, new Date(), {
    addSuffix: true,
  });
  taskDueDate.textContent = `Due: ${formattedDueDate}`;
  taskDueDate.setAttribute("data-due-date", taskCard.dueDate);

  // Add Expanded Card Details/ Event Listener
  const taskId = taskCard.id;
  addTaskClickListener(taskElement, taskId);

  taskElement.dataset.id = taskCard.id;
  taskHeader.append(taskTitle);
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

  // Assign border color based on priority level
  updateTaskPriorityClass(taskCardElement, taskCard.priority);

  taskCardElement.__data = taskCard;
  columnElement.append(taskCardElement);
  addDeleteIconEventListener(deleteIcon, taskCardElement);

  WebStorageAPI.save(updateTasks(columns));
};

mainContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("main__column-title__button")) {
    return;
  }

  const columnElement = event.target.closest(".main__column");
  const columnName = Array.from(columnElement.classList)
    .find((className) => className.startsWith("main__column--"))
    .split("--")[1];
  const taskCard = createNewTask({});

  // Append the task card to the column
  appendTaskToColumn(taskCard, columnName);
  const sortedTagCount = tagTracker();
  updateTagDisplay(sortedTagCount);

  WebStorageAPI.save(updateTasks(columns));
});
// <------------------------ Update Task Priority Class ------------------------> //
export const updateTaskPriorityClass = (taskElement, priority, isCompleted) => {
  const dataPriority = taskElement.getAttribute("data-priority");
  taskElement.setAttribute("data-priority", priority);
};

// <------------------------ Mark as Completed Logic------------------------> //
export const markTaskAsCompleted = (taskContainer, taskId) => {
  const completedColumn = document.querySelector(".main__column--completed");
  const isInCompletedColumn = completedColumn.contains(taskContainer);
  const taskData = getTaskDataById(taskId);

  console.log(`Marking task as completed: ${taskData.taskId}`);
  console.log(`Is task in completed column? ${isInCompletedColumn}`);

  taskData.isCompleted = isInCompletedColumn;
  taskData.status = isInCompletedColumn ? "completed" : "in-progress";
  taskContainer.setAttribute(
    "data-completed",
    isInCompletedColumn ? "true" : "false"
  );

  let tasks = WebStorageAPI.load();
  console.log("Current tasks in local storage:", tasks);

  tasks = updateTasks(columns);
  console.log("Updated tasks in local storage:", tasks);

  WebStorageAPI.save(tasks);
  console.log("Saved tasks to local storage");
};

// <---------------------- Add Event Listener for Create and Append----------------------> //

const createNewTask = (taskData) => {
  const defaultTaskData = {
    taskId: taskData.taskId,
    title: "Enter Title",
    description: "Enter Description",
    tags: "#Tag #Tag2",
    priority: "Low",
    dueDate: new Date(),
    content: "Content",
  };

  const task = { ...defaultTaskData, ...taskData };
  const taskCard = createTaskFromObject(task);

  return taskCard;
};

// <------------------------ Delete and Move to Trash ------------------------> //
const addDeleteIconEventListener = (deleteIcon, taskElement) => {
  deleteIcon.addEventListener("click", () => {
    const taskContainer = deleteIcon.closest(".task__container");
    const taskId = taskContainer.dataset.taskId;
    const kanbanBoard = WebStorageAPI.load();

    const tasksData = kanbanBoard;
    const currentColumn =
      taskContainer.closest(".main__column").dataset.columnName;
    const taskIndex = tasksData[currentColumn].findIndex(
      (task) => task.taskId === taskId
    );
    const removedTask = tasksData[currentColumn].splice(taskIndex, 1)[0];

    if (currentColumn === "trash") {
      // If the task is already in the trash column, delete it from local storage
      taskContainer.remove();
    } else {
      // If the task is not in the trash column, move it to the trash column
      tasksData.trash.push(removedTask);

      // Remove the task from the current column and append it to the trash column
      taskContainer.remove();
      appendTaskToColumn(removedTask, "trash");
    }

    updateTaskCounters();

    console.log("kanbanBoard after deleting task:", kanbanBoard);
    WebStorageAPI.save(kanbanBoard);
    console.log(
      "kanbanBoard after saving to local storage:",
      WebStorageAPI.load()
    );
  });
};

const deleteTask = (e) => {
  if (!e.target.matches(".task__delete-icon")) return;

  const taskContainer = e.target.closest(".task__container");
  const taskId = taskContainer.dataset.taskId;
  const kanbanBoard = WebStorageAPI.load();
  const tasksData = kanbanBoard;
  const currentColumn =
    taskContainer.closest(".main__column").dataset.columnName;
  const taskIndex = tasksData[currentColumn].findIndex(
    (task) => task.taskId === taskId
  );
  const removedTask = tasksData[currentColumn].splice(taskIndex, 1)[0];

  if (currentColumn === "trash") {
    taskContainer.remove();
  } else {
    tasksData.trash.push(removedTask);
    taskContainer.remove();
    appendTaskToColumn(removedTask, "trash");
  }

  updateTaskCounters();
  WebStorageAPI.save(kanbanBoard);
};

document.addEventListener("click", deleteTask);
