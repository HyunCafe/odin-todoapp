"use strict";
import Sortable from "sortablejs";
import {
  saveCategories,
  loadCategories,
  updateCategory,
} from "./local-storage";

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

export function updateTaskCounters() {
  todoCategory.updateTaskCountFromDOM();
  inProgressCategory.updateTaskCountFromDOM();
  completedCategory.updateTaskCountFromDOM();
  saveCategories(
    toDoColumnElement,
    inProgressColumnElement,
    completedColumnElement
  );
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

const toDoColumnElement = document.querySelector(".main__column--todo");
const inProgressColumnElement = document.querySelector(
  ".main__column--in-progress"
);
const completedColumnElement = document.querySelector(
  ".main__column--completed"
);

const todoSortable = new Sortable(toDoColumnElement, {
  group: "shared",
  onEnd: updateTaskCounters,
  draggable: ".task__container:not(.no-drag)",
});

const inProgressSortable = new Sortable(inProgressColumnElement, {
  group: "shared",
  onEnd: updateTaskCounters,
  draggable: ".task__container:not(.no-drag)",
});

const completedSortable = new Sortable(completedColumnElement, {
  group: "shared",
  onEnd: updateTaskCounters,
  draggable: ".task__container:not(.no-drag)",
});

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  updateTaskCounters();
});
