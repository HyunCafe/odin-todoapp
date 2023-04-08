"use strict";

import { WebStorageAPI } from "./local-storage";

// <---------------------- Get and Populate Expanded Card Details ----------------------> //
const getTaskDataById = (taskId) => {
  const kanbanBoard = WebStorageAPI.load();
  for (const columnName in kanbanBoard) {
    const columnTasks = kanbanBoard[columnName];
    const task = columnTasks.find((task) => task.taskId === taskId);

    if (task) {
      return task;
    }
  }
};

class ExpandedCardDetails {
  constructor(taskId) {
    this.taskData = getTaskDataById(taskId);
    this.expandedCard = document.querySelector(".offcanvas__body");
    this.expandedCardForm = this.expandedCard.querySelector(".project-form");
  }

  resetOptions(dropdownListItems) {
    dropdownListItems.forEach((i) => {
      i.removeAttribute("selected");
    });
  }

  getTitle() {
    return this.expandedCardForm.querySelector("#title-input").value;
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
      .value.split("#")
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
}

// <------------------------ Open and Close Expanded Card Functions ------------------------> //
let isExpanded = false;

const openExpandedCard = () => {
  const expandedCardContainer = document.querySelector(".offcanvas");
  expandedCardContainer.style.transform = "translateX(0%)";
  isExpanded = true;
};

const closeExpandedCard = () => {
  const expandedCardContainer = document.querySelector(".offcanvas");
  expandedCardContainer.style.transform = "translateX(100%)";
  isExpanded = false;
};

const toggleExpandedCard = () => {
  if (!isExpanded) {
    openExpandedCard();
  } else {
    closeExpandedCard();
  }
};

// <------------------------ Set Click Event Listener Function  ------------------------> //
export const addTaskClickListener = (taskElement, taskId) => {
  taskElement.addEventListener("click", (event) => {
    event.stopPropagation();

    const taskData = getTaskDataById(taskElement);

    const expandedCardDetails = new ExpandedCardDetails(taskId);
    expandedCardDetails.populateFormFields();
    openExpandedCard();
  });
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
