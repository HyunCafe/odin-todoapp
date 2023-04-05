"use strict";
import Sortable from "sortablejs";
import { WebStorageAPI, updateCategory } from "./local-storage";

class TaskCategory {
  constructor(name, taskCountElement) {
    this.name = name;
    this.taskCount = 0;
    this.taskCountElement = taskCountElement;
  }

  updateTaskCountFromDOM = () => {
    const taskContainers = this.taskCountElement
      .closest(".main__column")
      .querySelectorAll(".task__container");
    this.taskCount = taskContainers.length;
    this.taskCountElement.textContent = this.taskCount;
  };
}

const tasksData = WebStorageAPI.load();

const todoCategory = new TaskCategory(
  "todo",
  document.querySelector(".main__column-title__taskcount--todo")
);
const inProgressCategory = new TaskCategory(
  "in-progress",
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
  onEnd: () => updateTaskCounters(tasksData),
  draggable: ".task__container:not(.no-drag)",
});

const inProgressSortable = new Sortable(inProgressColumnElement, {
  group: "shared",
  onEnd: () => updateTaskCounters(tasksData),
  draggable: ".task__container:not(.no-drag)",
});

const completedSortable = new Sortable(completedColumnElement, {
  group: "shared",
  onEnd: () => updateTaskCounters(tasksData),
  draggable: ".task__container:not(.no-drag)",
});

export const updateTaskCounters = () => {
  todoCategory.updateTaskCountFromDOM();
  inProgressCategory.updateTaskCountFromDOM();
  completedCategory.updateTaskCountFromDOM();

  // update tasks data
  tasksData.todo = Array.from(
    toDoColumnElement.querySelectorAll(".task__container")
  ).map((taskElement) => taskElement.__data);
  tasksData["in-progress"] = Array.from(
    inProgressColumnElement.querySelectorAll(".task__container")
  ).map((taskElement) => taskElement.__data);
  tasksData.completed = Array.from(
    completedColumnElement.querySelectorAll(".task__container")
  ).map((taskElement) => taskElement.__data);

  // save to local storage
  WebStorageAPI.save(tasksData);
};

document.addEventListener("DOMContentLoaded", () => {
  updateTaskCounters();
});
