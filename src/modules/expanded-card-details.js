"use strict";

import { WebStorageAPI } from "./local-storage";


// <------------------------ Grab from Local Storage  ------------------------> //
console.log(WebStorageAPI)
const getTaskDataById = (taskId) => {
  const kanbanBoard = WebStorageAPI.load();
  let taskData = null;

  for (const columnName in kanbanBoard) {
    const columnTasks = kanbanBoard[columnName];
    const task = columnTasks.find((task) => task.taskId === taskId);

    if (task) {
      taskData = task;
      break;
    }
  }

  return taskData;
};
// // <---------------------- Get and Populate Expanded Card Details ----------------------> //

class ExpandedCardDetails {
  constructor(taskId) {
    this.taskData = getTaskDataById(taskId);
    this.expandedCard = document.querySelector(".project-form");
    this.expandedCardForm = this.expandedCard.querySelector(".offcanvas__body");
  }

  resetOptions(dropdownListItems) {
    dropdownListItems.forEach((i) => {
      i.removeAttribute("selected");
    });
  }

  getTitle() {
    return this.expandedCardForm.querySelector("#title-input").value;
  }

  getPriority() {
    return this.expandedCardForm.querySelector("#priorityGroup").value;
  }

  getStatus() {
    return this.expandedCardForm.querySelector("#statusGroup").value;
  }

  getDescription() {
    return this.expandedCardForm.querySelector("#description-input").value;
  }

  getDueDate() {
    return this.expandedCardForm.querySelector("#due-date").valueAsDate;
  }

  setTitle(title) {
    this.expandedCardForm.querySelector("#title-input").value = title;
  }

  setPriority(priorityIndex) {
    const priorityDropdownItems = this.expandedCardForm.querySelectorAll(
      "#priorityGroup option"
    );
    this.resetOptions(priorityDropdownItems);
    priorityDropdownItems[priorityIndex].setAttribute("selected", "selected");
  }

  setStatus(statusIndex) {
    const statusDropdownItems = this.expandedCardForm.querySelectorAll(
      "#statusGroup option"
    );
    this.resetOptions(statusDropdownItems);
    statusDropdownItems[statusIndex].setAttribute("selected", "selected");
  }

  setDescription(description) {
    this.expandedCardForm.querySelector("#description-input").value = description;
  }

  setDueDate(duedate) {
    this.expandedCardForm.querySelector("#due-date").valueAsDate = duedate;
  }

  show() {
    new Offcanvas(this.expandedCard).show();
  }

  populateFormFields() {
    this.setTitle(this.taskData.title);
    this.setPriority(this.taskData.priority);
    this.setStatus(this.taskData.status);
    this.setDescription(this.taskData.description);
    this.setDueDate(this.taskData.dueDate);
  }
}

const expandedCardContainer = document.querySelector('.offcanvas_body')
const expandedCardDetails = new ExpandedCardDetails();


// <------------------------ Toggle Expanded Card ------------------------> //

let isExpanded = false;

const toggleExpandedCard = () => {
  if (isExpanded) {
    expandedCardContainer.style.transform = "translateX(100%)";
  } else {
    expandedCardContainer.style.transform = "translateX(0)";
  }
  isExpanded = !isExpanded;
};

// <------------------------ Set Click Event Listener Function  ------------------------> //
export const addTaskClickListener = (taskElement, taskId) => {
  taskElement.addEventListener("click", () => {
    // console.log('Clicked task element with ID:', taskId);

    const kanbanBoard = WebStorageAPI.load();
    console.log('Kanban Board:', kanbanBoard);

    for (const columnName in kanbanBoard) {
      const columnTasks = kanbanBoard[columnName];

      const task = columnTasks.find((task) => {
        // console.log('Comparing task ID:', task.taskId, 'with clicked task ID:', taskId);
        return task.taskId === taskId;
      });

      if (task) {
        const expandedCardDetails = new ExpandedCardDetails(task);
        expandedCardDetails.populateFormFields();
        expandedCardDetails.show();
        break;
      }
    }
  });
};



export default ExpandedCardDetails;
