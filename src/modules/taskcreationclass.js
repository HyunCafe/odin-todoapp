"use strict";

import { formatDistanceToNow, subMonths } from "date-fns";

class TaskCreation {
  constructor(
    title,
    description,
    date,
    tags = [],
    priority,
    add,
    content = ""
  ) {
    this.id = new Date().getTime().toString(); // generate task ID using timestamp
    this.title = title;
    this.description = description;

    if (date && !isNaN(Date.parse(date))) {
      this.date = new Date(date);
    } else {
      this.date = subMonths(new Date(), 1);
    }

    this.tags = tags || [];
    this.priority = priority || 1;
    this.add = add || false;
    this.completed = false;
    this.content = content;
  }

  formattedCreatedDate() {
    return formatDistanceToNow(this.date, { addSuffix: true });
  }
}

export default TaskCreation;
