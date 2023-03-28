"use strict";
import Sortable from "sortablejs";
import { saveCategories } from './local-storage';


class TaskCategory {
  constructor(name, taskCountElement) {
    this.name = name;
    this.taskCount = 0;
    this.taskCountElement = taskCountElement;
  }

  updateTaskCountFromDOM() {
    const taskContainers = this.taskCountElement
      .closest(".main__column")
      .querySelectorAll(".task__container");
    this.taskCount = taskContainers.length;
    this.taskCountElement.textContent = this.taskCount;
  }
}

const todoCategory = new TaskCategory(
  "todo",
  document.querySelector(".main__column-title__taskcount--todo")
);
const inProgressCategory = new TaskCategory(
  "inProgress",
  document.querySelector(".main__column-title__taskcount--inprogress")
);
const completedCategory = new TaskCategory(
  "completed",
  document.querySelector(".main__column-title__taskcount--completed")
);

const todoColumn = document.querySelector(".main__column--todo");
const inProgressColumn = document.querySelector(".main__column--in-progress");
const completedColumn = document.querySelector(".main__column--completed");

const todoSortable = new Sortable(todoColumn, {
  group: "shared",
  onEnd: updateTaskCounters,
  draggable: ".task__container:not(.no-drag)",
});

const inProgressSortable = new Sortable(inProgressColumn, {
  group: "shared",
  onEnd: updateTaskCounters,
  draggable: ".task__container:not(.no-drag)",
});

const completedSortable = new Sortable(completedColumn, {
  group: "shared",
  onEnd: updateTaskCounters,
  draggable: ".task__container:not(.no-drag)",
});

function updateTaskCounters() {
  todoCategory.updateTaskCountFromDOM();
  inProgressCategory.updateTaskCountFromDOM();
  completedCategory.updateTaskCountFromDOM();
  saveCategories([todoCategory, inProgressCategory, completedCategory]);

}

document.addEventListener("DOMContentLoaded", () => {
  updateTaskCounters();
});
