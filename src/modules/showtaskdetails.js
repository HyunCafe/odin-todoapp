// "use strict";

// function expandedCard(task) {
//   expandedCard.setTitle(task.title);
//   expandedCard.setDescription(task.description);
//   expandedCard.setPriority(getPriorityIndex(task.priority));
//   expandedCard.setStatus(getStatusIndex(task.status));
//   expandedCard.setDueDate(new Date(task.dueDate));
// }

// function getPriorityIndex(priority) {
//   const priorities = ["Urgent", "High", "Low", "Completed"];
//   return priorities.indexOf(priority);
// }

// function getStatusIndex(status) {
//   const statuses = ["To Do", "In Progress", "Completed"];
//   return statuses.indexOf(status);
// }

// const expandedCard = (() => {
//   const card = document.querySelector(".project-form");
//   const cardBody = card.querySelector(".offcanvas-body");

//   function getElement() {
//     return card;
//   }

//   function getTitle() {
//     return cardBody.querySelector("h1").textContent;
//   }

//   function getPriority() {
//     return cardBody.querySelector("#priorityGroup").value;
//   }

//   function getStatus() {
//     return cardBody.querySelector("#statusGroup").value;
//   }

//   function getDescription() {
//     return cardBody.querySelector("#description").value;
//   }

//   function getDueDate() {
//     return cardBody.querySelector("#dueDate").valueAsDate;
//   }

//   function setTitle(title) {
//     cardBody.querySelector("h1").textContent = title;
//   }

//   function setPriority(priorityIndex) {
//     const priorityDropdownItems = cardBody.querySelectorAll(
//       "#priorityGroup option"
//     );
//     resetOptions(priorityDropdownItems);
//     priorityDropdownItems[priorityIndex].setAttribute("selected", "selected");
//   }

//   function setStatus(statusIndex) {
//     const statusDropdownItems = cardBody.querySelectorAll(
//       "#statusGroup option"
//     );
//     resetOptions(statusDropdownItems);
//     statusDropdownItems[statusIndex].setAttribute("selected", "selected");
//   }

//   function setDescription(description) {
//     cardBody.querySelector("#description").value = description;
//   }

//   function setDueDate(duedate) {
//     cardBody.querySelector("#dueDate").valueAsDate = duedate;
//   }

//   function show() {
//     new Offcanvas(card).show();
//   }

//   return {
//     getDescription,
//     getPriority,
//     getStatus,
//     getTitle,
//     getDueDate,
//     setDescription,
//     setDueDate,
//     setPriority,
//     setStatus,
//     setTitle,
//     show,
//     getElement,
//   };
// });

// export default expandedCard;
