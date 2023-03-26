"use strict";

import { formatDistanceToNow } from '/node_modules/date-fns';

class TaskCreation {
  constructor(title, description, date, tags = [], priority, add) {
    this.title = title;
    this.description = description;
    this.tags = tags || [];
    this.priority = priority || 1;
    this.add = add || false;
    this.completed = false;
    this.created = new Date()
  }

  formattedCreatedDate() {
    return formatDistanceToNow(this.created, { addSuffix: true });
  }
}

export default TaskCreation;
