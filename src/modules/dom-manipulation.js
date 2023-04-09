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
export const updateTaskPriorityClass = (taskElement, priority) => {
  const dataPriority = taskElement.getAttribute("data-priority");
  taskElement.setAttribute("data-priority", priority);
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
    completed: false,
  };

  const task = { ...defaultTaskData, ...taskData };
  const taskCard = createTaskFromObject(task);

  return taskCard;
};

// <---------------------- Delegate and Check / Complete Logic----------------------> //


document.addEventListener('click', (event) => {
  if (event.target.classList.contains('task__checkbox-icon')) {
    const taskContainer = event.target.closest('.task__container');
    const taskId = taskContainer.dataset.taskId;
    const kanbanBoard = WebStorageAPI.load();
    const tasksData = kanbanBoard;

    const currentColumn =
      taskContainer.closest('.main__column').dataset.columnName;
    const taskIndex = tasksData[currentColumn].findIndex(
      (task) => task.taskId === taskId
    );
    tasksData[currentColumn][taskIndex].completed = true;
    updateTaskPriorityClass(taskContainer, 3, true);

    if (currentColumn === 'completed') {
      tasksData[currentColumn][taskIndex].completed
        ? taskContainer.querySelector('.task__checkbox-icon').textContent = 'check_box'
        : taskContainer.querySelector('.task__checkbox-icon').textContent = 'check_box_outline_blank';
      const previousPriority = taskContainer.getAttribute('data-previous-priority');
      updateTaskPriorityClass(taskContainer, previousPriority, true);
      tasksData[currentColumn][taskIndex].dataCompleted = new Date().toISOString();
    } else {
      taskContainer.querySelector('.task__checkbox-icon').textContent = 'check_box';
      tasksData[currentColumn][taskIndex].dataCompleted = false;
    }

    updateTaskCounters();
    WebStorageAPI.save(kanbanBoard);
  }
});


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
    WebStorageAPI.save(kanbanBoard);
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
