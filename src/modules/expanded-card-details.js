"use strict";

import { WebStorageAPI } from "./local-storage";
import { updateTaskPriorityClass } from "./dom-manipulation";
import { formatDistance } from "date-fns";

// <---------------------- Get and Populate Expanded Card Details ----------------------> //
export const getTaskDataById = (taskId) => {
  const kanbanBoard = WebStorageAPI.load();
  for (const columnName in kanbanBoard) {
    const task = kanbanBoard[columnName].find((task) => task.taskId === taskId);

    if (task) {
      return task;
    }
  }
};

export class ExpandedCardDetails {
  constructor(taskId, taskElement) {
    this.taskData = getTaskDataById(taskId);
    this.expandedCard = document.querySelector(".offcanvas__body");
    this.expandedCardForm = this.expandedCard.querySelector(".project-form");
    this.taskElement = taskElement;
  }
  getTitle() {
    return this.expandedCardForm.querySelector(".project-form__title")
      .innerText;
  }

  getStatus() {
    return this.expandedCardForm.querySelector("#statusGroup").value;
  }

  getPriority() {
    return this.expandedCardForm.querySelector("#priorityGroup").value;
  }

  getDueDate() {
    return this.expandedCardForm.querySelector("#due-date").valueAsDate;
  }

  getTags() {
    return this.expandedCardForm
      .querySelector("#tags")
      .value.split(",")
      .filter((tag) => tag);
  }

  getDescription() {
    return this.expandedCardForm.querySelector("#description-input").value;
  }

  setTitle(title) {
    this.expandedCardForm.querySelector(".project-form__title").innerText =
      title;
  }

  setStatus(statusIndex) {
    const statusDropdown = this.expandedCardForm.querySelector("#statusGroup");
    statusDropdown.selectedIndex = statusIndex;
  }

  setPriority(priority) {
    this.expandedCardForm.querySelector(
      `#priorityGroup option[value="${priority}"]`
    ).selected = true;
  }

  setTags(tags) {
    this.expandedCardForm.querySelector("#tags").value = tags;
  }

  setDueDate(dueDate) {
    let dueDateObject = new Date(dueDate);
    this.expandedCardForm.querySelector("#due-date").valueAsDate =
      dueDateObject;
  }

  setDescription(description) {
    this.expandedCardForm.querySelector("#description-input").value =
      description;
  }

  populateFormFields() {
    this.setTitle(this.taskData.title);
    this.setStatus(this.taskData.status);
    this.setPriority(this.taskData.priority);
    this.setDueDate(this.taskData.dueDate);
    this.setTags(this.taskData.tags);
    this.setDescription(this.taskData.description);
  }

  // <------------------------ Save Changes ------------------------> //
  saveChanges() {
    // Update the task data with the new values from the form fields
    this.taskData.title = this.getTitle();
    this.taskData.status = this.getStatus();
    this.taskData.priority = this.getPriority();
    this.taskData.dueDate = this.getDueDate();
    this.taskData.tags = this.getTags();
    this.taskData.description = this.getDescription();

    // Update the task element's priority
    updateTaskPriorityClass(this.taskElement, this.taskData.priority);

    // Update the local storage with the new task data
    const kanbanBoard = WebStorageAPI.load();
    for (const columnName in kanbanBoard) {
      const columnTasks = kanbanBoard[columnName];
      const taskIndex = columnTasks.findIndex(
        (task) => task.taskId === this.taskData.taskId
      );

      if (taskIndex > -1) {
        columnTasks[taskIndex] = this.taskData;
        break;
      }
    }

    // Update the task card on the UI
    const taskElement = this.taskElement;
    taskElement.setAttribute("data-task-id", this.taskData.taskId); // Update the taskElement's data-task-id attribute
    taskElement.querySelector(".task__title").innerText = this.taskData.title;
    taskElement.querySelector(".task__description").innerText =
      this.taskData.description;
    taskElement.querySelector(".task__tags").innerText = this.taskData.tags;

    const dueDateElement = taskElement.querySelector(".task__due-date");
    const formattedDueDate = formatDistance(this.taskData.dueDate, new Date(), {
      addSuffix: true,
    });
    dueDateElement.textContent = `Due: ${formattedDueDate}`;
    dueDateElement.setAttribute("data-due-date", this.taskData.dueDate);

    // Save the updated task data to local storage
    WebStorageAPI.save(kanbanBoard);

    return this.taskData; // return the updated taskData
  }
}

// <------------------------ Open and Close Expanded Card Functions ------------------------> //
let isExpanded = false;
let currentExpandedCardDetails = null;

export const openExpandedCard = () => {
  const expandedCardContainer = document.querySelector(".offcanvas");
  expandedCardContainer.style.transform = "translateX(0%)";
  isExpanded = true;
};

export const closeExpandedCard = () => {
  const expandedCardContainer = document.querySelector(".offcanvas");
  expandedCardContainer.style.transform = "translateX(100%)";
  isExpanded = false;
};

export const toggleExpandedCard = () => {
  if (!isExpanded) {
    openExpandedCard();
  } else {
    closeExpandedCard();
  }
};

// Add click event listener to the document to handle clicks outside the offcanvas
document.addEventListener("click", (event) => {
  const expandedCardContainer = document.querySelector(".offcanvas");
  if (!expandedCardContainer.contains(event.target) && isExpanded) {
    closeExpandedCard();
  }
});

// Add click event listener to the close button
const closeButton = document.querySelector(".offcanvas__close-btn");
closeButton.addEventListener("click", (event) => {
  if (isExpanded) {
    closeExpandedCard();
  }
});

export default ExpandedCardDetails;
