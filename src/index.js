"use strict";
console.log('test')
import TaskCategory from './modules/taskcategory.js';
import TaskCreation from './modules/taskcreationclass.js';
import { appendTask } from './modules/dom-manipulation.js';



// const setupEventListeners = () => {
//     const navLinks = document.querySelectorAll("nav a");
//     navLinks.forEach((link) => {
//       link.addEventListener("click", (e) => {
//         e.preventDefault();
//         const content = document.querySelector("#content");
//         content.innerHTML = "";
//         switch (link.textContent.toLowerCase()) {
//           case "home":
//             content.append(createHeader());
//             content.append(createMain());
//             content.append(createFooter());
//             setupEventListeners();
//             break;
//           case "menu":
//             import("./modules/menu.js").then((module) => {
//               content.append(module.default());
//               setupEventListeners();
//             });
//             break;
//           case "about":
//             import("./modules/about.js").then((module) => {
//               content.append(module.default());
//               setupEventListeners();
//             });
//             break;
//           case "reservations":
//             import("./modules/reservations.js").then((module) => {
//               content.append(module.default());
//               setupEventListeners();
//             });
//             break;
//           case "contact":
//             import("./modules/contact.js").then((module) => {
//               content.append(module.default());
//               setupEventListeners();
//             });
//             break;
//           default:
//             break;
//         }
//       });
//     });
//   };
  
//   setupEventListeners();




// const toDoCategory = new TaskCategory('To Do');
// const inProgressCategory = new TaskCategory('In Progress');
// const completedCategory = new TaskCategory('Completed');
const categoryElement = document.querySelector('.main__column--todo');

const defaultTasks = [
  {
    title: "Learn a new programming language",
    description: "Choose a programming language and start learning its syntax and best practices.",
    date: "2022-12-31",
    tags: "#learning #self-improvement",
    priority: "Low",
    add: true,
  },
  {
    title: "Finish building a to-do app",
    description: "Complete the final touches on the to-do app, such as adding a due date feature or enabling drag and drop functionality.",
    date: "2022-11-30",
    tags: "#project #organization",
    priority: "Urgent",
    add: true,
  },
  {
    title: "Read a programming book",
    description: "Choose a programming book and aim to read at least one chapter per day.",
    date: "2022-12-15",
    tags: "#reading #self-improvement",
    priority: "High",
    add: true,
  },
  {
    title: "Contribute to an open source project",
    description: "Find an open source project that interests you and make a contribution, such as fixing a bug or implementing a new feature.",
    date: "2022-11-01",
    tags: "#open-source #contribution",
    priority: "High",
    add: true,
  }
];

// Loop through the default tasks array and create a TaskCreation object for each task
defaultTasks.forEach(task => {
  const newTask = new TaskCreation(
    task.title,
    task.description,
    task.date,
    task.tags.split(', '),
    task.priority,
    task.add
  );

  // Append the task to the appropriate category element
  appendTask(newTask, categoryElement);
});


 
  
// Modify Above to fit into current project