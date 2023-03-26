"use strict";

import { formatDistanceToNow } from '/node_modules/date-fns';

class TaskCreation {
  constructor(title, description, date, tags = [], priority, add ) {
    this.title = title;
    this.description = description;
    this.date = new Date()
    this.tags = tags || [];
    this.priority = priority || 1;
    this.add = add || false;
    this.completed = false;
  }

  formattedCreatedDate() {
    return formatDistanceToNow(this.date, { addSuffix: true });
  }
}

export default TaskCreation;
