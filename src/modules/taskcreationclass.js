"use strict";

import { formatDistanceToNow } from '/node_modules/date-fns';

class TaskCreation {
  constructor(title, description, date, tags = [], priority, add, content = "") {
    this.id = new Date().getTime().toString(); // generate task ID using timestamp
    this.title = title;
    this.description = description;
    this.date = new Date()
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

