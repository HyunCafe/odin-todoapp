"use strict";

import { WebStorageAPI } from "./local-storage";


const defaultTasks = {
  todo: [
    {
      taskId: "1",
      title: "Learn a new programming language",
      description:
        "Choose a programming language and start learning its syntax and best practices.",
      dueDate: new Date("2022-12-21"),
      tags: "#learning #self-improvement",
      priority: "Low",
      add: true,
    },
    {
      taskId: "2",
      title: "Finish building a to-do app",
      description:
        "Complete the final touches on the to-do app, such as adding a due date feature or enabling drag and drop functionality.",
      dueDate: new Date("2022-10-30"),
      tags: "#project #organization",
      priority: "Urgent",
      add: true,
    },
    {
      taskId: "3",
      title: "Read a programming book",
      description:
        "Choose a programming book and aim to read at least one chapter per day.",
      dueDate: new Date("2022-12-15"),
      tags: "#reading #self-improvement",
      priority: "High",
      add: true,
    },
    {
      taskId: "4",
      title: "Contribute to an open source project",
      description:
        "Find an open source project that interests you and make a contribution, such as fixing a bug or implementing a new feature.",
        dueDate: new Date("2022-10-01"),
      tags: "#open-source #contribution",
      priority: "High",
      add: true,
    },
  ],
  "in-progress": [],
  completed: [],
  trash: [],
};


let Tasks = WebStorageAPI.load();
if (!Tasks) {
  Tasks = defaultTasks;
  WebStorageAPI.save(Tasks);
}
