"use strict";
import Sortable from "sortablejs";
import { WebStorageAPI } from "./local-storage";


const columns = {
  "todo": document.querySelector(".main__column--todo"),
  "in-progress": document.querySelector(".main__column--in-progress"),
  "completed": document.querySelector(".main__column--completed")
};

const columnsCount = {
  'todoCount': document.querySelector('.main__column-title__taskcount--todo'),
  'inProgressCount': document.querySelector('.main__column-title__taskcount--inprogress'),
  'completedCount': document.querySelector('.main__column-title__taskcount--completed')
};

""
const sortableOptions = {
  group: "shared",
  onEnd: () => updateTaskCounters(),
  draggable: ".task__container:not(.no-drag)",
};

const sortableColumns = Object.entries(columns).reduce((acc, [key, value]) => {
  acc[key] = new Sortable(value, sortableOptions);
  return acc;
}, {});

export const updateTaskCounters = () => {
  const columnKeys = Object.keys(columns);

  for (let i = 0; i < columnKeys.length; i++) {
    const column = columnKeys[i];
    const taskCount = sortableColumns[column].el.querySelectorAll(".task__container").length;

    let columnCountKey;
    if (column === 'todo') {
      columnCountKey = 'todoCount';
    } else if (column === 'in-progress') {
      columnCountKey = 'inProgressCount';
    } else if (column === 'completed') {
      columnCountKey = 'completedCount';
    }

    if (columnsCount[columnCountKey]) {
      columnsCount[columnCountKey].textContent = taskCount;
    }
  }
};
